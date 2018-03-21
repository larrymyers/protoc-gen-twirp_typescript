
import {createTwirpRequest, throwTwirpError} from './twirp';


export interface Hat {
    size: number;
    color: string;
    name: string;
    createdOn: Date;
    
}

interface HatJSON {
    size: number;
    color: string;
    name: string;
    created_on: string;
    
}

const HatToJSON = (m: Hat): HatJSON => {
    return {
        size: m.size,
        color: m.color,
        name: m.name,
        created_on: m.createdOn.toISOString(),
        
    };
};

const JSONToHat = (m: HatJSON): Hat => {
    return {
        size: m.size,
        color: m.color,
        name: m.name,
        createdOn: new Date(m.created_on),
        
    };
};

export interface Size {
    inches: number;
    
}

interface SizeJSON {
    inches: number;
    
}

const SizeToJSON = (m: Size): SizeJSON => {
    return {
        inches: m.inches,
        
    };
};

const JSONToSize = (m: SizeJSON): Size => {
    return {
        inches: m.inches,
        
    };
};



export interface Haberdasher {
    makeHat: (size: Size) => Promise<Hat>;
    
}

export class DefaultHaberdasher implements Haberdasher {
    private hostname: string;
    private pathPrefix = "/twirp/twitch.twirp.example.Haberdasher/";

    constructor(hostname: string) {
        this.hostname = hostname;
    }
    makeHat(size: Size): Promise<Hat> {
        const url = this.hostname + this.pathPrefix + "MakeHat";
        return fetch(createTwirpRequest(url, SizeToJSON(size))).then((resp) => {
            if (!resp.ok) {
                return throwTwirpError(resp);
            }

            return resp.json().then(JSONToHat);
        });
    }
    
}

