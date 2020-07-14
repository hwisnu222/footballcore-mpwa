document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idDetail = urlParams.get("idDetail");

  getScheduled();
  getScheduledById();
  const item = getScheduledById();
  // Tambakan baris kode di bawah
  const save = document.getElementById("save");
  save.onclick = function () {
    item.then(function (data) {
      saveScheduled(data);
    });
  };
});
