let btn=document.getElementById("btn")
            btn.addEventListener("click",toggle)
        
        function toggle(){
            document.body.classList.toggle("dark")

             if(document.body.classList.contains("dark")){
            btn.textContent="☀️"
        }
        else{
            btn.textContent="🌙"
        }
          
        }

       

        const API_KEY = '10c4d909330b531d20b249910c125bb7';

         let currentCity = "";

        // 1. IMPLEMENT getWeather(city) - Fetch API + async/await

     const div = document.createElement("div");
            div.classList.add("favorite-item");
       const search=document.getElementById("searchBtn")
    //    search.addEventListener("click", async ()=>{
    //    const city=document.getElementById("cityInput").value
    


       async function searchWeather(city){
         const loader =
        document.getElementById("loader");
      if (!city.trim()) {
        document.getElementById("errormsg").innerHTML = "";
        return;
    }


       
 try{   
          loader.style.display = "block";
        document.getElementById("errormsg").innerHTML=""
        const weather= await getWeather(city)
        console.log(weather)
        
        currentCity = weather.city;
        
        document.getElementById("place").innerHTML=weather.city
        document.getElementById("temp").innerHTML=`${weather.temp}°C`
        document.getElementById("description").innerText=weather.description
        document.getElementById("humidity").innerText=`${weather.humidity}%`
        const windKmH = (weather.windSpeed * 3.6).toFixed(1);
        document.getElementById("wind").innerText=`${windKmH}k/h`

 

        const icon=document.getElementById("weatherIcon")
        
        if(weather.condition==="Rain"){
            icon.src="weather_image/rain.png";
        }
        else if(weather.condition==="Drizzle"){
            icon.src="weather_image/dizzle.png";
        }
          else if(weather.condition==="Mist"){
            icon.src="weather_image/mist.png";
        }
          else if(weather.condition==="Snow"){
            icon.src="weather_image/snow.png";
        }
          else if(weather.condition==="Clear"){
            icon.src="weather_image/clear.png";
        }
          else if(weather.condition==="Clouds"){
            icon.src="weather_image/clouds.png";
        }
        else{
            icon.innerHTML="<h3>no weather ICON</h3>"
        }

      


    }
    catch(error){
       
        document.getElementById("errormsg").innerHTML=
        error.message;
        // "Invalid place entered"
    }
     finally {
        loader.style.display = "none";
    }
        
      }
      
        

        

        async function getWeather(city){

       
         const url=
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;     

        const response=await fetch(url)    // TODO: Complete this function
         const data=await response.json();
      
           if (!response.ok) {
            throw new Error(data.message);
            }
          
         

         
         return {
            city: data.name,

            temp: Math.round(data.main.temp),

            feelsLike: Math.round(data.main.feels_like),

            description: data.weather[0].description,
               
            condition: data.weather[0].main,
    

            humidity: data.main.humidity,

            windSpeed: data.wind.speed

        };
         }
    //   function debounceSearch(weatherFunction,delay) {
    //     let time;
    //      return function(city) {
    //      clearTimeout(time);
    //       time=setTimeout(()=>{
    //      let city = document.getElementById("cityInput").value;

    //         weatherFunction(city); 
            

    //       },delay);
        
    //     }
    //     }
    //     let debounce=debounceSearch(searchWeather,500) 
    let time;
        const inputBox=document.getElementById("cityInput")
       inputBox.addEventListener("input",(e)=>{
             clearTimeout(time)
             time=setTimeout(()=>{
                searchWeather(e.target.value)
             },1000);
           
            //  debounce(e.target.value)
       })


const favoriteBtn =
    document.getElementById("favoriteBtn");

favoriteBtn.addEventListener("click", () => {
    if (currentCity) {
        addFavorite(currentCity);
        loadFavorites();
    }
});
        

     
  function addFavorite(city) {
    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(city)) {
        favorites.push(city);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }
}  

function loadFavorites() {
    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const favoritesList =
        document.getElementById("favoritesList");

    favoritesList.innerHTML = "";

 favorites.forEach(city => {

    const div = document.createElement("div");
    div.classList.add("favorite-item");

    const p = document.createElement("p");
    p.innerText = city;

    const btn = document.createElement("button");
    btn.innerText = "❌";

    div.appendChild(p);
    div.appendChild(btn);

    favoritesList.appendChild(div);


    btn.addEventListener("click", () => {
        removeFavorite(city);
    });



   
});
}
function removeFavorite(cityToRemove) {
    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(
        city => city !== cityToRemove
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    loadFavorites();
}
loadFavorites();

// 5. IMPLEMENT debounceSearch()
  
       



        
       



        // Export functions for button onclick (temporary)

        // window.searchWeather = searchWeather;

        // window.addFavorite = addFavorite
