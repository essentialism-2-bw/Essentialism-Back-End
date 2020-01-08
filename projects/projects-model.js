const knex = require('knex');
const db = require('../database/dbConfig');

module.exports={
    getUserProjects,
    getProjectByID,
    addProject,
    updateProject,
    deleteProject,
}

function getUserProjects(user_id) {
    return db("projects")
        .select("id", "user_id", "project_title", "project_description", "user_values_id",
        knex.raw(`(case when projects.completed = 0 then 'false' else 'true' end) as completed`))
        .where({ user_id });
}

function getProjectByID(id) {
    return db("projects")
    .select("id", "user_id", "project_title", "project_description", "user_values_id",
    knex.raw(`(case when projects.completed = 0 then 'false' else 'true' end) as completed`))
        .where({ id })
        .first();
}

function addProject(project) {
    return db("projects")
    .insert(project, "id")
    .then(ids => {
        const [id] = ids;
        return getProjectByID(id);
    });
}

function updateProject(new_data, project_id) {
    return db("projects")
    .update(new_data)
    .where('id', '=', project_id)
    .then(count=>{
        return (count>0 ? getProjectByID(project_id) : null);
    });  
}

function deleteProject(id) {
    return db("projects")
    .where("id","=",id)
    .del()
    .then(count=>{
        return (count>0 ? id : null);
    }); 
}