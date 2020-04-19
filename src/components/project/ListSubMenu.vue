<template>
  <div class="submenu">
    <div class="submenu__wrapper">
      <button class="btn btn__delete" @click="$emit('on-delete')" :disabled="!createNew">Delete <span class="fa fa-trash"></span></button>
      <button class="btn" @click="$emit('on-undo')"><span class="fa fa-undo"></span></button>
      <button class="btn" @click="$emit('on-redo')"><span class="fa fa-repeat"></span></button>
      <button class="btn btn__discard" @click="$emit('on-discard')">Discard <span class="fa fa-ban"></span></button>
      <button v-if="createNew" class="btn btn__confirm" @click="$emit('on-sendforms')">Done <span class="fa fa-plus-circle"></span></button>
      <button v-else class="btn btn__confirm" @click="$emit('on-sendforms')">Save <span class="fa fa-floppy-o"></span></button>
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    createNew: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .submenu {
    margin-top: 1rem;
    flex: 0 0 100%;
    width: 100%;
    max-width: 100%;
    margin-right: -15px;
    margin-left: -15px;
  }

  .submenu__wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .btn {
    cursor: pointer;
    border: 0;
    border-left: 1px solid rgba($color: #000000, $alpha: 0.25);
    background: transparent;

    font-size: 1rem;
    line-height: 1.5;
    transition: background-color 0.3s;
  }

  .btn:last-child {
    border-right: 1px solid rgba($color: #000000, $alpha: 0.25);
  }

  .btn:hover {
    border: none;
    border-radius: 0.25rem;
    margin-left: 1px;
    color: white;
    background: black;
  }

  .btn__delete {
    color: crimson;
  }
  
  .btn__delete:hover {
    color: white;
    background: crimson;
  }

  .btn__delete:disabled {
    opacity: 0.5;
  }

  .btn__delete:disabled:hover {
    color: crimson;
    background: transparent;
    border-left: 1px solid rgba($color: #000000, $alpha: 0.25);
  }
  
  .btn__discard {
    color: crimson;
  }

  .btn__discard:hover {
    color: white;
    background: crimson;
  }

  .btn__confirm {
    color: royalblue;
  }

  .btn__confirm:hover {
    color: white;
    background: royalblue;
    margin-right: 1px;
  }

  @media (min-width: 576px) {
    .submenu {
      flex: 0 0 83.333%;
      max-width: 83.333%;
    }
  }

  @media (min-width: 992px) {
    .submenu {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
</style>