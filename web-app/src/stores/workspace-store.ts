import {defineStore} from 'pinia';
import {Workspace} from 'app/src-electron/workspace';

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspaces: [] as Array<Workspace>,
  }),
  getters: {},
  actions: {
    addWorkSpace(workspace_name: string) {
      // eslint-disable-next-line
      // @ts-ignore
      window.electron.send('workspace', JSON.stringify({
        cmd: 'ADD_WORKSPACE',
        data: {
          name: workspace_name
        }
      }));
    },
    loadWorkspaces() {
      // eslint-disable-next-line
      // @ts-ignore
      window.electron.send('workspace', JSON.stringify({
        cmd: 'LOAD_WORKSPACES'
      }));
    },
  },
});
