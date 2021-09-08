const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const fs = require("fs").promises;

const app = express();
const port = 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

async function writeTodoData(todoData) {
  console.log(todoData);

  const dataToString = JSON.stringify(todoData);
  await fs.writeFile("./public/data/todos.json", dataToString, "utf-8");
}

// Write route
app.use("/write-todos", async (req, res) => {
  try {
    const fileContent = req.body;
    writeTodoData(fileContent);
    return res.status(200).send({ message: "File written successfully!" });
  } catch (err) {
    throw new Error(`Could not write file because of {err}`);
  }
});

// Not-found route
app.use((req, res, next) => {
  res
    .status(404)
    .send({ message: "Could not find the specified route you requested!" });
});

app.listen(port, () =>
  console.log(
    `Server up and running and listening for incoming requests on port ${port}!`
  )
);
