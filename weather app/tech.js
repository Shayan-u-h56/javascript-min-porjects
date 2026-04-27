//promieses

let input = document.getElementById('inputfield')
let botn = document.getElementById('btn')
let main = document.getElementById('maindiv')

main.style.display = "none"
botn.addEventListener("click", (e) => {
    e.preventDefault()

    let value = input.value
    if (value === '' || value === ' ') {
        alert("Please Enter City Name")

        return
    }
    const apikey = "dc442d07fdb531bb62b18d3dad4f83c2"
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apikey}&units=metric`)
        .then(res => res.json())
        .then((data) => {
            if (data.cod !== 200) {
                alert('City Not Found')
                return
            }


            let imgpath = "./images/snow.png"
            if (data.weather[0].main === "Clouds") imgpath = "./images/clouds.png"
            else if (data.weather[0].main === "Rain") imgpath = "./images/rain.png"
            else if (data.weather[0].main === "Clear") imgpath = "./images/clear.png"
            else if (data.weather[0].main === "Snow") imgpath = "./images/snow.png"
            else if (data.weather[0].main === "mist" || data.weather[0].main === "Haze" || data.weather[0].main === "Smoke" || data.weather[0].main === "Fog") imgpath = "./images/mist.png"
            else if (data.weather[0].main === "Drizzle") imgpath = "./images/drizzle.png"
            main.style.display = "block"
            main.innerHTML = `
              <div class="margin">
                <img src="${imgpath}" alt="">
                <div class="centigrate">${data.main.temp}°C</div>
                <div class="city">${data.name}</div>
            </div>

            <div class="weather">
                <div class="col">
                    <img src="./images/humidity.png" alt="">
                    <div>
                        <h3>${data.main.humidity}%</h3>
                        <p>humidity</p>
                    </div>
                </div>
                <div class="col">
                    <img src="./images/wind.png" alt="">
                    <div>
                        <h3>${(data.wind.speed * 3.6).toFixed(1)}km/h</h3>
                        <p>wind speed</p>
                    </div>
                </div>
            </div>

            `


        });

    input.value = ''



})



/////////////////////////////////////////////////////////
