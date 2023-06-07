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

function muteStream(url) {
    const video = document.querySelector('video');
    video.querySelector('source').setAttribute('src', url);
    video.load();
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
            const div = document.createElement('div');
            div.classList.add('ex-item');

            // Thumbnail
            const thumbnail = document.createElement('img');
            thumbnail.classList.add("ex-thumb");
            thumbnail.src = item.thumbnailUrl.replace("{width}", "1080").replace("{height}", "1920");

            // Profile Picture
            const profile = document.createElement('img');
            profile.classList.add("ex-pfp");
            profile.src = item.profileUrl;

            // Display Name
            const displayName = document.createElement('p');
            displayName.classList.add("ex-name");
            displayName.textContent = item.displayName;

            // Viewers
            const viewers = document.createElement('p');
            viewers.classList.add("ex-view");
            viewers.innerHTML = `<img class="ex-eye" src="img/eye.png"> ${item.viewers}`;

            div.appendChild(thumbnail);
            div.appendChild(profile);
            div.appendChild(displayName);
            div.appendChild(viewers);

            container.appendChild(div);
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
