require('dotenv').config();
const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.API_KEY;


app.get('/', async (req, res) => {
    const movies = 'https://api.hubspot.com/crm/v3/objects/movies?properties=name&properties=imdb&properties=released_year&properties=category';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(movies, { headers });
        const data = resp.data.results;
        console.log(resp.data.results[0].properties.name);
        res.render('home-page', { title: 'Home' , data });
    } catch (error) {
        console.error(error);
    }
});

app.get("/update-cobj", function (req, res) {
  res.render("updates", {
    title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
  });
});

app.post("/update-cobj", function (req, res) {
  res.send("Send the data");
});

// * Localhost
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
