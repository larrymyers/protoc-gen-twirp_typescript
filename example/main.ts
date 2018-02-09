import {Haberdasher, Hat, TwirpError} from './ts_client';

const client = new Haberdasher('http://localhost:8080');

client.makeHat({inches: 10})
    .then((hat: Hat) => {
        console.log(hat);
    })
    .catch((err: Error) => {
        console.error(err);
    });

client.makeHat({inches: -1})
    .then((hat: Hat) => {
        console.log(hat);
    })
    .catch((err: TwirpError) => {
        console.error(err.code + " " + err.message);
    });