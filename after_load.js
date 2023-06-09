const search_params = new URLSearchParams(window.location.search);
if (search_params.has('channel')) {
    chnl = search_params.get('channel');
    document.getElementById("popup").style.opacity = 0
    document.getElementById("popup").style.display = "none"
} else {
    exploreTable();
    throw new Error('The channel is not loaded');
}


fetch(`https://tw-rly.fly.dev/streamer/${chnl}`)
.then(response => response.json())
.then(data => {
    response_data = data;
    const json_data = JSON.parse(JSON.stringify(response_data));
    const qualityDropdown = document.getElementById("qualityDropdown");

    for (let i = 0; i < json_data.length; i++) {
        const option = document.createElement("option");
        option.value = json_data[i].url;
        option.text = json_data[i].quality;
        qualityDropdown.appendChild(option);
    }
})
.catch(error => console.error(error));

function playStream(url) {
    const video = document.querySelector('video');
    video.querySelector('source').setAttribute('src', url);
    video.load();
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

}

function muteStream() {
    const video = document.querySelector('video');
    if (video.volume == 1) {
        video.volume = 0;
    } else {
        video.volume = 1
    }
    
}

function exploreTable() {
    fetch(`https://api.twitchfa.com/v2/twitch/streamers?page=1&limit=100`)
      .then(response => response.json())
      .then(data => {resp_data = data
        const container = document.getElementById("explore-grid");
        console.log(resp_data)

        resp_data.data.forEach(item => {
            const exitem = document.createElement('a');
            exitem.href = window.location.origin + window.location.pathname + "?channel=" + item.login;
            exitem.classList.add('ex-item');

            // Thumbnail
            const thumbnail = document.createElement('img');
            thumbnail.classList.add("ex-thumb");
            thumbnail.src = item.thumbnailUrl.replace("{width}", "1080").replace("{height}", "1920");

            // Bottom Container
            const btm = document.createElement('div');
            btm.classList.add('ex-btm');

            // Profile Picture
            const profile = document.createElement('img');
            profile.classList.add("ex-pfp");
            profile.src = item.profileUrl;

            
            // Text Container
            const cont = document.createElement('div');
            cont.classList.add('ex-text');

            // Display Name
            const displayName = document.createElement('p');
            displayName.classList.add("ex-name");
            displayName.textContent = item.displayName;

            // Game Name
            const gameName = document.createElement('p');
            gameName.classList.add("ex-gname");
            gameName.textContent = item.gameName;

            // Viewers
            const viewers = document.createElement('p');
            viewers.classList.add("ex-view");
            viewers.innerHTML = `<img class="ex-eye" src="img/eye.png"> ${item.viewers}`;

            cont.appendChild(displayName);
            cont.appendChild(gameName);

            btm.appendChild(profile);
            btm.appendChild(cont);

            exitem.appendChild(viewers);
            exitem.appendChild(thumbnail);
            exitem.appendChild(btm);

            container.appendChild(exitem);
        })
      .catch(error => {console.log(error); ERR = true});
    
      })
}

qualityDropdown.addEventListener("change", function() {
  const selectedUrl = qualityDropdown.value;
  if (selectedUrl !== "") {
    playStream(selectedUrl);
  }
});
