import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0,
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
    setInfo({ state }, data) {
      state.currentInfo = data
      state.currentFormats = data.formats.map((e: any) => {
        return {
          format: e.format,
          type: e.format.split(' ')[2] + e.format.split(' ')[3],
          filesize: `${(Number(e.filesize) / 1000000).toFixed(1)}Mb`,
          text: e.format.split(' ')[2] === "audio" ? "mp3" : "mp4",
        }
      })
      console.log(state.currentInfo)
      console.log(state.currentFormats)
    },

    isDisabled({ state }, boolean) {
      state.isDisabled = boolean
    },

    downloadedMedia({ state }, path) {
      const details = state.currentInfo;
      const formats = state.currentFormats;

      state.youtubeMedia.push({ details, path, formats })
    }

  }, //dispatch
  modules: {}
});
