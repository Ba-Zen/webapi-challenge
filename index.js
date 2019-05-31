/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

const express = require('express');

const server = express();

const db = require('./data/helpers/actionModel.js');
const dbProj = require('./data/helpers/projectModel.js'); 

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h2>Hey homie</h2>')
})
//////////----Actions
server.get('/api/actions', (req, res) => {
    db.get()
    .then(allActions => {
        res.status(200).json(allActions)
    })
    .catch(err => {
        res.status(500).json({ err: 'error retrieving actions' })
    })
})

server.post('/api/actions', (req, res) => {
    const newAction = req.body;
    const { project_id } = req.body;

    db.insert(newAction)
    .then(action => {
        if(!project_id) {
            res.status(400).json({ message: 'the action with that id does not exist' });
        } else {
            res.status(201).json(action)
        }
    })
    .catch(err => {
        res.status(500).json({ err: 'error adding action' })
    })
})

server.put('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(updatedAction => {
        if(!id) {
            res.status(404).json({err: 'null'})
        } else {
            res.status(200).json(updatedAction);
        }
    })
    .catch(err => {
        res.status(500).json({ err: 'error updating action' })
    })
})

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(action => {
        res.status(204).json(action)
    })
    .catch(err => {
        res.status(500).json({ err: 'error removing action' })
    })
})

//////////----Projects



server.get('/api/projects', (req, res) => {

    dbProj.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ err: 'error retriving projects' });
    })
})

server.post('/api/projects', (req, res) => {
    const newProject = req.body;


    dbProj.insert(newProject)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({ err: 'error adding project' });
    })
})

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    dbProj.update(id, changes) 
    .then(updatedProject => {
        if(!id) {
            res.status(404).json({message: 'null'})
        } else {
            res.status(200).json(updatedProject);
        }
    })
    .catch(err => {
        res.status(500).json({ err: 'error updating project' })
    })
})

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    
    dbProj.remove(id)
    .then(project => {
        res.status(204).json(project)
    })
    .catch(err => {
        res.status(500).json({ err: 'error removing project' })
    })
})

server.get('/api/projects/:id/actions', (req, res) => {
    const { id } = req.params;
    
    dbProj.getProjectActions(id)
    .then(projectActions => {
        res.status(200).json(projectActions)
    })
    .catch(err => {
        res.status(500).json({ err: 'error retrieving project and actions' })
    })
})


server.listen(4000, () => {
    console.log('Server running on 4000')
})
