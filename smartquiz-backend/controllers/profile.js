const handleProfileFetch = (req, res, db) => {
    console.log("[API_LOG]: Profile to fetch: ", req.body);
    const { email } = req.body;
    let completeUserDetail = {};
    db.select('*').from('users').where({ email })
        .then(user => {
            if (user.length) {
                completeUserDetail = user[0];
                console.log(completeUserDetail)

                db.select('*').from('stats').where({ email })
                    .then(stats => {
                        const returningUser = Object.assign(
                            {
                                total_attempts: stats[0].total_attempts,
                                correct_attempts: stats[0].correct_attempts,
                                times_played: stats[0].times_played
                            },
                            completeUserDetail)

                        console.log("[PROFILE_API_RES]: ", returningUser)
                        res.json(returningUser)
                    })
            } else {
                res.status(404).json('User Not found')
            }
        })
        .catch(err => res.status(400).json('Error getting user'))
}

const updateStats = (req, res, db) => {
    const { email, correct, total } = req.body;
    console.log("[API_LOG]: Update Stats for user: ", req.body);

    db('stats').where('email', '=', email)
        // .select('total_attempts')
        .update({
            total_attempts: db.raw(`?? + ${total}`, ['total_attempts']),
            correct_attempts: db.raw(`?? + ${correct}`, ['correct_attempts'])
        })
        // .select('correct_attempts')
        // .update({
        //     correct_attempts: db.raw(`?? + ${correct}`, ['correct_attempts'])
        // })
        .increment('times_played')
        .returning('*')
        .then(stats => {
            console.log("[UPDATE_STATS_API_RES]: ", stats)
            res.json(stats[0])
        })
        .catch(err => console.log(err))
        // .catch(err => res.status(400).json("unabe to get stats"))
}

module.exports = {
    handleProfileFetch: handleProfileFetch,
    updateStats: updateStats
}