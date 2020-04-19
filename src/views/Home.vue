<template>
  <div class="list-group__wrapper">
    <div class="link__wrapper">
      <router-link :to="'/todolists/new/'" class="link__create">Create new...<span class="fa fa-pencil"></span></router-link>
    </div>
    <div class="list-group">
      <div 
      class="list"
      v-for="list of todoLists"
      :key="list.id"
      >
        <div class="list__wrapper">
          <button class="btn item__edit" @click="linkTo(list._id)">
            <span class="fa fa-edit"></span>
          </button>
          <h4 class="list__title">{{ list.title }}</h4>
          <ul class="list__items">
            <li 
            class="list__item"
            v-for="(todo, index) of list.todos" 
            :key="index"
            >
              <span class="item__check" v-if="todo.completed">&#10004;</span>
              <span class="item__check" v-else>&#10008;</span>
              <p class="item__text" :class="{ completed: todo.completed }">{{ todo.description }}</p>
            </li>
          </ul>
        </div>      
        <confirmation v-if="showModal" @close="showModal=false" @submit="deleteList(list)">
          <template v-slot:header>
            Delete list
          </template>
          <template v-slot:body>
            Are you sure you want to delete this todo-list?
          </template>
        </confirmation>
        <button class="btn item__delete" @click="openModal">
          <span class="fa fa-trash"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import confirmation from '../components/modal/confirmation.vue'

export default {
  data() {
    return {
      todoLists: [],
      resource: null,
      showModal: false
    }
  },
  methods: {
    linkTo(id) {
      this.$router.push({path:'/todolists/edit/' + id});
    },
    deleteList(deletedList) {
      this.showModal = false;
      this.todoLists = this.todoLists.filter(list => list !== deletedList)
    },
    openModal(){
      this.showModal = true;
    }
  },
  components: {
    confirmation
  },
  created() {
    this.$pouchStorage.fetchItemsDB(this.$pouch, 'lists', {
      saveID: true,
      query: {
        selector: {
          _id: { $gte: null },
        },
        sort: ['_id']
      }
    }).then((docs) => {
      this.todoLists = docs;
    }).catch((error) => {
      console.error(error);  
    })
  }
}
</script>

<style scoped>
  *, ::after, ::before {
    box-sizing: border-box;
  }

  .list-group__wrapper {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    margin-left: 1rem;
  }

  .link__wrapper {
    display: block;
  }

  .link__create {
    float: right;
    margin-top: 1.25rem;
    width: fit-content;
    padding: 0.75rem;

    background: transparent;
    color: royalblue;
    border: 1px solid royalblue;
    border-radius: 0.25rem;
    text-decoration: none;
    transition: 0.3s;
  }
  
  .link__create:hover {
    color: white;
    background: royalblue;
  }

  .fa-pencil {
    margin-left: 0.25rem;
  }

  .list-group {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
  }

  .list {
    position: relative;
    margin-bottom: 15px;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    width: 18rem;
    height: 250px;

    transition: width 0.5s;
  }

  .list:hover {
    box-shadow: 0 0 5px 2px royalblue;
    width: 20rem;
  }

  .list__wrapper {
    padding: 1.25rem;
  }

  .btn {
    transition: 0.3s;
  }

  .item__edit {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    font-size: 1.5rem;
    border-radius: 0.25rem;

    margin-right: -0.1rem;
    margin-top: -0.1rem;
    color: royalblue;
    background: transparent;
  }

  .item__edit:hover {
    cursor: pointer;
    color: white;
    background: royalblue;
  }

  .list__title {
    margin-bottom: 1.5rem;
    margin-top: 0;

    font-size: 1.5rem;
    line-height: 2;
    word-wrap: none;
    text-overflow: ellipsis;
    text-align: center;

    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }

  .list__items {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .list__item {
    width: 100%;
    text-align: center;
    margin-bottom: 0.35rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    flex-direction: row;
  }

  .item__check {
    color: crimson;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  
  .item__text {
    margin: 0;
    padding: 0;
    text-align: center;

    white-space: nowrap;
    overflow: hidden;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .item__delete {
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: -0.1rem;
    margin-bottom: -0.1rem;

    background-color: transparent;
    color: crimson;
    border: 0;
    border-radius: 0.25rem;

    font-size: 1.5rem;
  }

  .item__delete:hover {
    background-color: crimson;
    color: white;
  }

  @media (min-width: 576px) {
    .list-group{
      flex-flow: row wrap;
      justify-content: flex-start;
    }

    .list {
      display: flex;
      flex-direction: column;
      margin-right: 15px;
    }
  }
</style>