const express = require("express");

const server = express();
server.use(express.json());

let numberOfRequests = 0;
const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(params => params.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Número de requisições: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(params => params.id == id);

  return res.json(project);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    task: []
  };

  projects.push(project);

  return res.json(project);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(params => params.id == id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(params => params.id == id);

  projects.splice(index, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(params => params.id == id);

  project.task.push(title);

  return res.json(project);
});

server.listen(3000);
