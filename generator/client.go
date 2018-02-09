package generator

import (
	"bytes"
	"log"
	"strings"
	"text/template"

	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
)

const apiTemplate = `
import {createTwirpRequest, throwTwirpError} from './twirp';

{{range .Models}}
export interface {{.Name}} {
	{{range .Fields -}}
    {{.Name}}: {{.Type}};
    {{end}}
}

interface {{.Name}}JSON {
	{{range .Fields -}}
	{{.JSONName}}: {{.JSONType}};
	{{end}}
}

const {{.Name}}ToJSON = (m: {{.Name}}): {{.Name}}JSON => {
	return {
		{{range .Fields -}}
		{{.JSONName}}: {{if eq .Type "Date"}}m.{{.Name}}.toISOString(){{else}}m.{{.Name}}{{end}},
		{{end}}
	};
};

const JSONTo{{.Name}} = (m: {{.Name}}JSON): {{.Name}} => {
	return {
		{{range .Fields -}}
		{{.Name}}: {{if eq .Type "Date"}}new Date(m.{{.JSONName}}){{else}}m.{{.JSONName}}{{end}},
		{{end}}
	};
};
{{end}}

{{range .Services}}
export class {{.Name}} {
    private hostname: string;
	private pathPrefix = "/twirp/{{.Package}}.{{.Name}}/";

    constructor(hostname: string) {
        this.hostname = hostname;
    }

	{{- range .Methods}}
    {{.Name}}({{.InputArg}}: {{.InputType}}): Promise<{{.OutputType}}> {
		const url = this.hostname + this.pathPrefix + "{{.Path}}";
        return fetch(createTwirpRequest(url, {{.InputType}}ToJSON({{.InputArg}}))).then((resp) => {
			if (!resp.ok) {
				return throwTwirpError(resp);
			}

            return resp.json().then(JSONTo{{.OutputType}});
        });
    }
    {{end}}
}
{{end}}
`

type APIContext struct {
	Models   []Model
	Services []Service
}

type Model struct {
	Name   string
	Fields []ModelField
}

type ModelField struct {
	Name     string
	Type     string
	JSONName string
	JSONType string
}

type Service struct {
	Name    string
	Package string
	Methods []ServiceMethod
}

type ServiceMethod struct {
	Name       string
	Path       string
	InputArg   string
	InputType  string
	OutputType string
}

func CreateClientAPI(d *descriptor.FileDescriptorProto) (*plugin.CodeGeneratorResponse_File, error) {
	ctx := APIContext{}
	pkg := d.GetPackage()

	for _, m := range d.GetMessageType() {
		model := Model{
			Name: m.GetName(),
		}

		for _, f := range m.GetField() {
			tsType, jsonType := protoToTSType(f)
			jsonName := f.GetName()
			name := camelCase(jsonName)

			field := ModelField{
				Name:     name,
				Type:     tsType,
				JSONName: jsonName,
				JSONType: jsonType,
			}

			model.Fields = append(model.Fields, field)
		}

		ctx.Models = append(ctx.Models, model)
	}

	for _, s := range d.GetService() {
		service := Service{
			Name:    s.GetName(),
			Package: pkg,
		}

		for _, m := range s.GetMethod() {
			methodPath := m.GetName()
			methodName := strings.ToLower(methodPath[0:1]) + methodPath[1:]
			in := removePkg(m.GetInputType())
			arg := strings.ToLower(in[0:1]) + in[1:]

			method := ServiceMethod{
				Name:       methodName,
				Path:       methodPath,
				InputArg:   arg,
				InputType:  in,
				OutputType: removePkg(m.GetOutputType()),
			}

			service.Methods = append(service.Methods, method)
		}

		ctx.Services = append(ctx.Services, service)
	}

	t, err := template.New("client_api").Parse(apiTemplate)
	if err != nil {
		return nil, err
	}

	b := bytes.NewBufferString("")
	t.Execute(b, ctx)

	cf := &plugin.CodeGeneratorResponse_File{}
	cf.Name = proto.String(tsModuleFilename(d))
	cf.Content = proto.String(b.String())

	return cf, nil
}

func protoToTSType(f *descriptor.FieldDescriptorProto) (string, string) {
	switch f.GetType() {
	case descriptor.FieldDescriptorProto_TYPE_DOUBLE,
		descriptor.FieldDescriptorProto_TYPE_FIXED32,
		descriptor.FieldDescriptorProto_TYPE_FIXED64,
		descriptor.FieldDescriptorProto_TYPE_INT32,
		descriptor.FieldDescriptorProto_TYPE_INT64:
		return "number", "number"
	case descriptor.FieldDescriptorProto_TYPE_STRING:
		return "string", "string"
	case descriptor.FieldDescriptorProto_TYPE_BOOL:
		return "boolean", "boolean"
	case descriptor.FieldDescriptorProto_TYPE_MESSAGE:
		name := f.GetTypeName()

		// Google WKT Timestamp is a special case here:
		//
		// Currently the value will just be left as jsonpb RFC 3339 string.
		// JSON.stringify already handles serializing Date to its RFC 3339 format.
		//
		if name == ".google.protobuf.Timestamp" {
			return "Date", "string"
		}

		return removePkg(name), removePkg(name)
	}

	log.Printf("unknown type: %s", f.GetType())

	return "string", "string"
}

func removePkg(s string) string {
	p := strings.Split(s, ".")
	return p[len(p)-1]
}

func camelCase(s string) string {
	parts := strings.Split(s, "_")

	for i, p := range parts {
		if i == 0 {
			parts[i] = strings.ToLower(p)
		} else {
			parts[i] = strings.ToUpper(p[0:1]) + strings.ToLower(p[1:])
		}
	}

	return strings.Join(parts, "")
}
