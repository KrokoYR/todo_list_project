<template>
  <nav class="navbar">
    <router-link :to="'/'" class="navbar-link">Todo</router-link>
    <router-link :to="'/todolists/new/'" class="navbar-link">Create new...</router-link>
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

  .navbar-link {
    display: block;
    padding: 8px;
    padding-left: 20px;
    text-align: left;
    font-size: 50px;
    text-decoration: none;
    color:aliceblue;
  }

  .navbar-link:hover {
    background-color: darkblue;
  }
</style>