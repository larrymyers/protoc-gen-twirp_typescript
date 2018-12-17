package pbjs

import (
	"reflect"
	"testing"

	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
)

func TestGenerate(t *testing.T) {
	tests := []struct {
		name    string
		d       *descriptor.FileDescriptorProto
		want    []*plugin.CodeGeneratorResponse_File
		wantErr bool
	}{
		{
			name: "don't generate anything for timestamp.proto",
			d: &descriptor.FileDescriptorProto{
				Name: proto.String("google/protobuf/timestamp.proto"),
			},
			want:    []*plugin.CodeGeneratorResponse_File{},
			wantErr: false,
		},
		{
			name: "don't generate anything if there are no services",
			d: &descriptor.FileDescriptorProto{
				Name:    proto.String("message.proto"),
				Service: []*descriptor.ServiceDescriptorProto{},
			},
			want:    []*plugin.CodeGeneratorResponse_File{},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			g := &Generator{}
			got, err := g.Generate(tt.d)
			if (err != nil) != tt.wantErr {
				t.Errorf("Generator.Generate() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Generator.Generate() = %v, want %v", got, tt.want)
			}
		})
	}
}
