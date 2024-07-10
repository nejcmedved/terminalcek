<template>
  <q-page class="fill-height">
    <q-page-container style="height: 100vh">
      <div id="terminal" style="height: 100vh"></div>
    </q-page-container>

  </q-page>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import * as xterm from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

defineOptions({
  name: 'TerminalPage'
});

const term = new xterm.Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

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
    fitAddon.fit();
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
