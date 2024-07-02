const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.set("view engine", "ejs");  // Fix the typo
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "pooja",
        content: "Got my 1st internship!",
    },
    {
        id: uuidv4(),
        username: "shradhakhapra",
        content: "A good teacher",
    },
    {
        id: uuidv4(),
        username: "amandhatarwal",
        content: "a good mentor",
    },
];

app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.send("Post updated successfully");
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});