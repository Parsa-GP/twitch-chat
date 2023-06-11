const searchPar = new URLSearchParams(window.location.search);
if (searchPar.has('channel')) {
    chnl = searchPar.get('channel');
} else {
    throw new Error('The channel is not loaded');
}

const client = new tmi.Client({
   channels: [chnl],
   connection: {
      server: "tw-chat-rly.fly.dev",
      port: 443,
      secure: true,
   },
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    console.log(tags)
    let messageWithEmoticons = message;
    const emotes = tags['emotes'];
    if(emotes) {
        for(const property in emotes) {
            const splitEmote = JSON.stringify(emotes[property][0]).replaceAll(`"`, '').split('-');
            const start = parseInt(splitEmote[0]);
            const end = parseInt(splitEmote[1]) + 1;
            const emoteContent = message.substring(start, end);
            const emote = `<img class="emote" src="https://static-cdn.jtvnw.net/emoticons/v1/${property}/1.0" />`;
            messageWithEmoticons = messageWithEmoticons.replaceAll(emoteContent, emote);
        }
    }

    const container = document.querySelector('#chat-container');
    const messageContainer = document.createElement('div');

    messageContainer.classList.add('message');
    let badges = "";
    for (const k in tags["badges"]) {
        badges += `<img src="img/badges/${k}.png" onerror="this.onerror=null;this.style.display = 'none'" class="badge ${k}">`
    }
    messageContainer.innerHTML = `${badges} <span style="color:${tags['color']};" class="display-name">${tags['display-name']}: </span>${messageWithEmoticons}`;

    container.appendChild(messageContainer);

    const messages = document.querySelectorAll('.message');
    messages[messages.length - 1].scrollIntoView(true);
})
