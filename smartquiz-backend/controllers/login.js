const handleLogin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json("Incomplete login details")
    }
    console.log("[API_LOG]: ", req.body)
    db.select('email', 'hash').from('login')
    .where({
        'email': email
    })
    .then(data => {
        console.log(data);
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            // First increment the users entries
            db.select('*').from('users')
            .where('email', '=', email)          
            .increment('login_count', 1)
            .returning('email')
            .then(email => {
                //Now return the user details
                console.log(email);
                db.select('*').from('users')
                .where('email', '=', email[0]) 
                .then(user => {
                    console.log("[LOGIN_API_RES]: ",user)
                    res.json(user[0])
                })
            })
            .catch(err => {
                console.log("[LOGIN_ERR]: ", err)
                res.status(400).json('unable to get user')
            })
        }else{
            res.status(400).json('wrong password')
        }
    })
    .catch(err => {
        console.log("[LOGIN_ERR]: ", err)
        res.status(400).json('Incorrect Credentials')
    })
}

module.exports = {
    handleLogin: handleLogin
}