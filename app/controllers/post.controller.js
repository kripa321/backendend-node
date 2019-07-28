const Post = require('../models/post.model.js');

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    // Create a Post
    const post = new Post({
        title: req.body.title || "Untitled Post",
        content: req.body.content,
        upVote: req.body.upVote
    });

    // Save Post in the database
    post.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Post."
        });
    });
};


// Retrieve and return all posts from the database.
exports.findAll = (req, res) => {
    Post.find().then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });
};

// Find a single post with a noteId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId).then(Post => {
        if(!Post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send(Post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Post with id " + req.params.postId
        });
    });
};

exports.updateOne = (req, res) => {
    // Find post and increase it by one
    Post.updateOne({_id: req.body._id}, {$inc: {upVote: 1}}).then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body._id
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.body._id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.body._id
        });
    });

}