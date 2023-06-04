const express = require('express');

const app = express();
const port = 3000;

// Custom CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let {userData} = require('./userData')

// Routes

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
//filter users by location
app.get('/users',(req,res)=>{
  let city= req.query.city;
  let usersByLocation = []
  let cityArr = [];
  if(city){
     cityArr= city.split(",");
     for (const user of userData) {
       if (cityArr.find((city) => city === user.address.city)) {
         usersByLocation.push(user);
       }
     }
  }
  if (usersByLocation.length > 0) {
    res.send(usersByLocation);
  } else {
    res.status(400).send("User not found");
  }
})
//sending usersData
app.get('/users',(req,res)=>{
  res.send(userData);
})
//sending user data by id
app.get('/users/:id',(req,res)=>{
  let id = +req.params.id;
  let user = userData.find((user)=>user.id === id)
  // Start the server
  if(user){
  res.send(user)
  }else{
    res.status(400).send("User Not Found")
  }
})
app.get('/users/:id/address',(req,res)=>{
  let id = +req.params.id;
  let user = userData.find((res) => res.id === id)
  if(user){
    (user.address) ? res.send(user.address) : res.send("Data not available")
  }else{
    res.send(400).send("User Not Found")
  }
})
//get user by userName
app.get('/users/:username',(req,res)=>{
  let username = +req.params.username;
  let user = userData.find((res) => res.username === username)
  console.log(user)
  if(user){
    res.send(user)
  }else{
    res.send(400).send("User Not Found")
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
