<template>
  <div class="track">
    <card>
      <slot name="header">
        <img class="avatar" :src="albumCover" />
      </slot>
      <slot>
        {{ track.name }}
      </slot>
    </card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Track } from "@/types/RecentlyPlayedTracksResponse";
import Card from "@/components/Card.vue";

@Component({
  components: {
    Card,
  },
})
export default class TrackItem extends Vue {
  @Prop({ required: true }) private track!: Track;

  get albumCover() {
    return this.track.album.images[0].url;
  }
}
</script>

<style scoped lang="scss">
.track {
  margin: 10px;
  width: 49%;

  .avatar {
    width: 100%;
    border-radius: 5px 5px 0 0;
  }
}
</style>
