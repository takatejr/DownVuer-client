import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0,
    isDisabled: false,
    currentInfo: {},
    youtubeMedia: [{
      binary: '',
      details: {},
    }],
  },
  mutations: {
  }, //commit
  actions: {
    setInfo({ state }, data) {
      state.currentInfo = data
    },

    isDisabled({ state }, boolean) {
      state.isDisabled = boolean
    },

    downloadedMedia({ state }, binary) {
      const details = state.currentInfo
      state.youtubeMedia.push({ details, binary })
    }

  }, //dispatch
  modules: {}
});
