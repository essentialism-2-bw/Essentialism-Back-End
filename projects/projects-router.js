const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Proj = require('./projects-model.js');
const dbUsrVals =  require('../user_values/user_values-model.js');

const {hashRounds,jwtSecret} = require('../constants');

const {validTokenAndUserCheck, validBodyCheck} = require('./projects-middleware');

// Middleware

// CRUD

router.get('/:id', validTokenAndUserCheck, (req, res) => {
    const user_id = req.params.id;
    Proj.getUserProjects(user_id)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error getting the list of projects.", error:error });
        });
});

router.post('/:id', validTokenAndUserCheck, 
    validBodyCheck(["user_id","project_title","project_description","user_values_id"]),
    (req, res) => {
    let project = req.body;
    
    // check whether the logged in user is adding a project to his own account
    if(project.user_id === Number(req.params.id)) {
        dbUsrVals.getUserValue(project.user_values_id)
        .then(user_value => {
            // check whether the provided user_value_id belongs to logged in user
            if(user_value.user_id === project.user_id) {
                Proj.addProject(project)
                .then(new_project => {
                res.status(201).json(new_project);
                })
                .catch(error => {
                    res.status(500).json({ message: "error adding project", error: error });
                });
            } else {
                res.status(401).json({ message: "user_values_id does not belong to user." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "error finding user_values_id", error: error });
        });
        
    } else {
        res.status(401).json({ message: "URL id does not match user_id of new project." });
    }
});

router.put('/:id/:project_id', validTokenAndUserCheck, 
    validBodyCheck(["user_id","project_title","project_description","user_values_id"]),
    (req, res) => {
    let newProjData = req.body;
    
    // check whether the logged in user is editing a project in his own account
    if(newProjData.user_id === Number(req.params.id)) {
        Proj.getProjectByID(req.params.project_id)
        .then(project => {
            // check whether the provided project id belongs to logged in user
            if(project.user_id === newProjData.user_id) {
                Proj.updateProject(newProjData, Number(req.params.project_id))
                .then(updated_project => {
                    res.status(201).json(updated_project);
                })
                .catch(error => {
                    res.status(500).json({ message: "error updating project", error: error });
                });
            } else {
                res.status(401).json({ message: "URL project id does not belong to user." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "error finding project", error: error });
        });
        
    } else {
        res.status(401).json({ message: "URL id does not match user_id of updated project." });
    }
});

router.delete('/:id/:project_id', validTokenAndUserCheck, 
    (req, res) => {
    
    Proj.getProjectByID(req.params.project_id)
    .then(project => {
        // check whether the provided project id belongs to logged in user
        if(project.user_id === Number(req.params.id)) {
            Proj.deleteProject(Number(req.params.project_id))
                .then(id => {
                    res.status(201).json({id: id});
                })
                .catch(error => {
                    res.status(500).json({ message: "error deleting project", error: error });
                });
        } else {
            res.status(401).json({ message: "URL project id does not belong to user." });
        }
    })
});

module.exports = router;
