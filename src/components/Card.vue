<template>
  <div class="card">
    <slot name="header" />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Track } from "@/types/RecentlyPlayedTracksResponse";

@Component
export default class Card extends Vue {
  @Prop({ required: true }) private track!: Track;

  get albumCover() {
    return this.track.album.images[0].url;
  }
}
</script>

<style scoped lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 10px;
  }
}
</style>
