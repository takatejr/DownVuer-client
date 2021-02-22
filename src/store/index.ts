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
    setInfo(state, payload) {
      state.youtubeMedia.push(payload)
    },

    downloadMedia(state, payload) {
      const { index, ...rest } = payload
      state.youtubeMedia[index].downloadButton.push(rest)
      console.log(state.youtubeMedia[index].downloadButton)
    },

    deleteMedia(state, index) {
      state.youtubeMedia.splice(index, 1)
    }
  }, //commit
  actions: {
    isDisabled({ state }, boolean) {
      state.isDisabled = boolean
    },

    setInfo({ commit }, url) {
      axios
        .post("http://localhost:3000/api/file/info", {
          url: url
        })
        .then((res: AxiosResponse) => {
          const isPlaylist = res.data.formats !== true ? true : false;

          if (isPlaylist) {
            res.data.map((data) => {
              const formats = data.formats.map(e => {
                return {
                  format: e.format_id,
                  type: e.format.split(' ')[2] + e.format.split(' ')[3],
                  filesize: `${(Number.parseInt(e.filesize, 10) / 1000000).toFixed(1)}Mb`,
                  text: e.format.split(' ')[2] === "audio" ? "mp3" : "mp4",
                }
              })

              const urlOfPlaylistItem = data.url
              commit('setInfo', { url: urlOfPlaylistItem, path: '', details: data, formats: formats, downloadButton: [] })
            })
          } else {
            const formats = res.data.formats.map((e: any) => {
              return {
                format: e.format_id,
                type: e.format.split(' ')[2] + e.format.split(' ')[3],
                filesize: `${(Number.parseInt(e.filesize, 10) / 1000000).toFixed(1)}Mb`,
                text: e.format.split(' ')[2] === "audio" ? "mp3" : "mp4",
              }
            })

            commit('setInfo', { url: url, path: '', details: res.data, formats: formats, downloadButton: [] })
          }
        })
        .catch((error: unknown) => {
          console.error("There was an error!", error);
        });
    },

    downloadMedia({ commit }, info) {
      const { format, url, index } = info

      axios
        .post('http://localhost:3000/api/partial', { url: url, format: format })
        .then((res: AxiosResponse) => {
          const { filesize, link, ext } = res.data
          const size = `${(Number.parseInt(filesize, 10) / 1000000).toFixed(1)}Mb`

          commit('downloadMedia', { filesize: size, link: `http://localhost:3000/api/file/${link}`, ext: ext, index: index })
        })
        .catch((error: unknown) => {
          console.error("There was an error!", error);
        });
    },

    deleteMedia({ commit }, payload) {
      const { link, index } = payload;
      return axios
        .delete(link, {
          data: { link: link },
        })
        .then((res) => {
          commit('deleteMedia', index)
        });

    }

  }, //dispatch
  modules: {}
});
