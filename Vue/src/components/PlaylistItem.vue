<template>
  <div>
    <div v-for="(item, index) in youtubeMedia" :key="index" class="download">
      <p class="title">
        {{ item.details.title }}
      </p>
      <div class="media">
        <img class="img" :src="item.details.thumbnail" alt="thumbnail" />
        <p class="desc">{{ item.details.description }}</p>
      </div>
      <div class="buttons" v-if="item.path !== ''">
        <audio controls="true" v-once>
          <source type="audio/mpeg" :src="`../Node/` + `${item.path}`" />
        </audio>
        <a
          class="button is-small is-1 is-offset-1 btn"
          @click="deleteItem(index)"
          >Delete</a
        >
      </div>
      <label for="format" class="is-2 label">Media format</label>
      <select
        name="format"
        id="format"
        class="select input"
        v-model="formValues.selectedFormat"
        :disabled="formValues.isDisabled"
      >
        <option disabled>Choose format</option>
        <option
          v-for="format in item.formats"
          :key="format.format"
          v-bind:value="format.format"
        >
          {{ format.text }} - {{ format.type }} -
          {{ format.filesize }}
        </option>
      </select>
      <button
        @click="downloadMedia(formValues.selectedFormat, index, item.url)"
        class="submit__item button is-2 is-offset-5"
        v-bind:disabled="formValues.selectedFormat === ''"
      >
        Submit
      </button>
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
        selectedFormat: "",
        isDisabled: false,
      },
    };
  },
  methods: {
    deleteItem(index) {
      // axios.post('http://localhost:3000/api/delete/:id')
      return store.state.youtubeMedia.splice(index, 1);
    },

    downloadMedia(format, index, url) {
      store.dispatch("downloadMedia", { format, index, url })
    },
  },
  setup() {
    store.state.youtubeMedia.pop();
  },
};
</script>

<style lang="scss">
.media {
  display: flex;
  margin: 1% auto;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(255, 0, 36, 0.35) 0%,
    rgba(207, 116, 197, 0.6) 5%,
    rgba(207, 116, 197, 0.8) 30%,
    rgba(255, 0, 0, 0.25) 100%
  );
  height: 30vh;
  width: 90%;
  border: 1px solid black;
}

.title {
  margin: 1%;
  display: block;
  font-size: 1.3rem;
  text-align: center;
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

.download {
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
