GO     ?= go
PROTOC ?= protoc
GOLINT ?= golint
NPM    ?= npm
BINARY := protoc-gen-twirp_typescript

TIMESTAMP := $(shell date -u "+%Y-%m-%dT%H:%M:%SZ")
COMMIT := $(shell git rev-parse --short HEAD)
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

LDFLAGS := -ldflags "-X main.Timestamp=${TIMESTAMP} -X main.Commit=${COMMIT} -X main.Branch=${BRANCH}"

all: clean test install

install:
	$(GO) install ${LDFLAGS} go.larrymyers.com/protoc-gen-twirp_typescript

test:
	$(GO) test -v ./...

lint:
	$(GOLINT) -set_exit_status ./...

gen-example-go: install
	$(PROTOC) --twirp_out=. --go_out=. ./example/*.proto

gen-example-pbjs-client: install
	$(PROTOC) --twirp_typescript_out=library=pbjs:./example/pbjs_client ./example/*.proto

gen-example-ts-client: install
	$(PROTOC) --twirp_typescript_out=package_name=haberdasher:./example/ts_client ./example/*.proto

generate:
	$(MAKE) gen-example-go
	$(MAKE) gen-example-pbjs-client
	$(MAKE) gen-example-ts-client

build-linux:
	GOOS=linux GOARCH=amd64 \
	$(GO) build -o $(BINARY) $(LDFLAGS) go.larrymyers.com/protoc-gen-twirp_typescript

client-setup:
	cd pbjs-twirp && \
	$(NPM) link && \
	cd ../example/pbjs_client && \
	$(NPM) link pbjs-twirp

clean:
	-rm -f $(GOPATH)/bin/$(BINARY)

.PHONY: install test lint \
	gen-example-go gen-example-pbjs-client gen-example-ts-client generate \
	clean
