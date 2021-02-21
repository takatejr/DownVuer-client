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
      formats: [],
      downloadButton: []
    }],
  },
  mutations: {
  }, //commit
  actions: {
    isDisabled({ state }, boolean) {
      state.isDisabled = boolean
    },

    setInfo({ state }, url) {
      axios
        .post("http://localhost:3000/api/info", {
          url: url
        })
        .then((res: AxiosResponse) => {
          const formats = res.data.formats.map((e: any) => {
            return {
              format: e.format_id,
              type: e.format.split(' ')[2] + e.format.split(' ')[3],
              filesize: `${(Number.parseInt(e.filesize, 10) / 1000000).toFixed(1)}Mb`,
              text: e.format.split(' ')[2] === "audio" ? "mp3" : "mp4",
            }
          })

          state.youtubeMedia.push({ url: url, path: '', details: res.data, formats: formats, downloadButton: [] })
        })
        .catch((error: unknown) => {
          console.error("There was an error!", error);
        });
    },

    downloadMedia({ state }, info) {
      const { format, url, index } = info
      
      axios
        .post('http://localhost:3000/api/partial', { url: url, format: format})
        .then((res: AxiosResponse) => {
          const { filesize, link, ext } = res.data
          const size = `${(Number.parseInt(filesize, 10) / 1000000).toFixed(1)}Mb`
          
          state.youtubeMedia[index].downloadButton.push({ filesize: size, link: link, ext: ext })
        })
        .catch((error: unknown) => {
          console.error("There was an error!", error);
        });
    }

  }, //dispatch
  modules: {}
});
