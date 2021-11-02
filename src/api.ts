import express from "express";

const app = express();

app.use(express.json());

// CRUD - Create Read Update Delete

interface BlogPost {
  title: string;
  date: Date;
  body: string;
  id: number;
  draft: boolean;
}

const posts: BlogPost[] = [
  {
    id: 0,
    title: "first post",
    date: new Date(),
    body: "This is the first post",
    draft: false,
  },
  {
    id: 1,
    title: "second post",
    date: new Date(),
    body: "This is the second post",
    draft: false,
  },
];

app.get("/posts/", (req, res) => {
  res.send(posts);
});

app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id == id);
  res.send(post);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Started ad http://localhost:3000`);
});
