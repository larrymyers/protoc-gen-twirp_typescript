import { AxiosInstance } from 'axios';
import { RPCImpl } from 'protobufjs';
export declare const createTwirpAdapter: (axios: AxiosInstance, methodLookup: (fn: any) => string) => RPCImpl;
