package generator

import (
	"errors"
	"fmt"
	"strings"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
	"go.larrymyers.com/protoc-gen-twirp_typescript/generator/minimal"
	"go.larrymyers.com/protoc-gen-twirp_typescript/generator/pbjs"
)

func GetParameters(in *plugin.CodeGeneratorRequest) map[string]string {
	params := make(map[string]string)

	if in.Parameter == nil {
		return params
	}

	pairs := strings.Split(*in.Parameter, ",")

	for _, pair := range pairs {
		kv := strings.Split(pair, "=")
		params[kv[0]] = kv[1]
	}

	return params
}

type Generator interface {
	Generate(d *descriptor.FileDescriptorProto) ([]*plugin.CodeGeneratorResponse_File, error)
}

func NewGenerator(p map[string]string) (Generator, error) {
	version, ok := p["version"]
	if !ok {
		version = "v5"
	}

	if version != "v5" && version != "v6" {
		return nil, errors.New(fmt.Sprintf("version is %s, must be v5 or v6", version))
	}

	lib, ok := p["library"]
	if ok && lib == "pbjs" {
		return pbjs.NewGenerator(version), nil
	}

	return minimal.NewGenerator(version, p), nil
}
