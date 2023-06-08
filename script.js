if (new Date().getMonth() == 5) {
    document.getElementById("popup").classList.add('pride-flag');
}

function t2e(input, twitchId) {
    let output;
    let data_response;
    ERR=false
    fetch(`https://7tv.io/v3/users/twitch/${twitchId}`)
    .then(response => response.json())
    .then(data => data_response = data)
    .catch(error => {console.log(error); ERR = true;});

    if (!ERR) {
        console.log(JSON.stringify(data_response))
        const json = JSON.parse(JSON.stringify(data_response));
        const emotes = {};
        json.emote_set.emotes.forEach((emote) => {
            emotes[emote.name] = `https:${emote.data.host.url}/2x.webp`;
        });
        output = input.replace(/\b(\w+)\b/g, (_match, word) =>
            emotes[word] ? `<img src="${emotes[word]}">` : word
        );

        return output;
    }
    
}

