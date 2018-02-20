package generator

import (
	"fmt"

	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
)

func CreateTSConfig() *plugin.CodeGeneratorResponse_File {
	content := fmt.Sprintf(`{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "importHelpers": true,
    "strict": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  }
}
`)

	fileName := "tsconfig.json"
	cf := &plugin.CodeGeneratorResponse_File{}
	cf.Name = &fileName
	cf.Content = &content

	return cf
}
