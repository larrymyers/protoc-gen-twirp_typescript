package generator

import (
	"path"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func tsModuleFilename(f *descriptor.FileDescriptorProto) string {
	name := *f.Name

	if ext := path.Ext(name); ext == ".proto" || ext == ".protodevel" {
		base := path.Base(name)
		name = base[:len(base)-len(path.Ext(base))]
	}

	name += ".ts"

	return name
}
