const month = new Date().getMonth();
if (month == 5) {
    document.querySelector(':root').style.setProperty('--vid-bg', 'linear-gradient(90deg, red 16.66%, orange 0 33.33%, yellow 0 50%, green 0 66.66%, blue 0 83.33%, indigo 0)');
} else if (month == 11) {
    document.querySelector(':root').style.setProperty('--vid-bg', 'linear-gradient(90deg, #00c4ff, #005aff);');
}

let thumb_w = 1280;
let thumb_h = 720;

function backToPopup() {
    window.location.href = window.location.origin + window.location.pathname
}

function thumbUrl(chnl) {
    return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${chnl}-${thumb_w}x${thumb_h}.jpg`
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

function f2k(follower) {
    follower = follower.toString().replace(/[^0-9.]/g, '');
    if (follower < 1000) {return follower}
    let si = [
        {v: 1E3, s: "K"},
        {v: 1E6, s: "M"},
        {v: 1E9, s: "B"},
        {v: 1E12, s: "T"},
        {v: 1E15, s: "P"},
        {v: 1E18, s: "E"}
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (follower >= si[index].v) {
            break;
        }
    }
    return (follower / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}
