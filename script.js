const apiKey = "580f288a57f67f815593c291397c8207";

// Saatin kontrol edilmesi ve arka planın değiştirilmesi
function setBackground() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 17) {
        document.body.style.backgroundImage = "url('images/gunduz.jpg')";
    } else {
        document.body.style.backgroundImage = "url('images/aksam.jpg')";
    }
}

// Hava durumu verisini alma fonksiyonu
function fetchWeather(city) {
    showLoading(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Şehir bulunamadı");
            }
            return response.json();
        })
        .then(data => {
            showWeather(data);
        })
        .catch(() => {
            showError();
        });
}

// Hava durumu bilgilerini ekrana yazdırma
function showWeather(data) {
    const cityName = data.name;
    const temp = data.main.temp.toFixed(1);
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById("city-name").innerText = cityName;
    document.getElementById("temperature").innerText = `${temp} °C`;
    document.getElementById("condition").innerText = condition.charAt(0).toUpperCase() + condition.slice(1);
    document.getElementById("humidity").innerText = `Nem: %${humidity}`;
    document.getElementById("wind").innerText = `Rüzgar: ${windSpeed} km/s`;

    showLoading(false);
    document.getElementById("weather-info").style.display = "block";
    document.getElementById("error-message").style.display = "none";
}

// Hata mesajını gösterme
function showError() {
    showLoading(false);
    document.getElementById("weather-info").style.display = "none";
    document.getElementById("error-message").style.display = "block";
}

// Loading göster / gizle fonksiyonu
function showLoading(isLoading) {
    if (isLoading) {
        document.getElementById("loading-icon").style.display = "block";
        document.getElementById("weather-info").style.display = "none";
        document.getElementById("error-message").style.display = "none";
    } else {
        document.getElementById("loading-icon").style.display = "none";
    }
}

// Arama yapma fonksiyonu
function searchCity() {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        fetchWeather(city);
    }
}

// Arama butonuna tıklama işlemi
document.getElementById("search-btn").addEventListener("click", searchCity);

// Enter tuşuna basıldığında arama yapma
document.getElementById("city-input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchCity();
    }
});

// Sayfa yüklendiğinde
window.onload = function () {
    setBackground();
    showLoading(false); // Site yüklendiğinde sadece arama kısmı görünsün
};
