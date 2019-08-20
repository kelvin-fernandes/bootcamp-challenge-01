const express = require('express');

const server = express();

server.use(express.json());

server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

function projectExists(req, res, next) {
    const { id } = req.params;

    const project = projects.find(p => p.id === id);

    if (!project)
        return res.status(400).json({ error: `Project doesn't exist` });

    next();
}

let projects = [];

server.post('/projects', (req, res) => {
    const project = req.body;
    project.tasks = [];
    projects.push(project);

    return res.json(projects);
})

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.put('/projects/:id', projectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.find(p => p.id === id).title = title;

    return res.json(projects);
})

server.delete('/projects/:id', projectExists, (req, res) => {
    const { id } = req.params;

    projects = projects.filter(p => p.id !== id)

    return res.json({ message: `Project ${id} was deleted!` });
})

server.post('/projects/:id/tasks', projectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.find(p => p.id === id).tasks.push(title)

    return res.json(projects);
})

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});
