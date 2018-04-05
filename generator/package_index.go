package generator

import (
	"bytes"
	"html/template"
	"path"

	"github.com/golang/protobuf/proto"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
)

const indexTemplate = `
{{- range .}}
export * from './{{.}}';
{{end}}
`

func CreatePackageIndex(files []*plugin.CodeGeneratorResponse_File) (*plugin.CodeGeneratorResponse_File, error) {
	var names []string

	for _, f := range files {
		filename := *f.Name

		// myModule.ts => myModule
		if path.Ext(filename) == ".ts" {
			moduleName := filename[:len(filename)-len(path.Ext(filename))]
			names = append(names, moduleName)
		}
	}

	t, err := template.New("index.ts").Parse(indexTemplate)
	if err != nil {
		return nil, err
	}

	b := bytes.NewBufferString("")
	t.Execute(b, names)

	cf := &plugin.CodeGeneratorResponse_File{}
	cf.Name = proto.String("index.ts")
	cf.Content = proto.String(b.String())

	return cf, nil
}
