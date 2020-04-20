import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    list: {
      _id: 'Default',
      title: 'Default title',
      todos: []
    }
  },
  getters: {

  },
  mutations: {
    SET_LIST(state, payload) {
      state.list = payload;
    },
    UPDATE_TITLE(state, payload) {
      state.title = payload;
    },
    // Updating description by payload={index:Number, description:String}
    UPDATE_TODO_DESCRIPTION(state, payload) {
      state.todos[payload.index].desciption = payload.desciption;
    },
    // Updating description by payload={index:Number, complete:Boolean}
    UPDATE_TODO_COMPLETION(state, payload) {
      state.todos[payload.index].complete = payload.complete;
    }
  },
  actions: {
    SET_LIST: async(context, payload) => {
      context.commit('SET_LIST', payload);
    },
    UPDATE_TITLE(context, payload) {
      context.commit('UPDATE_TITLE', payload);
    },
    UPDATE_TODO_DESCRIPTION(context, payload) {
      context.commit('UPDATE_TODO_DESCRIPTION', payload);
    },
    UPDATE_TODO_COMPLETION(context, payload) {
      context.commit('UPDATE_TODO_COMPLETION', payload);
    }
  }
})