<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { STATE_KEY } from "@/constants";
import { getHashParams } from "@/utils";
import axios from "axios";
import { getRecentlyPlayedTracks } from "@/services/spotify";

// TODO this is temp code
var params = getHashParams();

var access_token = params.access_token,
  state = params.state,
  storedState = localStorage.getItem(STATE_KEY);

if (access_token && (state == null || state !== storedState)) {
  alert("There was an error during the authentication");
} else {
  localStorage.removeItem(STATE_KEY);
  if (access_token) {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response) => console.log(response));

    getRecentlyPlayedTracks(access_token);
  }
}
</script>
