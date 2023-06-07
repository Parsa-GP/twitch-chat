const search_params = new URLSearchParams(window.location.search);
if (search_params.has('channel')) {
    chnl = search_params.get('channel');
    document.getElementById("popup").style.opacity = 0
    document.getElementById("popup").style.display = "none"
} else {
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

qualityDropdown.addEventListener("change", function() {
  const selectedUrl = qualityDropdown.value;
  if (selectedUrl !== "") {
    playStream(selectedUrl);
  }
});
