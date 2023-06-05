function mentionBolder(msg) {
    const output = msg.replace(/@(\S+)/g, "<b>@$1</b>");
    return output;
}

const searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('channel')) {
    chnl = searchParams.get('channel');
} else {
    console.log("A Code error :\(")
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
    let messageWithEmoticons = message;
    const emotes = tags['emotes'];
    if(emotes) {
        for(const property in emotes) {
            const splitEmote = JSON.stringify(emotes[property][0]).replaceAll(`"`, '').split('-');
            const start = parseInt(splitEmote[0]);
            const end = parseInt(splitEmote[1]) + 1;
            const emoteContent = message.substring(start, end);
            const emote = `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${property}/1.0" />`;
            messageWithEmoticons = messageWithEmoticons.replaceAll(emoteContent, emote);
        }
    }

    const container = document.querySelector('#chat-container');
    const messageContainer = document.createElement('div');
    const userInfo = document.createElement('span');
    const newMessage = document.createElement('span');

    messageContainer.classList.add('message');

    if(tags['mod'] === true) {
        userInfo.innerHTML = mentionBolder(`<b>[MOD]</b> ${tags['display-name']}: `);
        userInfo.classList.add('mod');
    } else if(tags['vip'] === true) {
        userInfo.innerHTML = mentionBolder(`<b>(VIP)</b> ${tags['display-name']}: `);
        userInfo.classList.add('vip');
    } else if(tags['subscriber'] === true) {
        userInfo.innerHTML = mentionBolder(`<b>{SUB}</b> ${tags['display-name']}: `);
        userInfo.classList.add('sub');
    } else {
        userInfo.innerHTML = mentionBolder(`${tags['display-name']}: `);
        userInfo.classList.add('usr');
    }

    newMessage.innerHTML = messageWithEmoticons;
    newMessage.classList.add('text-indigo-800', 'flex', 'gap-1', 'flex-wrap', 'mt-2');

    messageContainer.appendChild(userInfo);
    messageContainer.appendChild(newMessage);
    container.appendChild(messageContainer);

    const messages = document.querySelectorAll('.message');
    const lastMessage = messages[messages.length - 1];

    lastMessage.scrollIntoView(true);
})
