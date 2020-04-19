import { v4 as uuidv4 } from 'uuid'

const ListsDB = 'lists';

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

      $pouchSession.get(newUUID, {}, ListsDB).then(async doc => {
        for(const key in formsData) {
          if(formsData[key] !== doc[key]) {
            doc[key] = formsData[key];
          }
        }
        return $pouchSession.put(doc, {}, ListsDB).catch((error) => {
          console.error('Error on `addList(1)`, details:', error);
          return false;
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

    Vue.prototype.$pouchStorage.deleteList = function ($pouchSession, UUID) {
      return $pouchSession.get(UUID, {}, ListsDB).then(() => {
        Vue.prototype.$pouchStorage.deleteDBItem($pouchSession, ListsDB, UUID)
      }).catch((error) => {
        console.error('Error on `deleteList`, details:', error.status, '-', error.message)
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

    Vue.prototype.$pouchStorage.getDBItem = function ($pouchSession, dbName, UUID) {
      return $pouchSession.get(UUID, {}, dbName).then((doc) => {
        return doc
      }).catch((error) => {
        console.error('Error on `getDBItem`, details:', error.status, '-', error.message)
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