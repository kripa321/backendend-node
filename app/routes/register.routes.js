module.exports = (app) => {
    const users = require('../controllers/register.controller.js');

    // Create a new user
    app.post('/register', users.create);

    app.post('/login', users.login);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Delete a user with userId
    app.delete('/user/:userId', users.delete);

    app.put('/user/:userId', users.update);




}