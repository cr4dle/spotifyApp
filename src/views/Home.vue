<template>
  <div class="home">
    <button class="btn" @click="onClick">Login to spotify</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { spotify } from "@/services";

@Component
export default class Home extends Vue {
  onClick() {
    spotify.implicitGrant();
  }
}
</script>
