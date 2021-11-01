import express from "express";

const app = express();

let cnt = 0;

app.get("/", (req, res) => {
  cnt += 1;

  console.log(req.url);
  console.log(req.headers);
  return res.send(`
  <h1> Ciao Mondo </h1>  
  <p>Questo è il mio primo server</p>
  <p> Numero di accessi : ${cnt} </p>
  `);
});

app.get("/greeting/:name", (req, res) => {
  console.log(req.params);
  const name: string = req.params.name;
  return res.send(
    `<h1> Greeting ${name}</h1> <p> Questa è un altra pagina </p>`
  );
});

app.get("/ciao", (req, res) => {
  return res.send("<h1> Ciao </h1> <p> Questa è un altra pagina </p>");
});

app.get("*", (req, res) => {
  return res
    .status(404)
    .send(
      "<h1> Hai rotto il server... 404 </h1>  <p>Questo è il mio primo server</p>"
    );
});

app.listen(3000, () => {
  console.log("Server started ad http://localhost:3000");
});
