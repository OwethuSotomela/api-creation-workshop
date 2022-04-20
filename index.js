// add code in here to create an API with ExpressJS
const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();

const garments = require("./garments.json");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/api/garments", (req, res) => {
  const { description, img, gender, season, price } = req.body;
  if (!description || !img || !price) {
    res.json({
      status: "error",
      message: "Required data not supplied",
    });
  } else {
    garments.push({
      description,
      img,
      gender,
      season,
      price,
    });
    res.json({
      status: "success",
      message: "New garment added.",
    });
  }
});

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

app.get("/api/garments/price/:price", function (req, res) {
  const maxPrice = Number(req.params.price);
  const filteredGarments = garments.filter((garment) => {
    if (maxPrice > 0) {
      return garment.price <= maxPrice;
    }
    return true;
  });
  res.json({
    garments: filteredGarments,
  });
});

// Start here 

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API..!"
  })
})

// app.post("/api/login", async (req, res) => {

//   var { username } = req.body;
//   console.log(username)
//   var userExists = false;

//   await axios
//     .get(``)
//     .then(function (result) {
//       let data = result.data;
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].username.toLowerCase() == username.toLowerCase()) {
//           userExists = true;
//           break;
//         }
//       }
//     });

//   if (userExists) {
//     jwt.sign({ username }, "secretkey", { expiresIn: '5m' }, (err, key) => {
//       res.json({
//         key,
//       });
//     });
//   } else {
//     res.sendStatus(403);
//   }
// });

var headers = {
  email: "owethusotomela@gmail.com",
  password: "password"
};

let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

axios.post('http://<host>:<port>/<path>', headers, axiosConfig)
.then((res) => {
  console.log("RESPONSE RECEIVED: ", res);
})
.catch((err) => {
  console.log("AXIOS ERROR: ", err);
})

app.get("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.key, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        post: "Post created...",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.key = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

console.log("Hi Oz!")

const PORT = process.env.PORT || 4017;
app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});
