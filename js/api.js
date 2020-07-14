//mengambil data dari API
let proxy = "https://cors-site.herokuapp.com/";
let urlApi = "https://api.football-data.org/v2/teams/65/matches";

function status(response) {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

function json(response) {
  /*Mengembalikan sebuah Promise berupa objek/array JavaScript
  yang diubah dari teks JSON.*/
  return response.json();
}

function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getAPI() {
  return fetch(proxy + urlApi, {
    mode: "cors",
    headers: {
      "X-Auth-Token": "572ebd987cef41928c5911bf3cebd8bb",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-auth-token, x-response-control",
      "Content-Length": 0,
      "Content-Type": "text/plain",
    },
  });
}

function getScheduledAll() {
  //ambil data dari server
  getAPI()
    .then(status)
    .then(json)
    .then(function (data) {
      let contentFooball = "";
      // Objek/array JavaScript dari response.json() masuk lewat data.
      data.matches.forEach((data, index) => {
        contentFooball += `<div class="col s12 m12">
      <a href="./detailScheduled.html?id=${index}&idDetail=${data.id}">
        <div class="card">
            <div class="card-content">
                <div class="card-title center">
                    <h4><b>${data.homeTeam.name} <span class="red-text">VS</span> ${data.awayTeam.name}</b></h4>
                </div>
            </div>
        </div>
      </a>
  </div>`;
      });
      document.querySelector("#content-squad").innerHTML = contentFooball;
    })
    .catch(error);
}

//ambil data detail jadwal
function getScheduledById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=) dari action click
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    getAPI()
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // Menyusun komponen card artikel secara dinamis
        const competitions = data.matches[idParam];
        let scheduleHTML = `
        <div class="card">
            <div class="card-image">
                <img src="${competitions.competition.area.ensignUrl}" alt="">
            </div>
            <div class="card-content">
                <div class="card-tilte center">
                    <h4>${competitions.homeTeam.name}</h3>
                    <h3 class="red-text">VS</h3> 
                    <h4>${competitions.awayTeam.name}</h4>
                </div>
                <p>Name: ${competitions.competition.name}</p>
                <p>Area: ${competitions.competition.area.name}</p>
                <p>Start Date: ${competitions.season.startDate}</p>
                <p>End Date: ${competitions.season.endDate}</p>
                <p>Home Team: 
                  <span class="red-text">${competitions.homeTeam.name}</span>
                </p>
                <p class="right"><i>Last Updated : ${competitions.lastUpdated}</i></p>
            </div>
        </div>
      `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = scheduleHTML;
        resolve(data);
      });
  });
}

// menampilkan jadwal di page saved
function getSavedScheduled() {
  getScheduled().then(function (items) {
    // Menyusun komponen card artikel secara dinamis
    let scheduledsHTML = "";
    items.forEach(function (data, index) {
      scheduledsHTML += `
      <div class="card">
        <div class="card-image">
            <img src="${items[index].competition.area.ensignUrl}" alt="">
        </div>
        <div class="card-content">
            <div class="card-tilte center">
                <h4>${items[index].homeTeam.name}</h3>
                <h3 class="red-text">VS</h3> 
                <h4>${items[index].awayTeam.name}</h4>
            </div>
            <p>Name: ${items[index].competition.name}</p>
            <p>Area: ${items[index].competition.area.name}</p>
            <p>Start Date: ${items[index].season.startDate}</p>
            <p>End Date: ${items[index].season.endDate}</p>
            <p>Home Team: 
              <span class="red-text">${items[index].homeTeam.name}</span>
            </p>
            <p><i>Last Updated : ${items[index].lastUpdated}</i></p>            
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn" onClick="deleteScheduled(${items[index].id})">Hapus Jadwal</a>
        </div>
      </div>`;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = scheduledsHTML;
  });
}
