const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body;

        const [ existingUser ] = await db.auth.get_user_by_email(email);
        
        if (existingUser) {
            return res.status(409).send('User already exists')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const [ newUser ] = await db.auth.register_user(email, hash);
        delete newUser.hash;

        req.session.user = newUser;

        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const { email, password } = req.body;

        const [ existingUser ] = await db.auth.get_user_by_email(email);

        if (!existingUser) {
            return res.status(404).send('User does not exist');
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);

        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password')
        }

        delete existingUser.hash

        req.session.user = existingUser;

        res.status(200).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getSession: (req, res) => {

    }
}