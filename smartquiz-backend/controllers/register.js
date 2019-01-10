


const handleRegister = (req, res, db, bcrypt) => {
    console.log("[API_LOG]: User registering with: ", req.body);
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json("Incomplete registration details")
    }

    const hash = bcrypt.hashSync(password)

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined_at: new Date()
                    })
                    .then(user => {
                        console.log("[REGISTER_API_RES]: ", user[0])
                        res.json(user[0])
                    })
            })

            .then(trx.commit)
            .catch(trx.rollback)
    })


        .catch(err => {
            res.status(400).json('unable to register');
        })
}



module.exports = {
    handleRegister: handleRegister
}