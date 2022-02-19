<template>
  <div class="main">
    <div v-for="(item, index) in recentlyPlayedTracks" :key="index">
      <track-item :track="item.track" />
    </div>
  </div>
</template>

<script lang="ts">
// TODO this should have subroute for the menu and main screen
// TODO is should call a TrackCollection component
import { Component, Vue } from "vue-property-decorator";
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
  private recentlyPlayedTracks = null;

  async created() {
    const response = await getRecentlyPlayedTracks(this.accessToken);
    this.recentlyPlayedTracks = response.items;
  }

  get accessToken(): string {
    // TODO create return type
    var params = getHashParams();
    console.log(params);
    return params.access_token;
  }
}
</script>
