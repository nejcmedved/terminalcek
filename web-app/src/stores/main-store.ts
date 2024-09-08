import {defineStore} from 'pinia';
import {Workspace} from 'app/src-electron/workspace';

export const useMainStore = defineStore('main', {
  state: () => ({
    workspaces: [] as Array<Workspace>,
  }),
  getters: {},
  actions: {
    loadStore() {
      // eslint-disable-next-line
      // @ts-ignore
      window.electron.send('load-main-data-req', '');
      // eslint-disable-next-line
      // @ts-ignore
      window.electron.receive('load-main-data-resp', (data) => {
        this.$state = data
      });
    },
  },
});
