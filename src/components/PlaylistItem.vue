<template>
  <div v-for="(item, index) in youtubeMedia" :key="index" class="mediator">
    <span class="title">
      {{ item.details.title }}
    </span>
    <div class="info">
      <img class="img" :src="item.details.thumbnail" alt="thumbnail" />
      <p class="desc">{{ item.details.description }}</p>
    </div>
    <div class="format">
      <label for="format" class="is-12 label">Media format</label>
      <select
        name="format"
        id="format"
        class="select button"
        v-model="formValues.selectedFormat"
        :disabled="formValues.isDisabled"
      >
        <option hidden>Choose format</option>
        <option
          v-for="format in item.formats"
          :key="format.format"
          v-bind:value="format"
        >
          {{ format.text }} - {{ format.type }} -
          {{ format.filesize }}
        </option>
      </select>
      <button
        @click="downloadMedia(formValues.selectedFormat, index, item.url)"
        class="button is-2 is-offset-5 input"
        v-bind:disabled="formValues.selectedFormat === ''"
      >
        Submit
      </button>
    </div>
    <div
      class="download"
      v-for="{ link, ext, filesize } in item.downloadButton"
      :key="link"
    >
      <a :href="link" class="button">Download {{ ext }} {{ filesize }} </a>
      <a @click="deleteMedia(index, link)" class="button"
        >Delete {{ ext }} {{ filesize }}
      </a>
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  name: "PlaylistItem",
  data() {
    return {
      youtubeMedia: store.state.youtubeMedia,
      formValues: {
        selectedFormat: ""
      },
    };
  },
  methods: {
    deleteMedia(index, link) {
      store.dispatch("deleteMedia", { link: link, index: index });
    },

    downloadMedia(format, index, url) {
      store.dispatch("downloadMedia", { format, index, url });
    },
  },
  setup() {
    store.state.youtubeMedia.pop();
  },
};
</script>

<style lang="scss">
.info {
  display: flex;
  margin: 1% auto;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(238, 181, 188, 0.35) 0%,
    rgba(207, 116, 197, 0.2) 5%,
    rgba(207, 116, 197, 0.3) 30%,
    rgba(255, 0, 0, 0.25) 100%
  );
  height: 30vh;
  width: 75%;
  border: 1px solid black;
}

.title {
  margin: 1%;
  display: block;
  font-size: 1.3rem;
  text-align: center;
}

.format {
  display: flex;
  justify-items: center;
}

.select::after {
  margin: calc(0.5em + 3px);
  line-height: 1.5;
}

.desc {
  height: 27vh;
  width: 100%;
  margin: auto 1%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  white-space: pre-wrap;
  overflow-y: scroll;
}

.img {
  margin: auto 1%;
  height: 27vh;
  grid-area: img;
}

.btn {
  margin: 2% auto;
}

.mediator {
  padding: 0 0 5% 0;
}

@media (max-width: 600px) {
  .desc {
    display: none;
  }

  .img {
    margin: auto;
  }
}
</style>
