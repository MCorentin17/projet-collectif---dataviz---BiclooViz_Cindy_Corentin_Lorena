let url = "https://data.nantesmetropole.fr/api/v2/catalog/datasets/244400404_stations-velos-libre-service-nantes-metropole-disponibilites/records?limit=100&offset=0&timezone=UTC&apikey=23b946c52b5a4af64281b14115fbde07eb7a8de57d5a2a7944628511";
//Récupèrer l'ensemble de la data et de la retranscrire en JS
async function getBikes() {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  return data;
}

async function totalBikes() {
  //Permet de stocker la data en JS fournie par la fonction getBikes()
  let resultBikes = await getBikes(url);
  //Création des variables d'initialisations pour nos différents calculs
  let bikeSum = 0;
  let totalBike = 0;

  //Boucle pour avoir les vélos en circulation
  for (let i = 0; i < resultBikes.records.length; i++) {
    bikeSum += resultBikes.records[i].record.fields.available_bike_stands;
  }
  console.log(bikeSum);

  //Boucle pour avoir le total de vélos
  for (let i = 0; i < resultBikes.records.length; i++) {
    totalBike += resultBikes.records[i].record.fields.bike_stands;
  }

  let ctx = document.getElementById("graph1");
  document.getElementById("compteur").innerHTML += bikeSum;

  //Conversion du nombre de vélos en circulation en pourcentage
  let result = Math.round((bikeSum * 100) / totalBike);

  //Initialisation du nouveau graphique
  new Chart(ctx, {
    type: "doughnut",
    
    data: {
      labels : ["Vélos utilisés","Vélos disponibles" ],
      datasets: [
        {
          labels: "# de velos",
          backgroundColor: ["#de781f", "#000000"],
          data: [result, 100 - result],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
          legend: {
              position: 'right'
          }
      }
  }
  });
}
totalBikes();
