import express from "express";

const app = express();

app.use(express.json());

interface ToDo {
  id: number;
  name: string;
  completed: boolean;
}

type PostControl = Pick<ToDo, "name" | "completed">;

const validateInput: express.RequestHandler = (req, res, next) => {
  const toDoData: PostControl = req.body;
  if (!toDoData.name) {
    return res.status(403).send({ error: "name field is required" });
  }

  next();
};

let toDos: ToDo[] = [
  {
    id: 0,
    name: "ciao",
    completed: false,
  },
];

app.post("/todos", validateInput, (req, res) => {
  const toDoData: PostControl = req.body;
  const lastToDoIdx = toDos[toDos.length - 1];
  const newToDo: ToDo = {
    id: lastToDoIdx ? lastToDoIdx.id + 1 : 0,
    name: toDoData.name,
    completed: false,
  };
  toDos.push(newToDo);
  return res.status(201).send(newToDo);
});
app.post("/todos/:id/complete", (req, res) => {
  const id = Number(req.params.id);
  const todoIdx = toDos.findIndex((todo) => todo.id == id);
  toDos[todoIdx] = {
    ...toDos[todoIdx],
    completed: true,
  };
  return res.status(201).send(toDos[todoIdx]);
});

app.get("/todos", (req, res) => {
  if (req.query.completed) {
    return res.send(toDos);
  }

  const onlyFalse = toDos.filter((toDo) => !toDo.completed);

  return res.status(201).send(onlyFalse);
});

app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = toDos.find((todo) => todo.id == id);
  if (!todo) {
    return res.status(404).send({ msg: "not found" });
  }

  return res.status(201).send(todo);
});

app.get("/todos:completed", (req, res) => {
  const complete = Boolean(req.query.completed);

  if (complete == true) {
    return res.status(201).send(toDos);
  }
  const onlyFalse = toDos.filter((toDo) => toDo.completed == false);
  console.log(onlyFalse);
  return res.status(201).send(onlyFalse);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Started ad http://localhost:3000`);
});
