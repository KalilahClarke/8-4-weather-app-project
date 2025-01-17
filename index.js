// HTML FORMAT: Basic Template
const body = document.querySelector("body");

//Header
const header = document.createElement("header");
header.style.backgroundColor = '#1282A2'
header.style.borderColor = 'black'
const h1 = document.createElement("h1");
h1.textContent = "Weather App";

//HeaderParagraph
const headerParagraph = document.createElement("p");
headerParagraph.textContent = "Pick a Location";

//Form within Header
const headerForm = document.createElement("form");
headerForm.setAttribute("type", "submit");

//Append Header Elements
header.append(h1, headerParagraph, headerForm);

//TextBar
const textBar = document.createElement("input");
textBar.setAttribute("type", "text");

//Header Button
const headerSubmitButton = document.createElement("input");
headerSubmitButton.setAttribute("type", "submit");
headerSubmitButton.textContent = "Submit";
headerForm.append(textBar, headerSubmitButton);

//Append Header:
body.append(header);

//Main
const main = document.createElement("main");
main.setAttribute("id", "location");
main.style.backgroundImage = `url('https://cdn.dribbble.com/users/28455/screenshots/1389791/media/bd9f8d16f8a3027d4dccb852d44b37d6.gif')`
main.style.backgroundPosition = 'center'
main.style.backgroundSize = "70%, 50%";
//Main Text via Paragraph Tag
const mainText = document.createElement("p");
mainText.setAttribute("class", "mainText");
mainText.textContent = "Choose a location to view the weather";
//Append to main
body.append(main);

//Outline mainShowWeather Function

//Create the necessary Elements
//Outer Element that all elements 52 - 65 append to prior to function
const mainArticle = document.createElement("article");
mainArticle.setAttribute("class", "searched-location");
mainArticle.append(mainText);
//Elements appended to mainArticle
const mainH2 = document.createElement("h2");

const mainArea = document.createElement("p");
//Class: mainArea
mainArea.setAttribute("class", "mainArea");
const mainRegion = document.createElement("p");
//Class: mainRegion
mainRegion.setAttribute("class", "mainRegion");
const mainCountry = document.createElement("p");
//Class: mainCountry
mainCountry.setAttribute("class", "mainCountry");
const mainTemperature = document.createElement("p");
//Class: mainTemperature
mainTemperature.setAttribute("class", "mainTemperature");

//Append
mainArticle.append(mainH2, mainArea, mainRegion, mainCountry, mainTemperature);
//mainArticle appends to main
main.append(mainArticle);

const mainShowWeather = (current, input) => {
  const radioFahrenheit = document.querySelector('.fahrenheit')
  const radioCelsius = document.querySelector('.celsius')
  //Clear the mainText
  const mainText = document.querySelector(".mainText");
  mainText.textContent = "";

  const mainH2 = document.querySelector("h2");
  // mainH2.textContent = input;
  const mainArea = document.querySelector(".mainArea");
  const mainRegion = document.querySelector(".mainRegion");
  const mainCountry = document.querySelector(".mainCountry");
  const mainTemperature = document.querySelector(".mainTemperature");

  if(current.nearest_area[0].areaName[0].value.toLowerCase() === input.toLowerCase()){
    mainH2.textContent = input;
    mainArea.innerHTML = `<strong>Area:</strong> ${current.nearest_area[0].areaName[0].value}`;
    mainRegion.innerHTML = `<strong>Region:</strong> ${current.nearest_area[0].region[0].value}`;
    mainCountry.innerHTML = `<strong>Country:</strong> ${current.nearest_area[0].country[0].value}`;
  }else{
    mainH2.textContent = input;
    mainArea.innerHTML = `<strong>Nearest Area:</strong> ${current.nearest_area[0].areaName[0].value}`;
    mainRegion.innerHTML = `<strong>Region:</strong> ${current.nearest_area[0].region[0].value}`;
    mainCountry.innerHTML = `<strong>Country:</strong> ${current.nearest_area[0].country[0].value}`;
  }

  
  if(radioFahrenheit.checked){
    mainTemperature.innerHTML = `<strong>Currently:</strong> ${current.current_condition[0].FeelsLikeF} F°`;
  }else{
    mainTemperature.innerHTML = `<strong>Currently:</strong> ${current.current_condition[0].FeelsLikeC} C°`
  }
};

//Calling Event Listener on Form
headerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //Receives Search Value
  let location;
  location = textBar.value.replace(" ", "") + "?format=j1";
  let value = textBar.value

  //Link to API
  let API = `https://wttr.in/${location}`;
  let apiWeather;

  fetch(API)
    .then((response) => response.json())
    .then((json) => {
      apiWeather = json;
      console.log(apiWeather)
      mainShowWeather(apiWeather, value);
      forEachArticle(apiWeather);
      searchList(apiWeather,value)
      conversionTemperature(apiWeather)
      partlyCloudy(apiWeather)
      lightning(apiWeather)
      raining(apiWeather)
      overcast(apiWeather)
    })
    .catch((error) => console.log(error));

  headerForm.reset();
});

//Create a Function that Populates an Article .forEach() Index in the Array

const sectionArticle = document.createElement("section");
main.append(sectionArticle);

const today = document.createElement("article");
const tomorrow = document.createElement("article");
const dayAfterTomorrow = document.createElement("article");
const dayArticles = [today, tomorrow, dayAfterTomorrow];

//Creation of Article Elements
dayArticles.forEach((dayArticle, i) => {
  const title = document.createElement('h3')
  title.setAttribute('class',`article${i}`)
  dayArticle.setAttribute("class", `article${i}`);
  const average = document.createElement("p");
  average.setAttribute("class", 'average');
  const max = document.createElement("p");
  max.setAttribute("class", 'max');
  const min = document.createElement("p");
  min.setAttribute("class", 'min');
  dayArticle.append(title, average, min, max);
  sectionArticle.append(dayArticle);
});

//Setting the Articles TextContent
const forEachArticle = (temperature) => {
  temperature.weather.forEach((day, i) => {
   const main = document.querySelector('main')
   main.style.backgroundImage = `url('')`
    const radioFahrenheit = document.querySelector('input')
    const radioCelsius = document.querySelector('input')

    const article = document.querySelector(`.article${i}`)
    
    const average = document.querySelector(`.article${i} .average`);
    const max = document.querySelector(`.article${i} .max`);
    const min = document.querySelector(`.article${i} .min`);
    
    if(radioCelsius.checked === true){
      average.innerHTML = `<strong>Average Temperature:</strong> ${day.avgtempC} C°`;
      max.innerHTML = `<strong>Max Temperature:</strong> ${day.maxtempC} C°`;
      min.innerHTML = `<strong>Min Temperature:</strong> ${day.mintempC} C°`;
    }else{
      average.innerHTML = `<strong>Average Temperature:</strong> ${day.avgtempF} F°`;
      max.innerHTML = `<strong>Max Temperature:</strong> ${day.maxtempF} F°`;
      min.innerHTML = `<strong>Min Temperature:</strong> ${day.mintempF} F°`; 
    }
    //Adding Article Headers 
    const todayh3 = document.querySelector('.article0 h3')
    todayh3.textContent = 'Today'
    const tomorrowh3 = document.querySelector('.article1 h3')
    tomorrowh3.textContent = 'Tomorrow'
    const dayAfterh3 = document.querySelector('.article2 h3')
    dayAfterh3.textContent = 'Day After Tomorrow'
  });
};

//List of Previous Searches

const aside = document.createElement('aside')
aside.setAttribute('class','list')
body.append(aside)

const listSection = document.createElement('section')
listSection.innerHTML = `<strong>Previous Searches</strong`
aside.append(listSection)

const sectionParagraph = document.createElement('p')
sectionParagraph.textContent = "No previous searches"
const ul = document.createElement('ul')
listSection.append(sectionParagraph, ul)

const searchList = (location, input) => {
const radioFahrenheit = document.querySelector('input')
const radioCelsius = document.querySelector('input')
sectionParagraph.textContent = ''

const list = document.querySelectorAll('a')

  const li = document.createElement('li')
  const a = document.createElement('a')
  a.setAttribute('href',`#`)
  if(radioCelsius.checked === true){
    a.textContent= `${input}-${location.current_condition[0].FeelsLikeC} C°`
  }else{
    a.textContent= `${input}-${location.current_condition[0].FeelsLikeF} F°`
  }
  li.append(a)
  ul.append(li)
  
  li.addEventListener('click',(event)=>{
    const mainH2 = document.querySelector('h2')
    mainShowWeather(location, input)
    mainH2.textContent = input
    forEachArticle(location);  
  }) 
}

//Change to Celsius or Farenhiet 
const asideConvert = document.createElement('aside')
asideConvert.setAttribute('class','converter')
asideConvert.style.backgroundColor = "#1282A2"
header.before(asideConvert)
const convert = document.createElement('form')
asideConvert.append(convert)
const radioCelsius = document.createElement('input')
radioCelsius.setAttribute('type','radio')
radioCelsius.setAttribute('value','celsius')
radioCelsius.setAttribute('name','convert') 
radioCelsius.setAttribute('class','celsius')

const celsius = document.createElement('p')
celsius.textContent= 'Celsius'

const radioFahrenheit = document.createElement('input')
radioFahrenheit.setAttribute('type','radio')
radioFahrenheit.setAttribute('name','convert') 
radioFahrenheit.setAttribute('value','fahrenheit')
radioFahrenheit.setAttribute('class','fahrenheit')
radioFahrenheit.setAttribute('checked', true)
//radioFahrenheit.setAttribute('autocomplete','checked')
const fahrenheit = document.createElement('p')
fahrenheit.textContent = 'Fahrenheit'
const convertParagraph = document.createElement('p')
convertParagraph.textContent = 'Convert the Temperature'

convert.append(celsius, radioCelsius, fahrenheit, radioFahrenheit)

const conversionTemperature = (temperature) =>{
  convert.addEventListener('change',(event)=>{
    const radioFahrenheit = document.querySelector('input')
    const radioCelsius = document.querySelector('input')

    const averageToday = document.querySelector(`.article0 .average`);
    const maxToday = document.querySelector(`.article0 .max`);
    const minToday = document.querySelector(`.article0 .min`);
    
    const averageTomorrow = document.querySelector(`.article1 .average`);
    const maxTomorrow = document.querySelector(`.article1 .max`);
    const minTomorrow = document.querySelector(`.article1 .min`);
    
    const averageDayAfter = document.querySelector(`.article2 .average`);
    const maxDayAfter = document.querySelector(`.article2 .max`);
    const minDayAfter = document.querySelector(`.article2 .min`);
    
    if(radioCelsius.checked === true){
      const mainTemperature = document.querySelector(".mainTemperature");
      mainTemperature.innerHTML = `<strong>Currently:</strong> ${temperature.current_condition[0].FeelsLikeC} C°`
      
      averageToday.innerHTML = `<strong>Average Temperature:</strong> ${temperature.weather[0].avgtempC} C°`;
      maxToday.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[0].maxtempC} C°`;
      minToday.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[0].mintempC} C°`;
      
      
      averageTomorrow.innerHTML = `<strong>Average Temperature:</strong> ${temperature.weather[1].avgtempC} C°`;
      maxTomorrow.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[1].maxtempC} C°`;
      minTomorrow.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[1].mintempC} C°`;
      
      
      averageDayAfter.innerHTML = `<strong>Average Temperature:</strong> ${temperature.weather[2].avgtempC} C°`;
      maxDayAfter.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[2].maxtempC} C°`;
      minDayAfter.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[2].mintempC} C°`;
      
    }else{
      mainTemperature.innerHTML = `<strong>Currently:</strong> ${temperature.current_condition[0].FeelsLikeF} F°`
      
      averageToday.innerHTML = `<strong>Average Temperature:</strong> ${temperature.weather[0].avgtempF} F°`;
      maxToday.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[0].maxtempF} F°`;
      minToday.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[0].mintempF} F°`;
      
      averageTomorrow.innerHTML = `<strong>Average Temperature:</strong> ${temperature.weather[1].avgtempF} F°`;
      maxTomorrow.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[1].maxtempF} F°`;
      minTomorrow.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[1].mintempF} F°`;
      
      averageDayAfter.innerHTML = `<strong>Average Temperature:</strong> ${temperature.weather[2].avgtempF} F°`;
      maxDayAfter.innerHTML = `<strong>Max Temperature:</strong> ${temperature.weather[2].maxtempF} F°`;
      minDayAfter.innerHTML = `<strong>Min Temperature:</strong> ${temperature.weather[2].mintempF} F°`;
    }
    
  })
}


//Aside Form that allows the viewer to see the conversion of a specific temperature of their choosing to Celsius or Fahrenheit


const asideForm = document.querySelector('.list')
const formTemperature = document.createElement('form')
formTemperature.setAttribute('id','convert')



asideForm.append(formTemperature)

//needs to be appended to correct location in the body
const number = document.createElement('input')
number.setAttribute('type','number')
number.setAttribute('id','temp-to-convert')
number.setAttribute('class','number')
  const inputParagraph = document.createElement('p')
  inputParagraph.textContent = 'Convert the Temperature'

  const inputCelsius = document.createElement('input')
  inputCelsius.setAttribute('type','radio')
  inputCelsius.setAttribute('name','convert-temp')
  inputCelsius.setAttribute('value','c')
  inputCelsius.setAttribute('class','inputCelsius')
  const celsiusLabel = document.createElement('label')
  celsiusLabel.textContent = 'Celsius'
  celsiusLabel.append(inputCelsius)

  const inputFahrenheit = document.createElement('input')
  inputFahrenheit.setAttribute('type','radio')
  inputFahrenheit.setAttribute('name','convert-temp')
  inputFahrenheit.setAttribute('value','f')
  inputFahrenheit.setAttribute('class','inputFahrenheit')
  inputFahrenheit.setAttribute('checked',true)
  const fahrenheitLabel = document.createElement('label')
  fahrenheitLabel.textContent ='Fahrenhiet'

  fahrenheitLabel.append(inputFahrenheit)

  const submit = document.createElement('input')
  submit.setAttribute('type','submit')
  submit.setAttribute('class','submit')
  submit.textContent = 'Submit'

  const br1 = document.createElement('br')
  const br2 = document.createElement('br')
  const br3 = document.createElement('br')

  const h4 = document.createElement('h4')
  h4.setAttribute('id','converted')
  let num = 0
  h4.textContent = num.toFixed(2)
  formTemperature.append(inputParagraph, number, br1, celsiusLabel, br2,fahrenheitLabel,br3, submit, h4)

    
    const tempChangerCtoF = () =>{
    
    formTemperature.addEventListener('submit',(event)=>{
      const number = document.querySelector('.number')
    
      event.preventDefault()

      //console.log(number.value)
      let temp = '';
      let result = 0
      if(inputCelsius.checked){
      result = ((number.value - 32) * (5/9)).toFixed(2)
      temp = `${result}C°`
      }
      if(inputFahrenheit.checked){
      result = ((number.value * 9/5) + 32).toFixed(2)
      temp = `${result}F°`
      }
      h4.textContent = temp
      formTemperature.reset()
    })
  
  }
  tempChangerCtoF()

  
  const partlyCloudy = (weather) => {
  const body = document.querySelector('body')
  const header = document.querySelector('header')
  const section = document.querySelector('.list section')
  const form = document.querySelector('#convert')
  const aside = document.querySelector('.converter')
  const main = document.querySelector('.searched-location')

  if(weather.current_condition[0].weatherDesc[0].value === 'Partly cloudy'){
    body.style.backgroundImage = `url('https://media.giphy.com/media/0Styincf6K2tvfjb5Q/giphy.gif')`
    body.style.backgroundPosition = 'center'
    body.style.backgroundRepeat = 'no-repeat'
    body.style.backgroundSize = 'cover'
    body.style.backgroundColor = 'aliceblue'
    body.style.color = 'black'

    header.style.border = 'white solid'
    header.style.backgroundColor = 'cornflowerblue'
    aside.style.backgroundColor = 'cornflowerblue'
    aside.style.border = 'white solid'
    
    main.style.opacity = '1'

    section.style.border = 'white solid'

    form.style.border = 'white solid'
    form.style.backgroundColor = '#9097C0'
    form.style.opacity = '1'
  }
}

const lightning = (weather) => {
  const body = document.querySelector('body')
  const header = document.querySelector('header')
  const section = document.querySelector('.list section')
  const form = document.querySelector('#convert')
  const aside = document.querySelector('.converter')
  const main = document.querySelector('.searched-location')

  if(weather.current_condition[0].weatherDesc[0].value === 'Lightning'){
    header.style.backgroundColor = ''

    aside.style.backgroundColor = ''

    body.style.backgroundImage = `url('gif/lightning.gif')`
    body.style.backgroundPosition = 'center';
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundColor = 'black'
    body.style.color = 'white';
    
    main.style.backgroundColor = '#5E60CE';
    main.style.border = 'black solid'
    main.style.opacity = '.5'
    
    section.style.border = 'black solid'

    form.style.border = 'black solid'
    form.style.backgroundColor = '#3C096C';
    form.style.opacity = '0.45';
  }
}

const overcast = (weather) => {
  const body = document.querySelector('body')
  const header = document.querySelector('header')
  const section = document.querySelector('.list section')
  const form = document.querySelector('#convert')
  const aside = document.querySelector('.converter')
  const main = document.querySelector('.searched-location')

  if(weather.current_condition[0].weatherDesc[0].value === 'Sunny'){
    body.style.backgroundImage = `url('gif/overcast.gif')`
    body.style.backgroundPosition = 'center';
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundColor = 'black'
    body.style.color = 'purple';


  }
}

const raining = (weather) => {
  const body = document.querySelector('body')
  const header = document.querySelector('header')
  const section = document.querySelector('.list section')
  const form = document.querySelector('#convert')
  const aside = document.querySelector('.converter')
  const main = document.querySelector('.searched-location')
  if(weather.current_condition[0].weatherDesc[0].value === 'Raining'){
    header.style.backgroundColor = '#FFC8DD'
    header.style.border ='#FFAFCC solid'

    aside.style.backgroundColor = '#FFC8DD'
    aside.style.border ='#FFAFCC solid'

    body.style.backgroundImage = `url('gif/rain.gif')`
    body.style.backgroundPosition = 'center';
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.color = 'rgb(1, 67, 67)'
    
    main.style.backgroundColor = '#A2D2FF';
    main.style.border = '#BDE0FE solid'
    main.style.opacity = '.5'
    
    section.style.backgroundColor = '#BDE0FE'

    form.style.border = '#BDE0FE solid'
    form.style.backgroundColor = '#A2D2FF';
    form.style.opacity = '0.45';

  }
}

const sunny = (weather)=>{
  const body = document.querySelector('body')
  const header = document.querySelector('header')
  const section = document.querySelector('.list section')
  const form = document.querySelector('#convert')
  const aside = document.querySelector('.converter')
  const main = document.querySelector('.searched-location')
  // if(weather.current_condition[0].weatherDesc[0].value === 'Sunny'){

  // }

}

