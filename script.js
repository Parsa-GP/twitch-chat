function t2e(input, twitchId) {
    fetch(`https://7tv.io/v3/users/twitch/${twitchId}`)
    .then(response => response.text())
    .then(data => {
        const json = JSON.parse(data);
        
        const emotes = {};
        json.emote_set.emotes.forEach((emote) => {
            emotes[emote.name] = `https:${emote.data.host.url}/2x.webp`;
        });
        const output = input.replace(/\b(\w+)\b/g, (match, word) =>
            emotes[word] ? `<img src="${emotes[word]}">` : word
        );
        return output;  
    })
    .catch(error => console.error(error));
}
