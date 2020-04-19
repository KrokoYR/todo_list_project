<template>
  <li class="list-group__item">
    <button
      class="btn todo__item"
      :class="{ completed }"
      @click="$emit('on-toggle')"
      v-if="!isEditing"
    >
      <input type="checkbox" class="todo-complete__checkbox" v-model="completed">
      <span class="todo__description">{{ description }}</span>
    </button>
    <form v-else class="todo__edit" @submit.prevent>
      <input type="checkbox" class="todo-complete__checkbox" v-model="completed">
      <input
        type="text"
        class="edit-form"
        v-model="newTodoDescription"
        @blur="finishEditing()"
        @keydown.enter="$event.target.blur()"
        @keydown.esc="$event.target.blue()"
        ref="newTodo"
      />
    </form>
    <button
      @click="startEditing()"
      class="btn btn__edit"
    >
      <span class="fa fa-edit"></span>
    </button>
    <button @click="$emit('on-delete')" class="btn btn__trash">
      <span class="fa fa-trash"></span>
    </button>
  </li>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      newTodoDescription: ""
    };
  },
  props: {
    description: String,
    completed: Boolean
  },
  methods: {
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.newTodoDescription = this.description;
        this.isEditing = true;
        this.$nextTick(() => this.$refs.newTodo.focus());
      }
    },
    finishEditing() {
      this.isEditing = false;
      this.$emit("on-edit", this.newTodoDescription);
    }
  }
};
</script>

<style lang="scss" scoped>
  .list-group__item {
    position: relative;
    display: flex;
    align-items: center;

    padding: .75rem 1.25rem;
    padding-left: 0.5rem;
    border: 1px solid rgba(0,0,0,.125);
  }

  .list-group__item:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
  }

  .list-group__item:last-child {
    border-bottom-left-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  .btn {    
    display: inline-block;
    padding: .375rem .75rem;
    vertical-align: center;
    
    background-color: transparent;
    border: 0;
    border-radius: 0.25rem;

    text-align: center;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
    transition: color .15s ease-in-out,background-color .3s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .todo__item{
    text-align: left;
    box-shadow: none;
    flex-grow: 1;
  }

  .todo-complete__checkbox {
    cursor: pointer;
    appearance: none;
    vertical-align: middle;
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.2rem;
    vertical-align: top;
    border: 1px solid gray;
    border-radius: 4px;
    transition: background-color 125ms cubic-bezier(0.1, 0.1, 0.25, 1);
  }

  .todo-complete__checkbox:checked {
    color: royalblue;
    border-color: royalblue;
    background-color: royalblue;
  }

  .btn__edit{
    margin-left: 0.5rem;
    color:royalblue;
  }

  .btn__edit:hover {
    color: white;
    background: royalblue;
  }

  .btn__trash {
    color: crimson;
  }

  .btn__trash:hover{
    color: white;
    background: crimson;
  }

  .completed {
    transition: cubic-bezier(0.39, 0.575, 0.565, 1);
    text-decoration: line-through;
  }

  .todo__edit {
    display: flex;
    vertical-align: center;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    flex-grow: 1;
  }
  
  .edit-form {
    width: 100%;
    border: 0;
    border-radius: 0.5rem;
    
    font-size: 1rem;
    line-height: 1.35;
    font-weight: 400;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .todo__description {
    word-break: break-all;
  }
</style>
