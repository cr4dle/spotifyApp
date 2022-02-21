<template>
  <div class="side-menu">
    <div
      class="recently-played-artist"
      v-for="(artist, index) in artists"
      :key="index"
      @click="onArtistClicked(artist)"
    >
      {{ artist }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Artist } from "@/types/common/Artist";

@Component
export default class SideMenu extends Vue {
  @Prop({ required: true }) private artists!: string[];

  onArtistClicked(artist: Artist) {
    this.$emit("onArtistClicked", artist);
  }
}
</script>

<style scoped lang="scss">
.side-menu {
  margin: 5px;
  min-width: 200px;

  .recently-played-artist {
    margin: 5px 0px;
    padding: 5px;
    background-color: indigo;
    transition: 0.4s ease;
    color: white;

    &:hover {
      background-color: black;
      cursor: pointer;
    }
  }
}
</style>
