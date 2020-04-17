<template>
  <div class="todo__container">
    <list-sub-menu 
    @on-undo="doUndo()"
    @on-redo="doRedo()"
    @on-discard="discard()"
    @on-sendforms="sendforms()"
    />
    <div class="title__row">
      <input type="text" class="title" v-model.lazy="title">
    </div>
    <div class="list-wrapper">
      <ul class="list-group">
        <todo
          v-for="(todo, index) in item.todos"
          :key="index"
          :description="todo.description"
          :completed="todo.completed"
          @on-toggle="toggleTodo(index)"
          @on-delete="deleteTodo(index)"
          @on-edit="editTodo(index, $event)"
        />
      </ul>
    </div>   
    <div class="todo__create-new">
      <create-todo @on-new-todo="addTodo($event)" />
    </div>
  </div>
</template>

<script>
import ListSubMenu from '../components/project/ListSubMenu.vue'
import Todo from "../components/project/TodoItem";
import CreateTodo from "../components/project/CreateTodoForm";

export default {
  data() {
    return {
      item: {
        id: this.$route.params['id'],
        title: "No title",
        todos: []
      },
      formsOptions: {
        canSendForms: false,
        newItem: true
      }
    };
  },
  methods: {
    addTodo(newTodoDescription) {
      if(newTodoDescription) {  
        const newTodo = { 
          description: newTodoDescription, 
          completed: false 
        }
        this.item.todos.push(newTodo);
        this.commitToLocalStorage()
      }
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.commitToLocalStorage()
    },
    editTodo(index, newTodoDescription) {
      this.todos[index].description = newTodoDescription;
      this.commitToLocalStorage()
    },
    doUndo() {
      
    },
    doRedo() {

    },
    discard() {

    },
    sendforms() {
      if (this.formsOptions.canSendForms) {
        this.$pouchStorage.addTask(this.$pouch, this.item)
        this.$router.push('/');  
      }
    },
    commitToLocalStorage() {
      const parsedItem = JSON.stringify(this.item);
      localStorage.setItem(parsedItem);
    }
  },
  components: { 
    ListSubMenu,
    Todo, 
    CreateTodo 
  },
  mounted() {
    document.addEventListener("keydown", this.doUndo);

    if (localStorage.getItem('item')) {
      try {
        this.item = JSON.parse(localStorage.getItem('item'));
      } catch(e) {
        localStorage.removeItem('item');
      }
    }
  },
  created() {
    this.$pouchStorage.getDBItem(this.$pouch, 'lists', this.$route.params.id).then((item) => {
      if (item) {
        this.formsOptions.canSendForms = true
        this.formsOptions.newItem = false
        this.item = item
      } else {
        this.formsOptions.canSendForms = true
      }
    })
  },
  beforeDestroy() {
    localStorage.removeItem('item');
    window.removeEventListener('keydown', this.doUndo);
    window.removeEventListener('keydown', this.doRedo);
  }
};
</script>

<style scoped lang="scss">
  div {
    display: block;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  .todo__container {    
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: auto;
    margin-right: auto;
  }

  .title-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  .title {
    position: relative;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    flex: 0 0 100%;
    max-width: 100%;
  }

  .list-wrapper{
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  .list-group {
    list-style-type: none;
    margin: 0;
    padding: 0;

    flex: 0 0 100%;
    max-width: 100%;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;

    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }

  .todo__create-new {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;

    margin-top: 1rem;
    margin-right: -15px;
    margin-left: -15px;
  }

  @media (min-width: 576px) {
    .todo__container{
      min-width: 540px;
    }

    .list-group {
      flex: 0 0 83.333%;
      max-width: 83.333%;
    }
  }
  @media (min-width: 768px) {
    .todo__container{
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    .todo__container{
      max-width: 960px;
    }

    .list-group {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
  @media (min-width: 1200px) {
      .todo__container{
      max-width: 1140px;
    }
  }
</style>
