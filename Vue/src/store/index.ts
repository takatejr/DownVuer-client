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
      url: '',
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
      const youtubeURL = url
      axios
        .post("http://localhost:3000/api/info", {
          url: url
        })
        .then((res: AxiosResponse) => {

          const formats = res.data.formats.map((e: any) => {
            return {
              format: e.format_id,
              type: e.format.split(' ')[2] + e.format.split(' ')[3],
              filesize: `${(Number(e.filesize) / 1000000).toFixed(1)}Mb`,
              text: e.format.split(' ')[2] === "audio" ? "mp3" : "mp4",
            }
          })
          console.log(url)
          state.youtubeMedia.push({ url: url, path: path, details: res.data, formats: formats })
        })
        .catch((error: unknown) => {
          console.error("There was an error!", error);
        });
    },

    downloadMedia({ state }, info) {
      const { format, type, url, index } = info
      
      axios
        .post('http://localhost:3000/api/partial', { url: url, format: format, type: type })
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
