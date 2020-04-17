import { v4 as uuidv4 } from 'uuid'


export default {
  install(Vue) {
    Vue.prototype.$pouchStorage = {}

    /**
     * Component methods
     */
    Vue.mixin({
      methods: {
        
      },
    })
    
    Vue.prototype.$pouchStorage.addList = function($pouchSession, formsData) {
      let newUUID = uuidv4();

      if(formsData._id) {
        newUUID = formsData._id;
      }

      $pouchSession.get(newUUID, {}, 'lists').then(async doc => {
        for(const key in formsData) {
          if(formsData[key] !== doc[key]) {
            doc[key] = formsData[key];
          }
        }
        return $pouchSession.put(doc, {}, 'lists').catch((error) => {
          console.error('Error on `addList(1)`, details:', error.status, '-', error.messages);
          return false
        })
      }).catch(() => {
        return $pouchSession.put({
          _id: newUUID,
          title: formsData.title,
          todos: formsData.todos,
          timeStamp: Date.now()
        }, {}, 'lists')
      }).then(() => true)
        .catch((error) => {
        console.error('Error on `addList(2)`, details:', error.status, '-', error.message);
        return false;
      })
    }

    Vue.prototype.$pouchStorage.deleteTask = function ($pouchSession, UUID) {
      return $pouchSession.get(UUID, {}, 'tasks').then(() => {
        Vue.prototype.$pouchStorage.deleteDBItem($pouchSession, 'tasks', UUID)
      }).catch((error) => {
        console.error('Error on `deleteTask`, details:', error.status, '-', error.message)
        return false
      })
    }

    Vue.prototype.$pouchStorage.fetchItemsDB = function ($pouchSession, dbName, options) {
      return $pouchSession.find(options.query, dbName).then((response) => {
        if (response && response.docs.length > 0) {
          return response.docs
        } else {
          return []
        }
      }).catch((error) => {
        console.error('Error on `fetchItemsDB`, details:', error.status, '-', error.message)
        return false
      })
    }

    Vue.prototype.$pouchStorage.editDBItemAsObject = function ($pouchSession, dbName, UUID, newData) {
      return $pouchSession.get(UUID, {}, dbName).then((doc) => {
        for (const key in newData) {
          if (newData[key] !== doc[key]) {
            doc[key] = newData[key]
          }
        }
        return $pouchSession.put(doc, {}, dbName)
      }).catch((error) => {
        console.error('Error on `editDBItemAsObject`, details:', error.status, '-', error.message)
        return false
      })
    }

    Vue.prototype.$pouchStorage.deleteDBItem = function ($pouchSession, dbName, UUID) {
      return $pouchSession.get(UUID, {}, dbName).then((doc) => {
        return $pouchSession.remove(doc, {}, dbName)
      }).catch((error) => {
        console.error('Error on `deleteDBItem`, details:', error.status, '-', error.message)
        return false
      })
    }
  }
}