package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/rs/cors"

	"github.com/golang/protobuf/ptypes"
	"github.com/twitchtv/twirp"
	"go.larrymyers.com/protoc-gen-twirp_typescript/example"
)

type randomHaberdasher struct{}

func (h *randomHaberdasher) MakeHat(ctx context.Context, size *example.Size) (*example.Hat, error) {
	if size.Inches <= 0 {
		return nil, twirp.InvalidArgumentError("Inches", "must be a positive number greater than zero")
	}

	ts, err := ptypes.TimestampProto(time.Now())
	if err != nil {
		return nil, err
	}

	return &example.Hat{
		Size:      size.Inches,
		Color:     []string{"white", "black", "brown", "red", "blue"}[rand.Intn(4)],
		Name:      []string{"bowler", "baseball cap", "top hat", "derby"}[rand.Intn(3)],
		CreatedOn: ts,
	}, nil
}

func main() {
	mux := http.NewServeMux()

	mux.Handle(example.HaberdasherPathPrefix, example.NewHaberdasherServer(&randomHaberdasher{}, nil))

	handler := cors.AllowAll().Handler(mux)

	addr := fmt.Sprintf(":%d", 8080)
	log.Printf("server listening at: %s", addr)

	err := http.ListenAndServe(addr, handler)
	if err != nil {
		log.Fatalln(err)
	}
}
