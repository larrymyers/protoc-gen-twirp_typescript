package minimal

import (
	"testing"
)

func TestAPIContext_ApplyMarshalFlags(t *testing.T) {
	nested := &Model{
		Name: "Nested",
	}

	bar := &Model{
		Name:       "Bar",
		CanMarshal: true,
		Fields: []ModelField{
			{
				Name:      "nested",
				Type:      nested.Name,
				IsMessage: true,
			},
		},
	}

	baz := &Model{
		Name:         "Baz",
		CanUnmarshal: true,
	}

	call := ServiceMethod{
		Name:       "Call",
		InputArg:   "bar",
		InputType:  "Bar",
		OutputType: "Baz",
	}

	s := &Service{
		Name:    "FooService",
		Package: "",
		Methods: []ServiceMethod{call},
	}

	ctx := NewAPIContext("")

	ctx.AddModel(nested)
	ctx.AddModel(bar)
	ctx.AddModel(baz)
	ctx.Services = append(ctx.Services, s)

	if nested.CanMarshal == true {
		t.Error("something went wrong")
	}

	ctx.ApplyMarshalFlags()

	if nested.CanMarshal != true {
		t.Errorf("expected nested.CanMarshal to be true since it is a field in Bar")
	}
}

func Test_parse(t *testing.T) {
	type args struct {
		f         ModelField
		modelName string
	}
	tests := []struct {
		name string
		args args
		want string
	}{
		{
			// Example proto:
			// message GetClientsResponse {
			//   repeated google.protobuf.Timestamp dates = 1;
			// }
			name: "repeated date field with no snake case",
			args: args{
				f: ModelField{
					Name:       "dates",
					Type:       "Date[]",
					JSONName:   "dates",
					JSONType:   "string[]",
					IsRepeated: true,
					IsMessage:  false,
				},
				modelName: "GetClientsResponse",
			},
			want: "(m.dates as (Date | string)[]).map((n) => new Date(n))",
		},
		{
			// Example proto:
			// message GetClientsResponse {
			//   repeated google.protobuf.Timestamp special_dates = 1;
			// }
			name: "repeated date field with snake case",
			args: args{
				f: ModelField{
					Name:       "special_dates",
					Type:       "Date[]",
					JSONName:   "specialDates",
					JSONType:   "string[]",
					IsRepeated: true,
					IsMessage:  false,
				},
				modelName: "GetClientsResponse",
			},
			want: "((((m as GetClientsResponse).special_dates) ? (m as GetClientsResponse).special_dates : (m as GetClientsResponseJSON).specialDates) as (Date | string)[]).map((n) => new Date(n))",
		},
		{
			// Example proto:
			// message GetClientsResponse {
			//   repeated Client clients = 1;
			// }
			name: "repeated message field with no snake case",
			args: args{
				f: ModelField{
					Name:       "clients",
					Type:       "Client[]",
					JSONName:   "clients",
					JSONType:   "ClientJSON[]",
					IsRepeated: true,
					IsMessage:  true,
				},
				modelName: "GetClientsResponse",
			},
			want: "(m.clients as (Client | ClientJSON)[]).map(JSONToClient)",
		},
		{
			// Example proto:
			// message GetClientsResponse {
			//   repeated Client special_clients = 1;
			// }
			name: "repeated message field with snake case",
			args: args{
				f: ModelField{
					Name:       "special_clients",
					Type:       "Client[]",
					JSONName:   "specialClients",
					JSONType:   "ClientJSON[]",
					IsRepeated: true,
					IsMessage:  true,
				},
				modelName: "GetClientsResponse",
			},
			want: "((((m as GetClientsResponse).special_clients) ? (m as GetClientsResponse).special_clients : (m as GetClientsResponseJSON).specialClients) as (Client | ClientJSON)[]).map(JSONToClient)",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := parse(tt.args.f, tt.args.modelName); got != tt.want {
				t.Errorf("parse() = %v, want %v", got, tt.want)
			}
		})
	}
}
