<template>
  <div class="submenu">
    <div class="submenu__wrapper">
      <button class="btn btn__delete" @click="$emit('on-modal-delete')" v-if="!createNew">Delete <span class="fa fa-trash"></span></button>
      <button class="btn" @click="$emit('on-undo')"><span class="fa fa-undo"></span></button>
      <button class="btn" @click="$emit('on-redo')"><span class="fa fa-repeat"></span></button>
      <button class="btn btn__discard" @click="$emit('on-discard')">{{ cancelNewText }}<span class="fa fa-ban"></span></button>

      <button
      class="btn btn__confirm" 
      @click="$emit('on-sendforms')"
      :disabled="!canSendForms">{{ createNewText }} <span :class="createNewIcon"></span></button>
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    createNew: {
      type: Boolean,
      required: true
    },
    canSendForms: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    // Below computed values return strings. Attention to keep 'white-space'(' '):
    createNewText() {
      return this.createNew ? 'Done ' : 'Save ';
    },
    createNewIcon() {
      return this.createNew ? 'fa fa-plus-circle' : 'fa fa-floppy-o';
    },
    cancelNewText() {
      return this.createNew ? 'Cancel ' : 'Discard ';
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

  .btn:disabled {
    opacity: 0.5;
  }

  .btn:disabled:hover {
    color: #000000;    
    background: transparent;
    border-left: 1px solid rgba($color: #000000, $alpha: 0.25);
    border-radius: 0;
    margin-left: 0;
  }

  .btn:last-child:disabled:hover {
    border-right: 1px solid rgba($color: #000000, $alpha: 0.25);
  }

  .btn__delete {
    color: crimson;
  }
  
  .btn__delete:hover {
    color: white;
    background: crimson;
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

  .btn__confirm:disabled {
    position: relative;
  }

  .btn__confirm:disabled:hover {
    color: royalblue;
    margin-right: 0;
  }

  .btn__confirm:disabled:hover::after {
    position: absolute;
    content: 'Title or todos are empty!';
    left: 100%;
    top: -40%;
    color: #000000;
    background-color: blanchedalmond;
    width: 100px;
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