


const handleRegister = (req, res, db, bcrypt) => {
    console.log("[API_LOG]: User registering with: ", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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
                console.log(loginEmail)
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined_at: new Date()
                    })
                    .then(user => {
                        console.log(user[0])
                        return trx('stats')
                            .returning('*')
                            .insert({
                                email: user[0].email,
                                total_attempts: 0,
                                correct_attempts: 0,
                                times_played: 0
                            })
                            .then(stat => {
                                console.log("[REGISTER_API_RES]: ", stat[0])
                                res.json(user[0])
                            })
                    })
            })

            .then(trx.commit)
            .catch(trx.rollback)
    })


        .catch(err => {
            console.log(err);
            // res.status(400).json('unable to register');
        })
}



module.exports = {
    handleRegister: handleRegister
}