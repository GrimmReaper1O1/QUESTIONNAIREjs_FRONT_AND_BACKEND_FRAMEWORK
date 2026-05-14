function loadFromIndexedDB(dbName, storeName, key) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => reject("Failed to open database");

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
        db.createObjectStore(`sId${sessionStorage.getItem('subjectId')}Score`)
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        if (getRequest.result !== undefined) {
          resolve(getRequest.result);
        } else {
          reject(`No data for key: ${key}`);
        }
      };

      getRequest.onerror = () => reject("Failed to read data");
    };
  });
}

async function saveToIndexedDB(storeName, object, key, databaseName){
    return new Promise(
      function(resolve, reject) {
        if (object.id === undefined) reject(Error('object has no id.'));
        var dbRequest = indexedDB.open(databaseName);
  
        dbRequest.onerror = function(event) {
          reject(Error("IndexedDB database error"));
        };
  
        dbRequest.onupgradeneeded = function(event) {
          var database    = event.target.result;
  
          if (!database.objectStoreNames.contains(storeName)) {
            database.createObjectStore('menuObject');
            
          }
        };
  
        dbRequest.onsuccess = function(event) {
          var database      = event.target.result;
          var transaction   = database.transaction([storeName], 'readwrite');
          var objectStore   = transaction.objectStore(storeName);
          var objectRequest = objectStore.put(object, key); // Overwrite if exists
  
          objectRequest.onerror = function(event) {
            reject(Error('Error text'));
          };
  
          objectRequest.onsuccess = function(event) {
  
            setTimeout(() => (resolve(event.target.result)),);
  
          };
          objectRequest.oncomplete = function(event) {
            var data = event.target.result;
            data.close();
          }
        };
      }
    );
  };



 async function openDB(databaseName){
    var dbRequest = indexedDB.open(databaseName);

    dbRequest.onupgradeneeded = function(event) {
        var db    = event.target.result;
       db.createObjectStore('menuObject');

           
    };

    dbRequest.onsuccess = function(event) {
        var db = event.target.result;
        db.close();
    }

    dbRequest.onerror = function(event) {
        reject(Error('Error text'));
    };

};

 async function updateDelDB(storeName, databaseName, version){
  var dbRequest = indexedDB.open(databaseName, version);

  dbRequest.onupgradeneeded = (event) => {
    var database    = event.target.result;

    database.createObjectStore(storeName, {autoIncrement: false});



  };

  dbRequest.onsuccess = function(event) {

    var data = event.target.result;
    data.close();
  }

  dbRequest.onerror = function(event) {

  };

};


async function deleteDB(databaseName) {
  var db = indexedDB.deleteDatabase(databaseName);
  db.onsuccess = function (event) {



  }
  db.oncomplete = function (event) {
    var database = event.target.result;
    database.close();
  }

  db.onerror = function (event) {

  }
}

async function clearStore(databaseName, storeName) {
  const request = indexedDB.open(databaseName);
  request.onsuccess = (event) => {
     db = event.target.result;

    const transaction = db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);

    const clearRequest = objectStore.clear();

      clearRequest.onsuccess = () => {
        console.log("store cleared successfully");
      };
      clearRequest.onerror = (err) => {
        console.log("clear request failed!");
      }
  };

};



async function clearKey(databaseName, storeName, key) {
  const request = indexedDB.open(databaseName);
  request.onsuccess = (event) => {
     db = event.target.result;

    const transaction = db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      const deleteRequest = store.delete(key);

    deleteRequest.onsuccess = function () {
        console.log(`Record with key ${key} deleted successfully.`);
    };

    deleteRequest.onerror = function (event) {
        console.error("Delete failed:", event.target.error);
    };
  };

};


