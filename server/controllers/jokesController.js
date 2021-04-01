module.exports = {
    getJokes: async (req, res) => {
        const db = req.app.get('db');
        
        // optional query
        if (req.query.search) {
            console.log('jokes query section hit');
            const filteredJokes = await db.jokes.search_jokes(req.query.search)

            res.status(200).send(filteredJokes);
        } else {
            const jokes = await db.jokes.get_all_jokes();

            res.status(200).send(jokes)
        }
    },
    addJoke: async (req, res) => {
        const db = req.app.get('db');
        const { silly_joke_user_id } = req.session.user;
        const { joke_text } = req.body;

        await db.jokes.add_joke(silly_joke_user_id, joke_text);

        res.sendStatus(200);
    },
    editJoke: async (req, res) => {
        const db = req.app.get('db');
        const { updated_joke } = req.body;
        const { joke_id} = req.params;

        await db.jokes.edit_joke(joke_id, updated_joke)

        res.sendStatus(200);
    },
    deleteJoke: async (req, res) => {
        const db = req.app.get('db');
        const { joke_id } = req.params;

        await db.jokes.delete_joke(joke_id)

        res.sendStatus(200);
    }
}