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

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.find(p => p.id == id).title = title;

    return res.json(projects);
})

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    projects.splice(id, 1);

    return res.json({ message: `Project ${id} was deleted!` });
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
