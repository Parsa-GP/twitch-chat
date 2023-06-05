const json = '[{"quality":"1080p60 (source)","resolution":"1920x1080","url":"https://video-weaver.fra05.hls.ttvnw.net/v1/playlist/CrkE5I6BtwS7KPOTqtTuQ0rUWsI4Uc09Boi7Na4yWRD_vb8F9N9gjugWRxpTCF_ki3X-FlzhiavBxq6iiORkIBeB1y12vpk3jB7qEV9gL5ODmYLuiEXIoYIWJ4ZlHxLtl852cHFYlHMBn1rqIRp_iZ994ORh_fGHPQVXvKckyp93LZNJWAZETcSXOMKZVw_YHXLtK08McIfSVOqvrT-P4yly3F9BIuFd_Sv2dIjKR5i8ckm6W6RlajDHy-NaFG4NKNl0AsM2BhRmCpE27vG4FYDUhuIZBNf4qaZNMBQd5uy40Y3fxBbpgSXXA6kzxpn6_e8WnEzcmAfQHWO85avVkvOG-1AHG6P5252VWN2j4fCXa8TdDY8rO94kppQPasEodaVgJcfOTH5jLP1D5x6UGHm8ldqhH6UGrHaW7Zryfw4esNvzqOkFqx9fw6ePYBTnTg8ZvixZkIc2huazCeIeBzM6GWx_WWAiNAEzF9sy8rhC2stSTlTzW9v0K674KR9uqYtzJhXOlU1LMkmoxdzfxvdq86CTqx9BDVSk_BdoU0gRe-AdQgWsEED0TnViM_0YQGLDLLP_UIMKy6ljKLp3xuM1OENP1KRBrzvOYw0KhWunL71x5rZq9W4yF35FXnuK5dSFvvG7UCx8mqGwyHRQp2sOyX3hIRqdKS5zr0EcbQlr3jec6i2mPh1TByiK9D3CI2XMO4WyTEfotj7YqdECuZkjQ-5QxgP0lLlR_2y4L_qyhPzeHevFNgE5BH4aDE5d97g2jH-Ad2F42iABKglldS13ZXN0LTIw3gY.m3u8"},{"quality":"720p60","resolution":"1280x720","url":"https://video-weaver.fra05.hls.ttvnw.net/v1/playlist/CrAETEw1AI.m3u8"},{"quality":"audio_only","resolution":null,"url":"https://video-weaver.fra05.hls.ttvnw.net/v1/playlist/CrIEDUAg.m3u8"}]';

const data = JSON.parse(json);
const qualityDropdown = document.getElementById("qualityDropdown");

function playStream(url) {
    const video = document.querySelector('video');
    video.querySelector('source').setAttribute('src', url);
    video.load();
    video.play();
}

for (let i = 0; i < data.length; i++) {
  const option = document.createElement("option");
  option.value = data[i].url;
  option.text = data[i].quality; // extract the quality key before space 
  qualityDropdown.appendChild(option);
}

qualityDropdown.addEventListener("change", function() {
  const selectedUrl = qualityDropdown.value;
  if (selectedUrl !== "") {
    playStream(selectedUrl);
  }
});
