// Install EJS, Express, and MongoDB in Terminal

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.static(__dirname + "/public"))

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.set("view engine", "ejs");

app.use(express.json());

const countrySchema = new mongoose.Schema({
  country: { type: String },
  flagURL: { type: String },
  population: { type: Number },
  officialLanguage: { type: String },
  hasNuclearWeapons: { type: Boolean },
});

const Country = mongoose.model("Country", countrySchema, "Countries");

// Create a POST route for "/add/country" that adds a country using the request body (3 points)
// Use postman to add at least THREE different countries

app.post("/add/country", async (req,res)=>{
  const addCountry = await new Country({
  country: req.body.country,
  flagURL: req.body.flagURL,
  population: req.body.population,
  officialLanguage: req.body.officialLanguage,
  hasNuclearWeapons: req.body.hasNuclearWeapons,
    }).save()
    res.json(addCountry)
})

// Create a GET route for "/" that renders countries.ejs with every country from the Countries collection (1 point)

app.get("/", async (req,res)=>{
  const data = await Country.find({})
  res.render("countries.ejs", {data})
})

// Go to countries.ejs and follow the tasks there (2 points)


// Create a dynamic PATCH route handler for "/update/{name}" that modifies the population of the country specified in the path (3 points)
// Test this route on post man

app.patch("/update/:name", async (req,res)=>{
  const updatedCountry = await Country.findOneAndUpdate({name: req.params.name}, {population: req.body.population}).save()
    res.json(updatedCountry)
})

//  CODE TUTOR: https://chatgpt.com/share/6807e323-33e4-8001-aeb0-a049a33f9ea8

// Create a DELETE route handler for "/delete/country" that deletes a country of your choice (3 points)
// Test this route on post man

app.delete("/delete/country/:name", async (req,res)=>{
  const countryDelete = await Country.findOneAndDelete({name: req.params.id})
  res.json(countryDelete)
})

async function startServer() {
  
    // add your SRV string with a database called countries
  await mongoose.connect("mongodb+srv://CSH:SE12@cluster0.yz0lk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

  app.listen(3000, () => {
    console.log("Server is running");
  });
}

startServer();
