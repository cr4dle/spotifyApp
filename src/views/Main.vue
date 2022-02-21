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
        <track-navigation
          :pagesLoaded="recentlyPlayedTracksLatestResponse"
          @loadTracks="loadTracks"
          @getTracks="getTracks"
        />
        <track-collection :tracks="filteredRecentlyTracks" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO this should have subroute for the menu and main screen
import { Component, Vue, Watch } from "vue-property-decorator";
import TrackNavigation from "@/components/TrackNavigation.vue";
import TrackCollection from "@/components/TrackCollection.vue";
import SideMenu from "@/components/SideMenu.vue";
import { localStorage } from "@/utils";
import { spotify } from "@/services";
import { CurrentlyPlaying } from "@/types/CurrentlyPlaying";
import { Track } from "@/types/common/Track";
import { AUTHENTICATION_KEY } from "@/constants";
import { RecentlyPlayedTracksResponse } from "@/types/RecentlyPlayedTracksResponse";

@Component({
  components: {
    SideMenu,
    TrackNavigation,
    TrackCollection,
  },
})
export default class Main extends Vue {
  private readonly DETECT_PLAYING_SONG_MILISECONDS: number = 3000;

  private recentlyPlayedTracksLatestResponse: RecentlyPlayedTracksResponse[] =
    [];
  private recentlyPlayedTracks: Track[] = [];
  private currentlyPlayingTrack: CurrentlyPlaying | null = null;
  private filter = "";
  private interval: number = 0;

  async created() {
    this.recentlyPlayedTracksLatestResponse.push(
      await spotify.getRecentlyPlayedTracks()
    );
    this.recentlyPlayedTracks =
      this.recentlyPlayedTracksLatestResponse[0].items.map(
        (item) => item.track
      );

    this.interval = window.setInterval(async () => {
      const response = await spotify.getCurrentlyPlaying();

      if (response && response.is_playing) {
        if (this.currentlyPlayingTrack !== response) {
          this.currentlyPlayingTrack = response;
        }
      } else {
        this.currentlyPlayingTrack = null;
      }
    }, this.DETECT_PLAYING_SONG_MILISECONDS);
  }

  destroyed() {
    window.clearInterval(this.interval);
  }

  // TODO come from Vuex or sesion cookie
  get accessToken(): string {
    return localStorage.get(AUTHENTICATION_KEY) || "";
  }

  get filteredRecentlyTracks() {
    const rencentlyPlayedTracks: Track[] = [...this.recentlyPlayedTracks];

    if (this.currentlyPlayingTrack) {
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
      this.filteredRecentlyTracks
        ?.flatMap((track) => track.artists)
        .map((artist) => artist.name)
        .sort()
    );
  }

  @Watch("$route.query.artist", { deep: true, immediate: true })
  onQueryChange(newValue: string) {
    this.filter = newValue;
  }

  @Watch("currentlyPlayingTrack")
  onCurrentlyPlayingTrack(
    newValue: CurrentlyPlaying,
    oldValue: CurrentlyPlaying
  ) {
    if (
      newValue === null &&
      oldValue.item.artists.map((artist) => artist.name).includes(this.filter)
    ) {
      this.filter = "";
    }
  }

  onArtistClicked(artist: string) {
    const artistQueryParam =
      this.$router.currentRoute.query?.artist?.toString() === artist
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

  loadTracks(tracks: Track[]) {
    this.recentlyPlayedTracks = tracks;
  }

  async getTracks(nexResourceUri: string) {
    if (nexResourceUri) {
      const nextTracks = await spotify.getRecentlyPlayedTracksPaged(nexResourceUri);
      this.recentlyPlayedTracksLatestResponse.push(nextTracks);
      this.recentlyPlayedTracks = nextTracks.items.map((item) => item.track);
    }
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
      width: 100%;
    }
  }
}
</style>
