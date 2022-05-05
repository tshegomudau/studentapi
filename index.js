const express = require("express");
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const routes = require('./server/routes/user');
const resultsRouter = require("./routes/resultsroute");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/results", resultsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});


app.use(express.static('public'));

app.engine('hbs',exphbs.engine({extname:'.hbs'}));
app.set('view engine', 'hbs');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Student Results API listening at http://localhost:${port}`);
});
