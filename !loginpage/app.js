import express from 'express';
import cors from 'cors';
import * as db from './data/database.js';
import bcrypt from 'bcrypt';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/users', (req, res) => {
    const users = db.getUsers();
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = db.getUserById(+req.params.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
});

app.post('/register', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email or password is missing' });
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    const savedUser = db.saveUser(email, hashedPassword);
    res.status(201).json({ message: 'Registration successful', userId: savedUser.id });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email or password is missing' });
    }

    const user = db.getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
});

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
