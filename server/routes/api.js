const express = require('express');

const app = express();

const Post = require("../models/post");

app.post('/api', (req, res) => {

    let body = req.body;

    let post = new Post({
        title: body.title,
        description: body.description,
        published_at: new Date(),
        content: body.content,
        image: body.image
    });

    post.save((err, postDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            post: postDB
        });

    });

});

app.get('/api', (req, res) => {

    res.json({ message: "wellcome to the API" });

});


app.get("/api/all", (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, "i");

    Post.find({ state: true })
        .exec((err, posts) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Post.count({ state: true }, (err, count) => {
                res.json({
                    ok: true,
                    posts,
                    count
                });
            });

        });
});

// =======================
// Search for post with regex
// =======================

app.get("/api/search/:termino", (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, "i");

    Post.find({ title: regex, state: true })
        .exec((err, posts) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            Post.count({ title: regex, state: true }, (err, count) => {
                res.json({
                    ok: true,
                    posts,
                    count
                });
            });

        });
});

//Like
app.put("/api/like/:id", (req, res) => {

    let id = req.params.id;
    let likes_aux;

    Post.findById(id, (err, postDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!postDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: "Post not find"
                }
            });
        }

        let new_likes = postDB.likes + 1;

        likes_aux = {
            likes: new_likes
        };


        Post.findByIdAndUpdate(id, likes_aux, { new: true }, (err, postDB2) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            // console.log(likes_aux.likes);
            res.json({
                ok: true,
                post: postDB2
            });

        });


    });

});

app.delete("/api/:id", (req, res) => {
    let id = req.params.id;

    let changeState = {
        state: false
    };

    Post.findByIdAndUpdate(id, changeState, { new: true, runValidators: true }, (err, postDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            post: postDB
        });
    });

});

module.exports = app;