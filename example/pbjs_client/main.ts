import { createHaberdasher } from './service.twirp';

const haberdasher = createHaberdasher('http://localhost:8080');

haberdasher
    .makeHat({ inches: 10 })
    .then(hat => {
        document.getElementById('debug')!.innerHTML = JSON.stringify(
            hat,
            null,
            '  '
        );
        console.log(hat);
    })
    .catch(err => console.error(err));
