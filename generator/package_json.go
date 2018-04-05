package generator

import (
	"fmt"

	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
)

func CreatePackageJSON(projectName string) *plugin.CodeGeneratorResponse_File {
	content := fmt.Sprintf(`{
  "name": "%s",
  "version": "1.0.0",
  "main": "index",
  "scripts": {
    "prepare": "tsc"  
  },
  "files": [
    "*.js",
    "*.d.ts"
  ],
  "dependencies": {
    "tslib": "^1.9.0"
  },
  "devDependencies": {
    "isomorphic-fetch": "^2.2.1",
    "typescript": "^2.7.1"
  }
}
`, projectName)

	fileName := "package.json"
	cf := &plugin.CodeGeneratorResponse_File{}
	cf.Name = &fileName
	cf.Content = &content

	return cf
}
