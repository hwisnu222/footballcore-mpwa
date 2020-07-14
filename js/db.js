//register indexeddb
const dbPromised = idb.open("football-scheduled", 1, function (upgradeDb) {
  const articlesObjectStore = upgradeDb.createObjectStore("scheduled", {
    keyPath: "id",
  });
  articlesObjectStore.createIndex("post_title", "post_title", {
    unique: false,
  });
});

//put data jadwal sepak bola
function saveScheduled(scheduled) {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  dbPromised
    .then(function (db) {
      const tx = db.transaction("scheduled", "readwrite");
      const store = tx.objectStore("scheduled");
      console.log(scheduled.matches[idParam]);
      store.put(scheduled.matches[idParam]);
      return tx.complete;
    })
    .then(function () {
      M.toast({
        html: "Jadwal berhasil di simpan.",
        classes: "blue darken-1",
      });
    });
}

// get semua data pada indexedDB
function getScheduled() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("scheduled", "readonly");
        const store = tx.objectStore("scheduled");
        return store.getAll();
      })
      .then(function (items) {
        resolve(items);
        console.log(items);
      });
  });
}

//delete item pada dari indexedDB
function deleteScheduled(item) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("scheduled", "readwrite");
      const store = tx.objectStore("scheduled");
      store.delete(item);
      return tx.complete;
    })
    .then(function () {
      M.toast({
        html: "Jadwal berhasil di hapus.",
        classes: "blue darken-1",
      });
    });

  location.reload();
}
