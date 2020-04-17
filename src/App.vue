<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/site/navbar.vue'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>
