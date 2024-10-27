import {defineStore} from 'pinia';
import {Workspace} from 'app/src-electron/workspace';

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    table: 'workspace',
    workspaces: [] as Array<Workspace>,
  }),
  getters: {},
  actions: {
    addWorkSpace(workspace_name: string) {
      // eslint-disable-next-line
      // @ts-ignore
      window.electron.send('workspace', JSON.stringify({
        cmd: 'DB_ADD',
        table: this.table,
        values: {
          name: workspace_name
        }
      }));
      this.loadWorkspaces()
    },
    loadWorkspaces() {
      // eslint-disable-next-line
      // @ts-ignore
      window.electron.send('workspace', JSON.stringify({
        cmd: 'LOAD_WORKSPACES'
      }));
      // eslint-disable-next-line
      // @ts-ignore
      window.electron.receive('workspace', (data) => {
        console.log('recv ', data)
        this.workspaces = data
      });
    },
  },
});
