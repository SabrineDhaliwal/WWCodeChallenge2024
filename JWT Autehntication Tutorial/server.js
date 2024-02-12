const express = require('express');
const app = express();
const PORT = 3300;
const jwt = require('jsonwebtoken');
require('dotenv').config();


app.use(express.json())

const posts = [
    {
        username: 'Sabrine',
        title: "post 1"
    },
    {
        username: 'Ellie',
        title: "post 2"
    }

]

app.get('/post',authenticateToken, (req, res)=> {
res.json(posts.filter(post=> post.username ===req.user.name))

})

// No longer needed since we moved it to the authServer
// app.post('/login', (req,res)=> {
//     //changed from get to post -> now can follow previous tutotial for authentication
//     //authentication
//     const username = req.body.username;
//     const user = {name: username}

//    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//    res.json({accessToken: accessToken})

// })

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // do a check to see if the token matches other return not found 
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user)=> {
        if (err) return res.sendStatus(403);
        req.user=user
        next()
        //one the autenticatioToken function runds and validate the token, go back to .get('/post)
    })
}
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})
