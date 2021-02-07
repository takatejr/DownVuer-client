<template>
  <form>
    <div class="field">
      <div class="form">
        <label for="url" class="label">Put Youtube url</label>
        <input
          class="input column is-info"
          type="text"
          id="url"
          v-model="formValues.url"
          aria-label="url"
          placeholder="Put Youtube URL here"
        />
      </div>
    </div>
  </form>
  <div class="submit">
    <button
      @click="download(formValues.url)"
      class="submit__item button is-2 is-offset-5"
      v-bind:disabled="formValues.url === ''"
    >
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import store from "../store/index";

export default {
  name: "Form",
  data() {
    return {
      formValues: {
        url: "",
        selectedFormat: "",
        isDisabled: false,
      }
    };
  },
  methods: {
    download(youtubeURL: string) {
      console.log(youtubeURL);
      if (!youtubeURL) {
        window.alert("URL is empty");
        return;
      }
      axios
        .post("http://localhost:3000/api/info", {
          url: youtubeURL,
        })
        .then((res: AxiosResponse) => {
          console.log(res.data);
          store.dispatch("setInfo", res.data);
          // store.dispatch("downloadedMedia", "hehe");
          // console.log(store.state.youtubeMedia)
          // console.log(store.state.currentInfo);
        })
        .catch((error: unknown) => {
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style lang="scss">
.disp {
  display: none;
}

.field {
  background: linear-gradient(
    90deg,
    rgba(221, 154, 163, 0.35) 0%,
    rgba(188, 114, 236, 0.2) 1%,
    rgba(255, 224, 156, 0.5) 30%,
    rgba(212, 155, 155, 0.25) 100%
  );
  padding: 5% 0 0 0;
}

.form {
  display: grid;
  grid-template-columns: 1.3fr 2fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 3%;
}

.label {
  margin: 1% auto;
}

.select {
  width: 40vw;
  margin: 1% auto;
}

.input {
  width: 40vw;
  margin: 1% auto;
}

.submit {
  margin: auto;
  background: linear-gradient(
    90deg,
    rgba(221, 154, 163, 0.35) 0%,
    rgba(188, 114, 236, 0.2) 1%,
    rgba(255, 224, 156, 0.5) 30%,
    rgba(212, 155, 155, 0.25) 100%
  );
}

.submit__item {
  width: 20%;
  margin: 1% 40%;
}
</style>
