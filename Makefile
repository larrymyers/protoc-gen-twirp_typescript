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
	golint -set_exit_status ./...

build_proto: install
	protoc --twirp_out=. --go_out=. --twirp_typescript_out=package_name=haberdasher:./example/ts_client ./example/service.proto

build_linux:
	GOOS=linux GOARCH=amd64 go build -o ${BINARY} ${LDFLAGS} go.larrymyers.com/protoc-gen-twirp_typescript

client_setup:
	cd pbjs-twirp && \
	npm link && \
	cd ../example/pbjs_client && \
	npm link pbjs-twirp

clean:
	-rm -f ${GOPATH}/bin/${BINARY}
