const express = require('express');

const server = express();

server.use(express.json());

server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

const projects = [];

server.post('/projects', (req, res) => {
    const project = req.body;
    project.tasks = [];
    projects.push(project);

    return res.json(projects);
})

server.get('/projects', (req, res) => {
    return res.json(projects);
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
