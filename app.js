function getData() {
  const date = new Date();
  let currentDate = `${date}`;

  const getHeader = document.getElementById('header');
  const getLocation = document.getElementById('location');
  const getCurrent = document.getElementById('current');
  const API_KEY = 'de404b5787706a2e41c10f612aac0485';

  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('autocomplete', 'on');
  searchInput.setAttribute('id', 'search-input');
  searchInput.setAttribute('placeholder', 'Enter a City (Please check for spelling errors)');


  const searchButton = document.createElement('button');
  searchButton.setAttribute('id', 'search-Button');
  searchButton.innerText = '🔍';

  getHeader.append(searchInput);
  getHeader.append(searchButton);

  searchButton.addEventListener('click', fetchData);
  searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      fetchData();
    }
  });

  function fetchData() {
    const city = searchInput.value;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const result = data;

        const createLocation = document.createElement('div');
        createLocation.setAttribute('class', 'city');
        createLocation.innerText = result.name + ', ' + result.sys.country;

        const createDate = document.createElement('div');
        createDate.setAttribute('class', 'date');
        createDate.innerText = currentDate.slice(0, 15);

        const createTemp = document.createElement('div');
        createTemp.setAttribute('class', 'temp');
        createTemp.innerText = result.main.temp + '°c';

        const createWeather = document.createElement('div');
        createWeather.setAttribute('class', 'weather');
        createWeather.innerText = result.weather[0].main;

        const createMinMaxTemp = document.createElement('div');
        createMinMaxTemp.setAttribute('class', 'hi-low');
        createMinMaxTemp.innerText =
          result.main.temp_max + '°c' + ' / ' + result.main.temp_min + '°c';

        while (getLocation.firstChild) {
          getLocation.removeChild(getLocation.firstChild);
        }

        while (getCurrent.firstChild) {
          getCurrent.removeChild(getCurrent.firstChild);
        }

        getLocation.append(createLocation);
        getLocation.append(createDate);

        getCurrent.append(createTemp);
        getCurrent.append(createWeather);
        getCurrent.append(createMinMaxTemp);
      });
  }
}

getData();
