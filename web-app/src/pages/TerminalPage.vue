<template>
  <q-page class="row items-center justify-evenly">
    <div id="terminal"></div>
  </q-page>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import * as xterm from 'xterm';

defineOptions({
  name: 'TerminalPage'
});

onMounted(() => {
  console.log('mounting terminal')
  const term = new xterm.Terminal();
  const element = document.getElementById('terminal')
  if (element) {
    term.open(element);
    term.write('$')
  }

})

</script>

<style src='/node_modules/xterm/css/xterm.css'>
    /* global styles */
</style>
