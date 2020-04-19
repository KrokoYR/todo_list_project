<template>
  <nav class="navbar">
    <router-link :to="'/'" class="navbar__link">Todo</router-link>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .navbar {
    background-color: royalblue;
    box-shadow: 0 0 10px darkblue;
  }

  .navbar__link {
    display: block;
    padding: 8px;
    padding-left: 20px;
    text-align: left;
    font-size: 50px;
    text-decoration: none;
    color:aliceblue;
  }

  .navbar__link:hover {
    background-color: darkblue;
  }
</style>