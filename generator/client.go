package generator

import (
	"bytes"
	"fmt"
	"strings"
	"text/template"

	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
)

const apiTemplate = `
import {createTwirpRequest, throwTwirpError, Fetch} from './twirp';

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
        {{.JSONName}}: {{stringify .}},
        {{end}}
    };
};

const JSONTo{{.Name}} = (m: {{.Name}}JSON): {{.Name}} => {
    return {
        {{range .Fields -}}
        {{.Name}}: {{parse .}},
        {{end}}
    };
};
{{end}}

{{range .Services}}
export interface {{.Name}} {
	{{- range .Methods}}
    {{.Name}}: ({{.InputArg}}: {{.InputType}}) => Promise<{{.OutputType}}>;
    {{end}}
}

export class Default{{.Name}} implements {{.Name}} {
    private hostname: string;
    private fetch: Fetch;
    private pathPrefix = "/twirp/{{.Package}}.{{.Name}}/";

    constructor(hostname: string, fetch: Fetch) {
        this.hostname = hostname;
        this.fetch = fetch;
    }

    {{- range .Methods}}
    {{.Name}}({{.InputArg}}: {{.InputType}}): Promise<{{.OutputType}}> {
        const url = this.hostname + this.pathPrefix + "{{.Path}}";
        return this.fetch(createTwirpRequest(url, {{.InputType}}ToJSON({{.InputArg}}))).then((resp) => {
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
	Name       string
	Type       string
	JSONName   string
	JSONType   string
	IsMessage  bool
	IsRepeated bool
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
			model.Fields = append(model.Fields, newField(f))
		}

		ctx.Models = append(ctx.Models, model)

		for _, n := range m.NestedType {
			model := Model{
				Name: m.GetName() + "_" + n.GetName(),
			}

			for _, f := range n.GetField() {
				model.Fields = append(model.Fields, newField(f))
			}

			ctx.Models = append(ctx.Models, model)
		}
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

	funcMap := template.FuncMap{
		"stringify": stringify,
		"parse":     parse,
	}

	t, err := template.New("client_api").Funcs(funcMap).Parse(apiTemplate)
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

func newField(f *descriptor.FieldDescriptorProto) ModelField {
	tsType, jsonType := protoToTSType(f)
	jsonName := f.GetName()
	name := camelCase(jsonName)

	field := ModelField{
		Name:     name,
		Type:     tsType,
		JSONName: jsonName,
		JSONType: jsonType,
	}

	field.IsMessage = f.GetType() == descriptor.FieldDescriptorProto_TYPE_MESSAGE
	field.IsRepeated = isRepeated(f)

	return field
}

// generates the (Type, JSONType) tuple for a ModelField so marshal/unmarshal functions
// will work when converting between TS interfaces and protobuf JSON.
func protoToTSType(f *descriptor.FieldDescriptorProto) (string, string) {
	tsType := "string"
	jsonType := "string"

	switch f.GetType() {
	case descriptor.FieldDescriptorProto_TYPE_DOUBLE,
		descriptor.FieldDescriptorProto_TYPE_FIXED32,
		descriptor.FieldDescriptorProto_TYPE_FIXED64,
		descriptor.FieldDescriptorProto_TYPE_INT32,
		descriptor.FieldDescriptorProto_TYPE_INT64:
		tsType = "number"
		jsonType = "number"
	case descriptor.FieldDescriptorProto_TYPE_STRING:
		tsType = "string"
		jsonType = "string"
	case descriptor.FieldDescriptorProto_TYPE_BOOL:
		tsType = "boolean"
		jsonType = "boolean"
	case descriptor.FieldDescriptorProto_TYPE_MESSAGE:
		name := f.GetTypeName()

		// Google WKT Timestamp is a special case here:
		//
		// Currently the value will just be left as jsonpb RFC 3339 string.
		// JSON.stringify already handles serializing Date to its RFC 3339 format.
		//
		if name == ".google.protobuf.Timestamp" {
			tsType = "Date"
			jsonType = "string"
		} else {
			tsType = removePkg(name)
			jsonType = removePkg(name) + "JSON"
		}
	}

	if isRepeated(f) {
		tsType = tsType + "[]"
		jsonType = jsonType + "[]"
	}

	return tsType, jsonType
}

func isRepeated(field *descriptor.FieldDescriptorProto) bool {
	return field.Label != nil && *field.Label == descriptor.FieldDescriptorProto_LABEL_REPEATED
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

func stringify(f ModelField) string {
	if f.IsRepeated {
		singularType := f.Type[0 : len(f.Type)-2] // strip array brackets from type

		if f.Type == "Date" {
			return fmt.Sprintf("m.%s.map((n) => n.toISOString())", f.Name)
		}

		if f.IsMessage {
			return fmt.Sprintf("m.%s.map(%sToJSON)", f.Name, singularType)
		}
	}

	if f.Type == "Date" {
		return fmt.Sprintf("m.%s.toISOString()", f.Name)
	}

	if f.IsMessage {
		return fmt.Sprintf("%sToJSON(m.%s)", f.Type, f.Name)
	}

	return "m." + f.Name
}

func parse(f ModelField) string {
	if f.IsRepeated {
		singularType := f.Type[0 : len(f.Type)-2] // strip array brackets from type

		if f.Type == "Date" {
			return fmt.Sprintf("m.%s.map((n) => new Date(n))", f.JSONName)
		}

		if f.IsMessage {
			return fmt.Sprintf("m.%s.map(JSONTo%s)", f.JSONName, singularType)
		}
	}

	if f.Type == "Date" {
		return fmt.Sprintf("new Date(m.%s)", f.JSONName)
	}

	if f.IsMessage {
		return fmt.Sprintf("JSONTo%s(m.%s)", f.Type, f.JSONName)
	}

	return "m." + f.JSONName
}
