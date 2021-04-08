package main

import (
	"io"
	"io/ioutil"
	"os"

	"github.com/golang/protobuf/proto"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
	"go.larrymyers.com/protoc-gen-twirp_typescript/generator"
	"go.larrymyers.com/protoc-gen-twirp_typescript/generator/minimal"
)

func main() {
	req := readRequest(os.Stdin)
	writeResponse(os.Stdout, generate(req))
}

func readRequest(r io.Reader) *plugin.CodeGeneratorRequest {
	data, err := ioutil.ReadAll(r)
	if err != nil {
		panic(err)
	}

	req := new(plugin.CodeGeneratorRequest)
	if err = proto.Unmarshal(data, req); err != nil {
		panic(err)
	}

	if len(req.FileToGenerate) == 0 {
		panic(err)
	}

	return req
}

func generate(in *plugin.CodeGeneratorRequest) *plugin.CodeGeneratorResponse {
	resp := &plugin.CodeGeneratorResponse{}
	params := generator.GetParameters(in)

	gen, err := generator.NewGenerator(params)
	if err != nil {
		resp.Error = proto.String(err.Error())
		return resp
	}

	for _, f := range in.GetProtoFile() {
		files, err := gen.Generate(f)
		if err != nil {
			resp.Error = proto.String(err.Error())
			return resp
		}

		for _, cf := range files {
			resp.File = append(resp.File, cf)
		}
	}

	lib, _ := params["library"]
	if lib != "pbjs" {
		resp.File = append(resp.File, minimal.RuntimeLibrary())
	}

	return resp
}

func writeResponse(w io.Writer, resp *plugin.CodeGeneratorResponse) {
	data, err := proto.Marshal(resp)
	if err != nil {
		panic(err)
	}
	_, err = w.Write(data)
	if err != nil {

	}
}
