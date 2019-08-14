const User = require('../models/register.model.js');


exports.create = (req, res) => {
    console.log('===================', req.body)
    // Validate request
    if (!req.body.email && !req.body.password) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Create a user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    // Save user in the database
    user.save().then(data => {
        res.send(data);
}).catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
    });
});
}

exports.login =  (req, res) => {
    User.find({email: req.body.email, password: req.body.password}).exec(function (err, result) {
        if (err) {
            res.status(400).jsonp({message: "incorrect username or password"})
        } else {
            if (result && result.length) {
                console.log(result);
                res.status(200).jsonp({message: "Login Successfully done!"});
            } else {
                res.status(400).jsonp({message: "Login failed!"});
            }
        }
    })
};

// Retrieve and return all posts from the database.
exports.findAll = (req, res) => {
    User.find().then(users => {
        res.send(users);
}).catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
    });
});
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
        if(!user) {
        return res.status(404).send({
            message: "user not found with id " + req.params.userId
        });
    }
    res.send({message: "user deleted successfully!"});
}).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.userId
        });
    }
    return res.status(500).send({
        message: "Could not delete note with id " + req.params.userId
    });
});
};


// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        firstName: req.body.firstName || "Untitled Note",
        lastName: req.body.lastName,
        email: req.body.email
    }, {new: true})
        .then(user => {
        if(!user) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.userId
        });
    }
    res.send(user);
}).catch(err => {
        if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "user not found with id " + req.params.userId
        });
    }
    return res.status(500).send({
        message: "Error updating user with id " + req.params.userId
    });
});
};
