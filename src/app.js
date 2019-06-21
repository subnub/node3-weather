const express = require("express");
const path = require("path")
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


// Define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const particalsPatt = path.join(__dirname, "../templates/partials")

// Setup handlebars engine, and views locaion 
app.set("view engine","hbs");
app.set("views", viewPath)
hbs.registerPartials(particalsPatt)

// Setup staic directory to serve
app.use(express.static(publicPath))


app.get("", (req, res) => {

    res.render("index", {
        title: "weather app",
        name: "kyle"
    })
    
})

app.get("/about", (req, res) => {

    res.render("about", {

        title: "created by kyle",
        name: "dog"
    })
})

app.get("/help", (req, res) => {

    res.render("help", {

        title: "help title",
        name: "cat"
    })
})

app.get("/weather", (req, res) => {


    if (!req.query.address) {

        res.send({
            error: "You Must Provide An Address",
        })
        return;
    }

    geocode(req.query.address, (error,{lat, long, location} = {}) => {

        if (error) {
            res.send({
                error: "Invalid Address",
            })
            return;

        }

        forecast(long, lat, (error, forecastData) => {

            if (error) {
                res.send({
                    error: "Invalid Address",
                })
                return;
    
            }

            res.send({
                location: location, 
                forecast: forecastData,
                address: req.query.address,
            });

            
        })
        
        
    });


    
})

app.get("/help/*", (req, res) => {

    res.render("404page", {
        name: "kyle",
        artical: "help actical"
    })
})

app.get("*", (req, res) => {

    res.render("404page", {
        name: "kyle",
        artical: "page",
    })
})

// Starts server
app.listen(3000,() => {

    console.log("Server Started");
});
