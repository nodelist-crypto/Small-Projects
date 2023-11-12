const timeEl = document.getElementById("time");
const timeZone = document.getElementById("time-zone");
const dateEl = document.getElementById("date");
const Am_Pm = document.getElementById("am-pm");
const currentWeatherItems = document.getElementById("current-weather-items");
const countryEl = document.getElementById("country");
const currentTemp = document.getElementById("current-temp");
const weatherForecast = document.getElementById("weather-forecast");

const DayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusrday", "Friday", "Saturday"]
const MonthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const API_KEY="49cc8c821cd2aff9af04c9f98c36eb74";

setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hour12 = hour >=13? hour%12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12? 'PM' : 'AM';

    timeEl.innerHTML = (hour12<10?'0'+hour12: hour12)+ ':' + (minutes<10?'0'+minutes: minutes) +' '+ `<samp id="am-pm"> ${ampm}</samp>`;
    dateEl.innerHTML = DayArray[day] +", "+ date +" "+MonthArray[month];

},1000);

getWeatherData()

function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let {latitude, longitude} = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json()
        .then(data=>{
            console.log(data);
            showWeatherData(data)
        }))
    })
}

function showWeatherData(data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    
    timeZone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N' + data.lon + 'E';


    currentWeatherItems.innerHTML =
    `  
        <div class="weather-info">
          <div>Humidity</div>
          <div>${humidity}%</div>
        </div>
        <div class="weather-info">
          <div>Pressure</div>
          <div>${pressure}</div>
        </div>
        <div class="weather-info">
          <div>Wind Speed</div>
          <div>${wind_speed}</div>
        </div>
        <div class="weather-info">
          <div>Sunrise</div>
          <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-info">
          <div>Sunset</div>
          <div>${window.moment(sunset*1000).format('HH:mm a')}</div>

        </div>
   
        `;
let otherDayForcast =' ';
let today = ' ';
data.daily.forEach((day, idx) => {
console.log(day)
    
       if(idx==0){
today =`
     
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather-icon" class="w-icon" />
        <div class="other">
        <div class="day">${window.moment(day.dt*1000).format('ddd')}day</div>
        <div class="temp">Night-${day.temp.night}&#176;C</div>
        <div class="temp">Day-${day.temp.day}&#176;C</div>
 
      </div>`

       }
       else{
     
        otherDayForcast += `
        <div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon" />
        <div class="temp">Night - ${day.temp.night} &#176;C</div>
        <div class="temp">Day - ${day.temp.day} &#176;C</div>
        </div>
        `
       }

     
});

currentTemp.innerHTML = today;
weatherForecast.innerHTML = otherDayForcast;

}