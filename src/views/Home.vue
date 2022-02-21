<template>
  <div class="home">
    <button class="btn" @click="onClick">Login to Spotify</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { implicitGrant } from "@/services/spotify/implicitGrant";

@Component
export default class Home extends Vue {
  onClick() {
    implicitGrant();
  }
}
</script>
