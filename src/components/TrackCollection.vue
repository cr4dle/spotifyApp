<template>
  <div class="track-collection">
    <span class="track-collection__brief">
      {{ tracks.length }} recently played songs
    </span>
    <div
      class="track-collection__content"
      v-for="(track, index) in tracks"
      :key="index"
    >
      <track-item :track="track" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Track } from "@/types/RecentlyPlayedTracksResponse";
import TrackItem from "@/components/TrackItem.vue";

@Component({
  components: {
    TrackItem,
  },
})
export default class TrackCollection extends Vue {
  @Prop({ required: true }) private tracks!: Track[];
}
</script>

<style scoped lang="scss">
.track-collection {
  margin: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;

  &__brief {
    width: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
