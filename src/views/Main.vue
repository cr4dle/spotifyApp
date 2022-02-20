<template>
  <div class="main">
    <div class="main__container">
      <div class="side-menu">
        <div
          class="recently-played-artist"
          v-for="(item, index) in recentlyPlayedArtists"
          :key="index"
          @click="onArtistClicked(item)"
        >
          {{ item.name }}
        </div>  
      </div>
      <div
        class="content"
        v-for="(item, index) in filteredRecentlyTracks"
        :key="index"
      >
        <track-item :track="item.track" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO this should have subroute for the menu and main screen
// TODO is should call a TrackCollection component
import { Component, Vue, Watch } from "vue-property-decorator";
import { Artist } from "@/types/common/Artist";
import TrackItem from "@/components/TrackItem.vue";
import { getHashParams } from "@/utils";
import { getRecentlyPlayedTracks } from "@/services/spotify";

@Component({
  components: {
    TrackItem,
  },
})
export default class Main extends Vue {
  // TODO use the proper type
  private recentlyPlayedTracks: any = [];
  private recentlyPlayedArtists: Artist[] = [];
  private filter: string = "";

  async created() {
    const response = await getRecentlyPlayedTracks(this.accessToken);
    this.recentlyPlayedTracks = response.items;

    this.recentlyPlayedArtists = this.recentlyPlayedTracks?.flatMap(
      (item) => item.track.artists
    );
  }

  get accessToken(): string {
    // TODO create return type
    var params = getHashParams();
    console.log(params);
    return params.access_token;
  }

  get filteredRecentlyTracks() {
    return this.recentlyPlayedTracks.filter((item) => this.filter && item.track.artists.map(artist => artist.name).includes(this.filter));
  }

  @Watch("$route.query.artist", { deep: true, immediate: true })
  onQueryChange(newValue: string) {
    this.filter = newValue;
  }

  onArtistClicked(item) {
    this.$router.push({
      name: "Main",
      hash: this.$router.currentRoute.hash,
      query: {
        ...this.$router.currentRoute.query,
        artist: item.name
      }
    })
  }
}
</script>

<style scoped lang="scss">
.main {
  &__container {
    display: flex;  // TODO use mixins for browser compatibility

    .side-menu {
      margin: 5px;

      .recently-played-artist {
        cursor: pointer;
        margin: 5px 0px;
        padding: 5px;
        background-color: lightblue;
      }
    }

    .content {

    }
  }
}
</style>