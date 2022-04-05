// add code in here to create an API with ExpressJS
const express = require("express");
const garments = require("./garments.json");

const app = express();

app.use(express.static("public"));


app.get("/api/garments", function (req, res) {
  const gender = req.query.gender;
  const season = req.query.season;

  const filteredGarments = garments.filter((garment) => {
    if (gender != "All" && season != "All") {
      return garment.gender === gender && garment.season === season;
    } else if (gender != "All") {
      return garment.gender === gender;
    } else if (season != "All") {
      return garment.season === season;
    }
    return true;
  });
  res.json({
    garments: filteredGarments,
  });
});

app.get('/api/garments/price/:price', function(req, res){
  const maxPrice = Number(req.params.price);
  const filteredGarments = garments.filter( garment => {
      if (maxPrice > 0) {
          return garment.price <= maxPrice;
      }
      return true;
  });

  res.json({ 
      garments : filteredGarments
  });
});

const PORT = process.env.PORT || 4017;
app.listen(PORT, function () {
  console.log(`App started at port: ${PORT}`);
});
