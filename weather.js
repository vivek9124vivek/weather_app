const express = require('express');
const https = require('https');
const bodyParser=require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {

    res.sendFile(__dirname+"/weather.html");

})

app.post("/",function(req,res){

    
    
    const query=req.body.cityName;
    const apiKey="b229c19c0f898267e77990ff252ec772"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric"
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            //JSON.parse hexadecimal data ko JSON format main convert karke deta hai.
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weaterDescription = weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            //ab app.get request ka res send karenge client ke liye
            
            // res.write("The weather is currently "+weaterDescription);
            res.write("<h1> The weather is curently  "+weaterDescription+" in "+query+"</h1>");
            res.write("<p> The temperature in "+query+" is "+temp+" degree Celcius.</p>");
            res.write("<img src="+imageURL+">");
            res.write("<p>Made by TOP COMMANDER</p>");
            res.send();
        })
    });
})




app.listen(process.env.PORT||3000, function () {
    console.log("Server is listening on port 3000");
})
