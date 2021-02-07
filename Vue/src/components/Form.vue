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
        <label for="format" class="is-2 label">Media format</label>
        <select
          name="format"
          id="format"
          class="select input"
          v-model="formValues.selectedFormat"
        >
          <option disabled>Choose format</option>
          <option
            v-for="option in formatMP3"
            v-bind:value="option.value"
            :key="option.value"
          >
            {{ option.text }}
          </option>
          <option
            v-for="option in formatMP4"
            v-bind:value="option.value"
            :key="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
  </form>
  <div class="submit">
    <button
      @click="download(formValues.url, formValues.selectedFormat)"
      class="submit__item button is-2 is-offset-5"
      v-bind:disabled="
        formValues.selectedFormat === '' || formValues.url === ''
      "
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
      },
      formatMP3: [
        // { value: "249", text: "mp3 (48000Hz)" },
        // { value: "250", text: "mp3 (48000Hz)" },
        // { value: "171", text: "mp3 (48000Hz)" },
        // { value: "140", text: "mp3 (41000Hz)" },
        { value: "18", text: "mp3 (41000Hz)" },
        // { value: "251", text: "mp3 (48000Hz)" },
      ],
      formatMP4: [
        // { value: "160", text: "mp4 - 144p" },
        // { value: "133", text: "mp4 - 240p" },
        { value: "134", text: "mp4 - 360p" },
        { value: "135", text: "mp4 - 480p" },
        { value: "136", text: "mp4 - 720p" },
        // { value: "137", text: "mp4 - 1080p" },
        // { value: "271", text: "mp4 - 1440p" },
      ],
    };
  },
  methods: {
    download(youtubeURL: string, format: string) {
      console.log(youtubeURL, format);
      if (!youtubeURL) {
        window.alert("URL is empty");
        return;
      }
      console.log(youtubeURL.includes("playlist"));
      if (youtubeURL.includes("playlist")) {
        axios
          .post("http://localhost:3000/api/playlist", {
            url: youtubeURL,
          })
          .then((response: AxiosResponse) => {
            console.log(response);
          })
          .catch((error: unknown) => {
            console.error("There was an error!", error);
          });
      } else {
        axios
          .post("http://localhost:3000/api/info", {
            url: youtubeURL,
          })
          .then((res: AxiosResponse) => {
            console.log(res);
            store.dispatch("setInfo", res.data);
            if (res.data.filesize > 50000000) {
              store.dispatch("isDisabled", true);
            }
          })
          .then(() => {
            axios
              .post("http://localhost:3000/api/partial", {
                url: youtubeURL,
                format: format,
              })
              .then((response: AxiosResponse) => {
                const valuesMP3 = this.formatMP3.map((e) => e.value);
                const codec = valuesMP3.includes(format)
                  ? "audio/mpeg"
                  : "video/mp4";

                const mp3 = new Audio(
                  "data:audio/mpeg;base64," + response.data,
                );
                mp3.controls = true;
                document.body.appendChild(mp3);

                const a = document.createElement("a");
                document.body.appendChild(a);
                a.classList.add("disp");

                function convertDataURIToBinary(dataURI) {
                  const BASE64_MARKER = ";base64,";
                  const base64Index =
                    dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
                  const base64 = dataURI.substring(base64Index);
                  const raw = window.atob(base64);
                  const rawLength = raw.length;
                  const array = new Uint8Array(new ArrayBuffer(rawLength));

                  for (let i = 0; i < rawLength; i++) {
                    array[i] = raw.charCodeAt(i);
                  }
                  return array;
                }

                const binary = convertDataURIToBinary(
                  `data:${codec};base64` + `,${response.data}`,
                );
                const blob = new Blob([binary], { type: codec });
                const blobUrl = URL.createObjectURL(blob);

                // const url = window.URL.createObjectURL(blob);
                a.setAttribute("href", `${blobUrl}`);
                a.setAttribute("download", `dfxcvdf` + ".mp3");
                a.click();
                // window.URL.revokeObjectURL(url)
                // if (store.state.isDisabled === true) {
                //   const bufferArray = new Uint8Array(response.data)
                //   const blob = new Blob([bufferArray], {
                //     type: `data:${codec};base64,`,
                //   });

                //   store.dispatch("downloadedMedia", URL.createObjectURL(blob));
                // } else {
                //   store.dispatch(
                //     "downloadedMedia",
                //     `data:${codec};base64` + `,${response.data}`,
                //   );
                // }
              })
              .catch((error: unknown) => {
                console.error("There was an error!", error);
              });
          });
      }
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
