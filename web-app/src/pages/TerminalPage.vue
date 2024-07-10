<template>
  <q-page class="">
    <div id="terminal" style="height: 100%"></div>
  </q-page>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import * as xterm from 'xterm';

defineOptions({
  name: 'TerminalPage'
});

const term = new xterm.Terminal();
// const line = ref('')

onMounted(() => {
  console.log('mounting terminal')
  // eslint-disable-next-line
  // @ts-ignore
  window.electron.send('start-shell', '');

  // eslint-disable-next-line
  // @ts-ignore
  window.electron.receive('stdout', (data) => {
    term.write(data)
    console.log('Received from main:', data);
  });

  const element = document.getElementById('terminal')
  if (element) {
    term.open(element);
    term.onBinary((key) => {
      console.log('binary ', key)
    })
    // eslint-disable-next-line
    // @ts-ignore
    term.onData((data) => {
      console.log('data ', data)
      // eslint-disable-next-line
      // @ts-ignore
      window.electron.send('message-from-renderer', data);
    });
  }

})

</script>

<style src='/node_modules/xterm/css/xterm.css'>
/* global styles */
</style>
