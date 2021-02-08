import axios, { AxiosResponse } from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    isDisabled: false,
    currentInfo: {},
    currentFormats: [{
      format: '',
      filesize: '',
    }],
    youtubeMedia: [{
      path: '',
      details: {},
      formats: []
    }],
  },
  mutations: {
  }, //commit
  actions: {
    isDisabled({ state }, boolean) {
      state.isDisabled = boolean
    },

    setInfo({ state }, url) {
      const path = "emptyForNow";

      axios
        .post("http://localhost:3000/api/info", {
          url: url
        })
        .then((res: AxiosResponse) => {
          const formats = res.data.formats.map((e: any) => {
            return {
              format: e.format,
              type: e.format.split(' ')[2] + e.format.split(' ')[3],
              filesize: `${(Number(e.filesize) / 1000000).toFixed(1)}Mb`,
              text: e.format.split(' ')[2] === "audio" ? "mp3" : "mp4",
            }
          })

          state.youtubeMedia.push({ path: path, details: res.data, formats: formats })
        })
        .catch((error: unknown) => {
          console.error("There was an error!", error);
        });
    },

    downloadMedia({ state }, info) {
      const { format, index } = info
      axios
        .post('http://localhost:3000/api/path', { format: format })
        .then((res: AxiosResponse) => {
          state.youtubeMedia[index].path = res.data
        })
        .catch((error: unknown) => {
          console.error("There was an error!", error);
        });
    }

  }, //dispatch
  modules: {}
});
