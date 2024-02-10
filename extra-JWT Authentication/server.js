const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const fs = require("fs");

require("dotenv").config();
const PORT = process.env.PORT || 5052;

//middleware

app.use(express.json());
let users = [{}];

try {
  const userData = fs.readFileSync("users.json");
  users = JSON.parse(userData);
} catch (error) {
  console.error("error reading user file", error);
}

// app.get('/posts', (req, res)=>{
//     res.json(posts)
// })

app.get("/users", (req, res) => {
  res.json(users);
  //authenticate user here
});



// Creating a user
// need to use bcrypt to has the password to secure the database, bcrypt adds
//salt to the hash so that if
//two users havet he same password, they don't look the same when hashed- added extrra security
//bcrypt is asynchronous
app.post("/users", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    //dont need line 36- its already included in bcrypt, instead pass in the numberof rounds you want, standard is 10

    // const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // removed salt variable and added numberof rounds

    // console.log("hashed", hashedPassword);
    const newUser = { name: req.body.name, password: hashedPassword };

    users.push(newUser);
    // writing to json file
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send({ message: "error at writing user data to json file" });
        return;
      }
      console.log("user data succesfully written to json");
      res.status(201).send("sucess");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "error at posting new user" });
  }
});


app.post('/users/login', async (req, res)=> {
    const user = users.find(user=> user.name =req.body.name)
    if (user == null){
        return res.status(400).send("User not found")
    }
try{
    if (await bcrypt.compare(req.body.password, user.password)){
        res.send("success");
    } else {
        res.send("Not Allowed");
    }
}
catch (err){
    console.error("error at users/login", err)
    res.send(500).send();
}
})
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
