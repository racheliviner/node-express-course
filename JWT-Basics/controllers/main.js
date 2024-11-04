const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password){
        return res.status(400).send('Must provide username and password!')
    }
    console.log('username:', username, 'password:', password);

    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})

    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({
        msg: `Hi ${req.user.username}`,
        secret: `you'r lucky number is ${luckyNumber}`
    })
}

module.exports = {
    login,
    dashboard
}