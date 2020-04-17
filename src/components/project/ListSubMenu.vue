<template>
  <div class="submenu">
    <div class="submenu__wrapper">
      <button class="btn" @click="$emit('on-undo')"><span class="fa fa-undo"></span></button>
      <button class="btn" @click="$emit('on-redo')"><span class="fa fa-repeat"></span></button>
      <button class="btn btn-cancel" @click="$emit('on-discard')">Discard</button>
      <button v-if="createNew" class="btn btn-confirm" @click="$emit('on-sendforms')">Create</button>
      <button v-else class="btn btn-confirm" @click="$emit('on-sendforms')">Save</button>
    </div>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      createNew: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .submenu {
    width: 100px;
  }

  .submenu__wrapper {
    width: 100px;
    display: flex;
    flex-direction: row;
  }

  .btn {
    border: 0;
  }
  
  .btn-cancel {
    width: 100%;
  }

  .btn-confirm {
    width: 100%;
  }
</style>