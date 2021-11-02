import express from "express";
const app = express();

app.get("/sum/:n1/:n2", (req, res) => {
  console.log(req.params);
  const n1: string = req.params.n1;
  const n2: string = req.params.n2;

  return res.send(
    `<h1> La somma tra ${n1} ${n2} è ${
      parseInt(n1) + parseInt(n2)
    }</h1> <p> Somma </p>`
  );
});

app.get("/dif/:n1/:n2", (req, res) => {
  console.log(req.params);
  const n1: string = req.params.n1;
  const n2: string = req.params.n2;

  return res.send(
    `<h1> La differenza tra ${n1} ${n2} è ${
      parseInt(n1) - parseInt(n2)
    }</h1> <p> Somma </p>`
  );
});

app.get("/status", (req, res) => {
  console.log(req.query.nums);
  const nums: number[] = (req.query.nums as string[]).map((n) => {
    return Number(n);
  });
  let somma: number = 0;

  for (let n of nums) {
    somma += n;
  }

  const diff: number = somma / nums.length;

  return res.send(`<p> La somma è ${somma} e la media è di ${diff}`);
});

app.listen(3000, () => {
  console.log("started at http://localhors:3000");
});
