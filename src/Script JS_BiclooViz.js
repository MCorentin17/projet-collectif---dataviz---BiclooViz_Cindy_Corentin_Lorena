async function getTotalBikes(){
return fetch('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_stations-velos-libre-service-nantes-metropole-disponibilites&q=&rows=200&facet=banking&facet=bonus&facet=status&facet=contract_name')
  .then((response) => response.json())
  .then((data) => {
   // console.log(data.records[0].fields.available_bike_stands)
   // console.log(data)
    let bikeSum = 0 
    for (let i = 0; i < data.records.length; i++){
        bikeSum +=  data.records[i].fields.available_bike_stands
        }
    return bikeSum
  })

}

let resultCirculatingBikes = getTotalBikes()
.then((circulatingBikes) => console.log(circulatingBikes))
