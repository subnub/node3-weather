const express = require("express");
const path = require("path")
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;

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
        title: "Weather App",
        name: "Kyle Hoell"
    })
    
})

app.get("/about", (req, res) => {

    res.render("about", {

        title: "About",
        name: "Kyle Hoell"
    })
})

app.get("/help", (req, res) => {

    res.render("Help", {

        title: "help title",
        name: "Kyle Hoell"
    })
})

app.get("/weather", (req, res) => {

    console.log("Sending Weather...");

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
        name: "Kyle Hoell",
        artical: "help actical"
    })
})

app.get("*", (req, res) => {

    res.render("404page", {
        name: "Kyle Hoell",
        artical: "page",
    })
})

// Starts server
//192.168.1.122
app.listen(port,() => {

    console.log("Server Started");
});
