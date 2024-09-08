<template>
  <q-page class="row">
    <div class="col-3">
      <div class="flex items-center justify-between">
        <div class="q-pa-sm" style="min-width: 70%">
          <q-select square v-model="selectedWorkspace" :options="mainStore.workspaces" label="Workspace"/>
        </div>
        <div class="q-pa-xs">
          <q-btn push color="primary" icon="add">
            <q-popup-proxy>
              <div class="flex items-center q-ma-xs">
                <div>
                  <q-input v-model="newWorkspaceName" label="New workspace name"></q-input>
                </div>
                <div>
                  <q-btn @click="addWorkspace">Apply</q-btn>
                </div>
              </div>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>

    </div>
    <div class="col-9">
      <TerminalComponent></TerminalComponent>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue';
import {useMainStore} from 'stores/main-store';
import TerminalComponent from 'components/TerminalComponent.vue';
import {useWorkspaceStore} from 'stores/workspace-store';

const mainStore = useMainStore()
const workspaces = useWorkspaceStore()
const selectedWorkspace = ref('')
const newWorkspaceName = ref('')

defineOptions({
  name: 'IndexPage'
});

onMounted(() => {
  mainStore.loadStore()
  workspaces.loadWorkspaces()
})

function addWorkspace() {
  return
}

</script>
