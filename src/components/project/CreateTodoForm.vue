<template>
  <form class="todo__form-new" @submit.prevent="addTodo()">
    <input
      v-model="newTodo"
      type="text"
      class="new__todo"
      placeholder="Create a new to-do..."
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      newTodo: ""
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.length > 0) {
        this.$emit("on-new-todo", this.newTodo);
      }
      this.newTodo = "";
    }
  }
};
</script>

<style scoped>
  .todo__form-new {
    display: flex;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 100%;
    max-width: 100%;
  }

  .new__todo {
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem 0.75rem;
    padding-left: 2rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,
                box-shadow .15s ease-in-out;
  }

  @media (min-width: 576px) {
    .todo__form-new {
      flex: 0 0 83.333%;
      max-width: 83.333%;
    }
  }

  @media (min-width: 992px) {
    .todo__form-new {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
</style>
