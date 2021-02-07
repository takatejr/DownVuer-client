<template>
  <Form></Form>
  <div class="playlist">
    <PlaylistItem></PlaylistItem>
  </div>
  <audio controls="true" preload="auto" download="hseuhseu.mp3">
    <!-- <source src="../assets/ue.mp3" type="audio/mpeg" download="hseuhseu.mp3"> -->
  </audio>
</template>

<script lang="ts">
import Form from "@/components/Form.vue";
import PlaylistItem from "../components/PlaylistItem.vue";

export default {
  components: { Form, PlaylistItem },
  name: "Youtube",
};
</script>

<style lang="scss">
.playlist {
  height: 100%;
  border-top: 2px solid rgba(220, 220, 200, 0.4);
}
</style>
