<template>
  <div class="main">
    <div class="main__container">
      <div class="side-menu">
        <side-menu
          :artists="recentlyPlayedArtists"
          @onArtistClicked="onArtistClicked"
        />
      </div>
      <div class="content">
        <track-collection :tracks="filteredRecentlyTracks" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO this should have subroute for the menu and main screen
import { Component, Inject, Vue, Watch } from "vue-property-decorator";
import { Artist } from "@/types/common/Artist";
import TrackCollection from "@/components/TrackCollection.vue";
import SideMenu from "@/components/SideMenu.vue";
import { getHashParams } from "@/utils";
import { spotify } from "@/services";
import { CurrentlyPlaying } from "@/types/CurrentlyPlaying";
import { Track } from "@/types/common/Track";

@Component({
  components: {
    SideMenu,
    TrackCollection,
  },
})
export default class Main extends Vue {
  private readonly DETECT_PLAYING_SONG_MILISECONDS: number = 3000;

  private recentlyPlayedTracks: Track[] = [];
  private currentlyPlayingTrack: CurrentlyPlaying | null = null;
  private filter = "";
  private interval: number = 0;

  async created() {
    const response = await spotify.getRecentlyPlayedTracks(this.accessToken);
    this.recentlyPlayedTracks = response.items.map((item) => item.track);

    this.interval = window.setInterval(async () => {
      const response = await spotify.getCurrentlyPlaying(this.accessToken);
      console.log("currently listening", response);
      console.log(this);

      if (response && response.is_playing) {
        if (this.currentlyPlayingTrack !== response) {
          console.log("Should add?", this.currentlyPlayingTrack !== response);
          this.currentlyPlayingTrack = response;
        }
      } else {
        this.currentlyPlayingTrack = null;
        if (response.item.artists.map(artist => artist.name).includes(this.filter)) {
          this.filter = "";
        }
      }
    }, this.DETECT_PLAYING_SONG_MILISECONDS);
  }

  destroyed() {
    window.clearInterval(this.interval);
  }

  // TODO come from Vuex or sesion cookie
  get accessToken(): string {
    // TODO create return type
    var params = getHashParams();
    console.log(params);
    return params.access_token;
  }

  get filteredRecentlyTracks() {
    const rencentlyPlayedTracks: Track[] = [...this.recentlyPlayedTracks];

    if (this.currentlyPlayingTrack) {
      console.log("Add curently playing song");
      rencentlyPlayedTracks.unshift(this.currentlyPlayingTrack.item);
    }

    return this.filter === undefined || this.filter === ""
      ? rencentlyPlayedTracks
      : rencentlyPlayedTracks.filter((track) =>
          track.artists.map((artist) => artist.name).includes(this.filter)
        );
  }

  get recentlyPlayedArtists() {
    return new Set(
      this.filteredRecentlyTracks?.flatMap((track) => track.artists)
        .map(artist => artist.name)
        .sort()
      );
  }

  @Watch("$route.query.artist", { deep: true, immediate: true })
  onQueryChange(newValue: string) {
    this.filter = newValue;
  }

  onArtistClicked(artist: string) {
    const artistQueryParam = this.$router.currentRoute.query?.artist?.toString() === artist
      ? ""
      : artist;
      
    
    this.$router.push({
      name: "Main",
      hash: this.$router.currentRoute.hash,
      query: {
        ...this.$router.currentRoute.query,
        artist: artistQueryParam,
      },
    });
  }
}
</script>

<style scoped lang="scss">
.main {
  &__container {
    display: flex; // TODO use mixins for browser compatibility

    .side-menu {
      flex-shrink: 0; // TODO cater for very long artists name
    }

    .content {
    }
  }
}
</style>
