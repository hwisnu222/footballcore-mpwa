//load element in after load page
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elements);
  loadNav();

  function loadNav() {
    //mengambil data dengan ajax
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
        //menampilkan navbar
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elem) {
          elem.innerHTML = xhttp.responseText;
        });
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elem) {
            elem.addEventListener("click", function (event) {
              //untuk menutup sidebar
              const sideNavbar = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sideNavbar).close();
              //memuat page
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "components/navbar.html", true);
    xhttp.send();
  }

  //memuat page
  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const content = document.querySelector("#content");

        if (page === "saved") {
          getSavedScheduled();
        } else if (page == "jadwalPertandingan") {
          getScheduledAll();
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 400) {
          content.innerHTML = "<p>Page tidak ditemukan.</p>";
        } else {
          content.innerHTML =
            "Jangan bingung. kami akan menyelesaikan dengan cepat kok";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
