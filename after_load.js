// Set chnl to ?channel=
const search_params = new URLSearchParams(window.location.search);
if (search_params.has('channel')) {
    chnl = search_params.get('channel');
    document.getElementById("popup").style.display = "none"
    bioInfo(chnl);
} else {
    exploreTable();
    throw new Error('The channel is not loaded');
}
// Set variables
let stream = document.getElementById('stream');
let src = document.getElementById('stream-src');
stream.poster = thumbUrl(chnl);
stream.addEventListener('error', function(e) {console.error('Error during video playback:', e)})

qualityDropdown.addEventListener("change", function() {
    const selectedUrl = qualityDropdown.value;
    if (selectedUrl !== "") {playStream(selectedUrl)}});
  

fetch(`https://tw-rly.fly.dev/streamer/${chnl}`)
.then(response => response.json())
.then(data => {
    const json_data = JSON.parse(JSON.stringify(data));
    const qualityDropdown = document.getElementById("qualityDropdown");

    let def;
    for (let i = 0; i < json_data.length; i++) {
        const option = document.createElement("option");
        option.value = json_data[i].url;
        option.text = json_data[i].quality;
        qualityDropdown.appendChild(option);
        if (json_data[i].quality == "480p") {
            def = json_data[i].url
        }
    }
    document.getElementById('qualityDropdown').value = def;
    const src = document.getElementById('stream-src');
    src.src = def;
    stream.load();
})

function bioInfo(streamer) {
    fetch(`https://tw-rly.fly.dev/streamer/${streamer}/bio`)
    .then(response => response.json())
    .then(data => {
        const user = data[0].data.user;
        info = {
            "description": user.description,
            "isPartner": user.isPartner,
            "profile": user.profileImageURL,
            "follower": user.followers.totalCount,
            "socials": user.channel.socialMedias,
        }

        document.getElementById("bio-pfp").src = info.profile;
        if (info.isPartner) {
            document.getElementById("bio-pfp-badge").style.display = "block";
        }
        document.getElementById("bio-name").innerHTML = streamer;
        document.getElementById("bio-follower").innerHTML = f2k(info.follower) + "Followers";
        document.getElementById("bio-desc").innerHTML = info.description;

        const bio_cont = document.getElementById("bio-social-cont");
        info.socials.forEach(item => {
            const bioitem = document.createElement('a');
            bioitem.href = item.url;
            bioitem.classList.add('bio-item');

            const socialImage = document.createElement('img');
            socialImage.classList.add("bio-social");
            socialImage.src = "img/social/"+item.name+".png";
            socialImage.onerror = function() {this.src = "img/social/invalid.png"};
            socialImage.loading = "lazy";
            socialImage.alt = item.title;

            bioitem.appendChild(socialImage);
            bio_cont.appendChild(bioitem);
        })
    })
    .catch(error => {
        console.log(error);
        ERR = true;
        setTimeout(function() {bioInfo(streamer)}, 5000);
    });

}

function playStream(url) {
    src.src = url;
    stream.load();
    /*const video = document.querySelector('video');
    video.querySelector('source').setAttribute('src', url);
    video.load();
    if (video.paused) {video.play();} else {video.pause();}*/
}

/*function muteStream() {
    const video = document.querySelector('video');
    if (video.volume == 1) {
        video.volume = 0
    } else {
        video.volume = 1
    }
    
}*/
function msToHMS(ms) {
    let seconds = ms / 1000;

    let hours = parseInt( seconds / 3600 );
    seconds = seconds % 3600;

    let minutes = parseInt( seconds / 60 );
    seconds = Math.floor(seconds % 60);

    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    if (hours == 0) {return minutes+":"+seconds;}
    else {return hours+":"+minutes+":"+seconds;}
}

function exploreTable() {
    // You can modify the thumb_w and thumb_h in script.js.
    fetch(`https://api.twitchfa.com/v2/twitch/streamers?page=1&limit=100`)
      .then(response => response.json())
      .then(data => {resp_data = data
        const container = document.getElementById("explore-grid");

        let all_viewers = 0
        resp_data.data.forEach(item => {
            const exitem = document.createElement('a');
            exitem.href = window.location.origin + window.location.pathname + "?channel=" + item.login;
            exitem.classList.add('ex-item');

            // Thumbnail
            const thumbnail = document.createElement('img');
            thumbnail.classList.add("ex-thumb");
            thumbnail.loading = "lazy"
            thumbnail.src = item.thumbnailUrl.replace("{width}", thumb_w).replace("{height}", thumb_h);

            // Bottom Container
            const btm = document.createElement('div');
            btm.classList.add('ex-btm');

            // Profile Picture
            const profile = document.createElement('img');
            profile.classList.add("ex-pfp");
            profile.loading = "lazy"
            profile.src = item.profileUrl;

            
            // Text Container
            const cont = document.createElement('div');
            cont.classList.add('ex-text');

            // Display Name
            const displayName = document.createElement('p');
            displayName.classList.add("ex-name");
            displayName.textContent = item.displayName;

            // Uptime
            const upTime = document.createElement('p');
            upTime.classList.add("ex-uptime");
            upTime.textContent = msToHMS(item.uptime);

            // Game Name
            const gameName = document.createElement('p');
            gameName.classList.add("ex-gname");
            gameName.textContent = item.gameName;

            // Viewers
            const viewers = document.createElement('p');
            viewers.classList.add("ex-view");
            viewers.innerHTML = `<img class="ex-eye" src="img/eye.png"> ${item.viewers}`;
            all_viewers = all_viewers + Number(item.viewers);

            cont.appendChild(displayName);
            cont.appendChild(gameName);
            btm.appendChild(profile);
            btm.appendChild(cont);
            exitem.appendChild(viewers);
            exitem.appendChild(upTime);
            exitem.appendChild(thumbnail);
            exitem.appendChild(btm);
            container.appendChild(exitem);
        })
      document.getElementById("chnl-input").placeholder = "All viewers: " + all_viewers;
      })
      .catch(error => {console.log(error); ERR = true});
}
