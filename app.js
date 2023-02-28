// map object

// get coordinates via geolocation api

// get foursquare businesses
async function getFoursquare(business) {
    const options ={
        method: 'GET',
        headerrs: {
        Accept: 'application/json',
        Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
        },
    };
    let limit = 5
    let lat = 39.9472156;
    // myMap.coordinate[0]
    let lon = -75.1651748;
    // myMap.coordinate[1]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.results
    return businesses
}

console.log(getFoursquare("coffee shops"))

// process foursquare array

function processBusiness(data){
    let businesses = data.map((element) => {
        let location = {
            name: element.name,
            lat : element.geocodes.main.latitude,
            long: element.geocodes.main.longitude
        };
        return location
    });
    return businesses
}

// event handlers
// window load

// business submit button

document.getElementById("submit").addEventListener('click', async (event) =>{
    event.preventDefault();
    let business = document.getElementById("business").value
    let data = await getFoursquare(business)
    myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
});