<template>
  <div
    :class="['track', { 'play-sample': track.preview_url }]"
    @click="onClick"
  >
    <card>
      <slot name="header">
        <img class="avatar" :src="albumCover" />
      </slot>
      <slot>
        <span>{{ track.name }}</span>
        <template v-if="autoplay">
          <iframe
            :src="playerUrl"
            height="80px"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </template>
      </slot>
    </card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Card from "@/components/Card.vue";
import { Track } from "@/types/common/Track";

@Component({
  components: {
    Card,
  },
})
export default class TrackItem extends Vue {
  @Prop({ required: true }) private track!: Track;

  private autoplay: boolean = false;

  get albumCover() {
    // TODO there are different image size. There could be some logic based on screen resolution to get the best fit
    return this.track.album.images[0].url;
  }

  get playerUrl(): string {
    return `https://open.spotify.com/embed/track/${this.track.id}`;
  }

  onClick() {
    this.autoplay = !this.autoplay;
  }
}
</script>

<style scoped lang="scss">
.track {
  margin: 10px;
  flex-grow: 1;
  display: flex;
  pointer-events: none;
  width: 320px;

  &.play-sample {
    pointer-events: all;
    cursor: pointer;
  }

  .avatar {
    width: 100%;
    border-radius: 5px 5px 0 0;
  }
}
</style>
