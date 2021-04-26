
const express = require('express')
const app = express() 
const jwt = require('jsonwebtoken')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const users = [{
    username: 'johndoe', 
    password: 'password'
}]

const accounts = [
    {name: 'Checking', balance: 5000, username: 'johndoe'}, 
    {name: 'Saving', balance: 10000, username: 'johndoe'}
]

app.post('/login', (req, res) => {

    const username = req.body.username 
    const password = req.body.password 

    const authUser = users.find((user) => user.username == username && user.password == password)
    if(authUser) {
        // generate a token 
        // DO NOT PUT SENSITIVE DATA INTO THE TOKEN 
        const token = jwt.sign({ username: username }, 'SOMETHINGSECRET')
        res.json({success: true, token: token, username: username})
    } else {
        res.json({success: false})
    }

})

app.get('/profile', (req, res) => {
    res.send('PROFILE')
})

app.get('/accounts/:username', (req, res) => {

    let headers = req.headers['authorization']
    if(headers) {
        const token = headers.split(' ')[1]
        const decoded = jwt.verify(token, 'SOMETHINGSECRET')
        if(decoded) {
            const username = decoded.username 
            const authUser = users.find(user => user.username == username)
            if(authUser) {
                const userAccounts = accounts.filter(account => account.username == username)
                res.json(userAccounts)
            } else {
                res.json({error: 'Unable to authenticate'})
            }
        } else {
            res.json({error: 'Unable to authenticate'})
        }
    } else {
        res.json({error: 'Required headers are missing...'})
    }  
})

// ACTIVITY 1 
app.get('/token', (req, res) => {

    const token = jwt.sign({username: 'johndoe'}, 'SECRET')
    res.json({token: token})

})

app.listen(8080, () => {
    console.log('Server is running...')
})