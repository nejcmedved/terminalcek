<template>
  <q-page class="row">
    <div class="col-2">
      <q-select square filled v-model="selectedWorkspace" :options="mainStore.workspaces" label="Workspace" />
    </div>
    <div class="col-10">
      <TerminalComponent></TerminalComponent>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue';
import {useMainStore} from 'stores/main-store';
import TerminalComponent from 'components/TerminalComponent.vue';

const mainStore = useMainStore()
const selectedWorkspace = ref('')

defineOptions({
  name: 'IndexPage'
});

onMounted(() => {
  mainStore.loadStore()
})

</script>
