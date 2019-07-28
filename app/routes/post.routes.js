module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');

    // Create a new Post
    app.post('/posts', posts.create);

    // Retrieve all posts
    app.get('/posts', posts.findAll);

    // Retrieve a single posts with PostId
    app.get('/posts/:postId', posts.findOne);

    app.put('/upVote', posts.updateOne);


}