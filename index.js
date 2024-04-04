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
        res.render('home-page', { title: 'Home' , data });
    } catch (error) {
        console.error(error);
    }
});

app.get("/update-cobj", async function (req, res) {
    const id = req.query.hsobject;
    const movies = `https://api.hubapi.com/crm/v3/objects/movies/${id}?properties=name&properties=imdb&properties=released_year&properties=category`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(movies, { headers });
        const data = response.data;
        res.render("updates", {
            title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
            data
        });
        
    } catch(err) {
        console.error(err);
    }
});

app.post("/update-cobj", function (req, res) {
  res.send("Send the data");
});

// * Localhost
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
