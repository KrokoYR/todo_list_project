<template>
  <div class="list-group">
    <div 
    class="list"
    v-for="list of todoLists"
    :key="list.id"
    >
      <div class="list__wrapper">
        <button class="item__edit" @click="linkTo(list.id)">
          <span class="fa fa-edit"></span>
        </button>
        <h4 class="list__title">{{ list.title }}</h4>
        <ul class="list__items">
          <li 
          class="list__item"
          v-for="(todo, index) of list.todos" 
          :key="index"
          >
            <span v-if="todo.completed">&#10004;</span>
            <span v-else>&#10008;</span>
            <span class="item__text" :class="{ completed: todo.completed }">{{ todo.description }}</span>
          </li>
        </ul>
        <p class="item__footer"><small class="footer__text">Last updated 3 mins ago</small></p>  
      </div>      
      <confirmation v-if="showModal" @close="showModal=false" @submit="deleteList(list)" />
      <button class="item__delete" @click="openModal">
        <span class="fa fa-trash"></span>
      </button>
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
      this.$router.push({name: 'TodosView', params: {id}});
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
  async created() {
    
  }
}
</script>

<style scoped>
  *, ::after, ::before {
    box-sizing: border-box;
  }

  .list-group {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    margin-right: 1rem;
    margin-left: 1rem;
  }

  .list {
    position: relative;
    margin-bottom: 15px;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    max-width: 300px;

    transition: padding 0.5s;
  }

  .list:hover {
    box-shadow: 0 0 5px 2px royalblue;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .list__wrapper {
    padding: 1.25rem;
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
    text-align: center;
    margin-bottom: 0.35rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  
  .item__text {
    word-wrap: none;
    text-overflow: ellipsis;
  }

  .item__footer {
    text-align: center;
  }

  .footer__text {    
    word-wrap: none;
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