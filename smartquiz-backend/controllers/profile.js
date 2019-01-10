const handleProfileFetch = (req, res, db) => {
    console.log("[API_LOG]: Profile to fetch: ", req.body);
    const { id } = req.params;
    let found = false
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                console.log("[PROFILE_API_RES]: ",user[0])
                res.json(user[0])
            } else {
                res.status(404).json('User Not found')
            }
        })
        .catch(err => res.status(400).json('Error getting user'))
}

const incrementImageCount = (req, res, db) => {
    const { id } = req.body;
    console.log("[API_LOG]: Increment count for user: ", req.body);

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            console.log("[IMAGE_COUNT_API_RES]: ", entries[0])
            res.json(entries[0])
        })
        .catch(err => res.status(400).json("unabe to get entries"))
}

module.exports = {
    handleProfileFetch : handleProfileFetch,
    incrementImageCount: incrementImageCount
}