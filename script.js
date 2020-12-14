const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable Button

function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing our joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '532721a38c38488787b47ceef8e0b919',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}

// Get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl =
        'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text To SPeech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // catch errors here
        console.log('whoops', error);
    }
}

// Event Listeners

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
