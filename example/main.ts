import {Haberdasher, Hat, TwirpError} from './ts_client';

const haberdasher = new Haberdasher('http://localhost:8080');

haberdasher.makeHat({inches: 10})
    .then((hat: Hat) => {
        console.log("Example makeHat response:\n");
        console.log(hat);
        console.log("");
    })
    .catch((err: Error) => {
        console.error(err);
    });

haberdasher.makeHat({inches: -1})
    .then((hat: Hat) => {
        console.log(hat);
    })
    .catch((err: TwirpError) => {
        console.log("Example makeHat error:\n");
        console.error(err.code + ": " + err.message);
    });
