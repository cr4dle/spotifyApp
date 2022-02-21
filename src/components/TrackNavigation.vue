<template>
  <div>
    <button
      :class="['btn', { highlight: index === currentPageIndex }]"
      v-for="(r, index) in pagesLoaded"
      :key="index"
      @click="loadPage(index)"
    >
      Page {{ index + 1 }}
    </button>
    <button
      v-if="areThereMoreTracks"
      class="btn"
      @click="loadPage(pagesLoaded.length)"
    >
      Load next page
    </button>
  </div>
</template>

<script lang="ts">
import { SPOTIFY_RECENTLY_TRACKS_LIMIT } from "@/constants";
import { RecentlyPlayedTracksResponse } from "@/types/RecentlyPlayedTracksResponse";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TrackNavigation extends Vue {
  @Prop({ required: true })
  private pagesLoaded!: RecentlyPlayedTracksResponse[];

  private currentPageIndex: number = 0;

  // It seems there is one unncessary call in Spotify API
  // on "last call", next field is not null and the items.length is less than the limit
  get areThereMoreTracks(): boolean {
    return (
      this.pagesLoaded[this.pagesLoaded.length - 1] &&
      this.pagesLoaded[this.pagesLoaded.length - 1].items.length >=
        SPOTIFY_RECENTLY_TRACKS_LIMIT
    );
  }

  loadPage(pageIndex: number) {
    this.currentPageIndex = pageIndex;
    const existData = this.pagesLoaded[this.currentPageIndex];
    if (existData) {
      this.$emit(
        "loadTracks",
        existData.items.map((item) => item.track)
      );
    } else {
      this.$emit(
        "getTracks",
        this.pagesLoaded[this.pagesLoaded.length - 1].next
      );
    }
  }
}
</script>

<style scoped lang="scss">
.highlight {
  background-color: black;
}
</style>
