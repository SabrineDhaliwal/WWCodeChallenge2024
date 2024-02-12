const express = require('express');
const app = express();
const PORT = 4300;
const jwt = require('jsonwebtoken');
require('dotenv').config();


app.use(express.json())

let refreshTokens = []

// no longer needed, this server will only be for logins 


// app.get('/post',authenticateToken, (req, res)=> {
// res.json(posts.filter(post=> post.username ===req.user.name))

// })

app.post('/token', (req, res)=> {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    //checking to see if the refresh token matches the exsisting refresh token, if not send 403
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })

})

app.delete('/logout', (req, res)=> {
    refreshTokens = refreshTokens.filter(token=> token !== req.body.token)
    res.sendStatus(204)
})
app.post('/login', (req,res)=> {
    //changed from get to post -> now can follow previous tutotial for authentication
    //authentication
    const username = req.body.username;
    const user = {name: username}

   const accessToken = generateAccessToken(user);
   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
   refreshTokens.push(refreshToken)
   res.json({accessToken: accessToken, refreshToken: refreshToken})

})


// authenticating Token is not require on auth server, we will create a generate Access function below
// function authenticateToken(req, res, next){
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     // do a check to see if the token matches other return not found 
//     if(token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user)=> {
//         if (err) return res.sendStatus(403);
//         req.user=user
//         next()
//         //once the autenticatioToken function runs and validate the token, go back to .get('/post)
//     })
// }


function generateAccessToken(user){ 
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
}
app.listen(PORT, ()=> {
    console.log(`auth Server running on port ${PORT}`)
})
