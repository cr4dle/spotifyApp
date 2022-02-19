<template>
  <div class="main">
    <div v-for="(item, index) in recentlyPlayedTracks" :key="index">
      <track-item :track="item.track" />
    </div>
  </div>
</template>

<script lang="ts">
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
  private recentlyPlayedTracks = null;

  async created() {
    const response = await getRecentlyPlayedTracks(this.accessToken);
    this.recentlyPlayedTracks = response.items;
  }

  get accessToken(): string {
    var params = getHashParams();
    console.log(params);
    return params.access_token;
  }
}
</script>
