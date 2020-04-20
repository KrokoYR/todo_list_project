<template>
  <div class="todo__container">    
    <confirmation v-if="showModal" @close="showModal=false" @submit="deleteList()">
      <template v-slot:header>
        Delete list
      </template>
      <template v-slot:body>
        Are you sure you want to delete this todo-list?
      </template>
    </confirmation>
    <list-sub-menu
    :createNew="formsOptions.newList"
    :canSendForms="canSendForms"
    @on-undo="doUndo()"
    @on-redo="doRedo()"
    @on-discard="discard()"
    @on-sendforms="sendforms()"
    @on-modal-delete="openModal()"
    />
    <div class="title__row">
      <input type="text" class="title__input" maxlength="25" v-model.lazy="list.title">
    </div>
    <div class="list-wrapper">
      <ul class="list-group">
        <todo
          v-for="(todo, index) in list.todos"
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
import confirmation from '../components/modal/confirmation.vue'
import ListSubMenu from '../components/project/ListSubMenu.vue'
import Todo from "../components/project/TodoItem";
import CreateTodo from "../components/project/CreateTodoForm";

export default {
  data() {
    return {
      list: {
        _id: this.$route.params['id'],
        title: "Default title",
        todos: []
      },
      formsOptions: {
        newList: true
      },
      loadedFromLocalStorate: false,
      showModal: false
    };
  },
  methods: {
    async deleteList() {
      this.showModal = false;
      // Using async to wait till response from pouchDB, and after that pushing "Home" route:
      await this.$pouchStorage.deleteList(this.$pouch, this.list._id);
      this.$router.push('/')
    },
    openModal() {
      this.showModal = true;
    },
    //Adding new todo:
    addTodo(newTodoDescription) {
      if(newTodoDescription) {  
        const newTodo = { 
          description: newTodoDescription, 
          completed: false 
        }
        this.list.todos.push(newTodo);
        this.commitToLocalStorage()
      }
    },
    // Toggle todo's complete state:
    toggleTodo(index) {
      this.list.todos[index].completed = !this.todos[index].completed
    },
    // Deleting todo:
    deleteTodo(index) {
      this.list.todos.splice(index, 1);
      this.commitToLocalStorage()
    },
    // Editing todo's descrition:
    editTodo(index, newTodoDescription) {
      this.list.todos[index].description = newTodoDescription;
      this.commitToLocalStorage()
    },
    // Doing undo for todo:
    doUndo() {
      
    },
    // Doing redo for todo:
    doRedo() {

    },
    // Discard any changes and push "Home" to router
    discard() {
      localStorage.removeItem(this.getId);
      this.$router.push('/');
    },
    sendforms() {
      if (this.canSendForms) {
        this.$pouchStorage.addList(this.$pouch, this.list);
        localStorage.removeItem(this.getId);
        this.$router.push('/');
      }
    },
    commitToLocalStorage() {
      const parsedList = JSON.stringify(this.list);
      localStorage.setItem(this.getId, parsedList);
    }
  },
  components: { 
    confirmation,
    ListSubMenu,
    Todo, 
    CreateTodo
  },
  computed: {
    // function will return ID to set it for LocalStorage:
    getId() {
      return this.formsOptions.newList ? 'Default': this.list._id;
    },
    canSendForms() {
      return Boolean(this.list.title.length && this.list.todos.length);
    }
  },
  mounted() {
    document.addEventListener("keydown", this.doUndo);

    if (localStorage.getItem(this.getId)) {
      this.loadedFromLocalStorate = true;
      try {
        this.list = JSON.parse(localStorage.getItem(this.getId));
      } catch(e) {
        localStorage.removeItem(this.getId);
      }
    }
  },
  created() {
    if (this.$route.name === 'CreateList') {
      // If there is no ID => set item to LocalStorage by 'Default' 
      // and remove it if component is destroyed:
      const parsedList = JSON.stringify(this.list);
      localStorage.setItem(this.getId, parsedList);
    } else {
      this.$pouchStorage.getDBItem(this.$pouch, 'lists', this.$route.params.id).then((list) => {
      if (list) {
        this.formsOptions.newList = false
        // If no data at LocalStorage => load data from pouchDB:
        if (!this.loadedFromLocalStorate) {
          this.list = list;
          const parsedList = JSON.stringify(this.list);
          localStorage.setItem(this.getId, parsedList);
        } else {
          // resetting _rev - this will let pouchDB call put() function without conflict: 
          this.list._rev = list._rev;
        }
      }
    })
    }    
  },
  beforeDestroy() {
    if(this.formsOptions.newList) {
      localStorage.removeItem(this.getId);
    }
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
  }

  .title__input {
    margin-bottom: 1rem;
    margin-right: -15px;
    margin-left: -15px;

    border: none;
    border-bottom: 1px solid rgba(0,0,0,.125);

    max-width: 100%;
    width: 100%;
    flex: 0 0 100%;
    text-align: center;
    font-size: 2rem;
    line-height: 1.5;
    font-weight: 400;
    transition: 0.15s
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

    .title__input {
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

    .title__input {
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
