BINARY := protoc-gen-twirp_typescript

TIMESTAMP := $(shell date -u "+%Y-%m-%dT%H:%M:%SZ")
COMMIT := $(shell git rev-parse --short HEAD)
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

LDFLAGS := -ldflags "-X main.Timestamp=${TIMESTAMP} -X main.Commit=${COMMIT} -X main.Branch=${BRANCH}"

all: clean test install

install:
	go install ${LDFLAGS} go.larrymyers.com/protoc-gen-twirp_typescript

test:
	go test -v ./...

lint:
	go list ./... | grep -v /vendor/ | xargs -L1 golint -set_exit_status

run: install
	mkdir -p example/ts_client && \
	protoc --proto_path=${GOPATH}/src:. --twirp_out=. --go_out=. --twirp_typescript_out=package_name=haberdasher:./example/ts_client ./example/service.proto

build_linux:
	GOOS=linux GOARCH=amd64 go build -o ${BINARY} ${LDFLAGS} go.larrymyers.com/protoc-gen-twirp_typescript

clean:
	-rm -f ${GOPATH}/bin/${BINARY}
