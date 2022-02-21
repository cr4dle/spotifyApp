<template>
  <div id="app">
    <template v-if="!isAuth">
      Please log in to Spotify to check the recently played tracks.
    </template>
    <template v-else>
      <div class="banner">
        <div v-if="userImage" :class="['circular', userImageClass]">
          <img :src="userImage" alt="profile image" />
        </div>
        <span>{{ displayName }}</span>
        <button class="btn" @click="onLogOutClicked">Log out</button>
      </div>
    </template>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { localStorage } from "@/utils";
import { spotify } from "@/services";
import { AUTHENTICATION_KEY } from "@/constants";
import { SpotifyProfile } from "./types/SpotifyProfile";

@Component
export default class App extends Vue {
  private spotifyProfile: SpotifyProfile | null = null;

  get isAuth(): boolean {
    return localStorage.get(AUTHENTICATION_KEY) !== null;
  }

  get userImage(): string {
    return "https://i.scdn.co/image/ab67616d0000b273c6b577e4c4a6d326354a89f7";
    const userImages = this.spotifyProfile?.images || [];

    return userImages.length > 0 ? userImages[0].url : "";
  }

  get userImageClass(): string {
    return "landscape";
    const userImages = this.spotifyProfile?.images || [];

    return userImages.length > 0
      ? userImages[0].height === userImages[0].width
        ? "square"
        : userImages[0].height < userImages[0].width
        ? "landscape"
        : "portrait"
      : "";
  }

  get displayName(): string {
    return this.spotifyProfile?.display_name || "";
  }

  @Watch("isAuth", { immediate: true })
  async onIsAuth(newValue: boolean) {
    if (newValue) {
      this.spotifyProfile = await spotify.getProfile(
        localStorage.get(AUTHENTICATION_KEY) || ""
      );
    } else {
      this.spotifyProfile = null;
    }
  }

  onLogOutClicked() {
    localStorage.clear();
    location.reload();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// TODO theme colour should come from theme.scss file

.btn {
  background: indigo;
  border: 0;
  color: white;
  padding: 15px;
  border-radius: 20px;
  transition: 0.4s ease;
  margin: 5px;
}

.btn:hover {
  background: black;
  cursor: pointer;
}
</style>

<style scoped lang="scss">
$image-size: 50px;

.banner {
  display: flex;

  justify-content: flex-end;
  align-items: center;

  .circular {
    display: inline-block;

    &.square img {
      border-radius: 50%;
      width: $image-size;
      height: $image-size;
    }

    &.landscape {
      position: relative;
      width: $image-size;
      height: $image-size;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: auto;
        height: 100%;
      }
    }

    &.portrait {
      width: $image-size;
      height: $image-size;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
