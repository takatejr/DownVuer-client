<template>
  <div v-for="(item, index) in items" :key="index" class="download">
    <p class="title" v-if="item.binary !== ''">
      {{ item.details.title }}
    </p>
    <div class="media" v-if="item.binary !== ''">
      <img class="img" :src="item.details.thumbnail" alt="thumbnail" />
      <p class="desc">{{ item.details.description }}</p>
    </div>
    <div class="buttons" v-if="item.binary !== ''">
      <a
        class="button is-danger btn"
        :href="`${item.binary}`"
        :download="`${item.details.title}` + '.mp3'"
      >
        Download
      </a>
      <a class="button is-small is-1 is-offset-1 btn" @click="deleteItem(index)"
        >Delete</a
      >
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  name: "PlaylistItem",
  data() {
    return {
      items: store.state.youtubeMedia,
    };
  },
  methods: {
    deleteItem(index) {
      return store.state.youtubeMedia.splice(index, 1);
    },
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
