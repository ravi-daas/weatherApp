const fetchData = require("node-fetch");

const express = require("express");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index", { isCityFound: false });
});
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    try {
        const weatherData = await getWeatherData(city);

        console.log(weatherData.cod);
        console.log(typeof weatherData.cod);


        res.render("index", {
            weather: weatherData,
            isCityFound: weatherData.cod === 200
        });
    } catch (error) {
        res.status(500).send("Error fetching weather data.");
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Weather app is running on port ${PORT}`);
});

// Function to fetch weather data
async function getWeatherData(city) {
    const apiKey = "ae1f65ffc9d1de2b908b94131f7f9c30";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
    try {
        const response = await fetchData(weatherURL);
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.log("Error fetching weather data:", error);
        throw error;
    }
}
// // Example usage
// getWeatherData("Mumbai")
//     .then((data) => {
//         console.log(data); // Display the weather data for Mumbai
//     })
//     .catch((error) => {
//         console.error(error);
//     });