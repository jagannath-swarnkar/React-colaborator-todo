module.exports = (db, Op, project, jwt, checkToken) => {
  project.post("/project", checkToken, (req, res) => {
    db.projects
      .create({
        user_id: req.tokenData.id,
        project_name: req.body.project,
        description: req.body.description,
        user_name: req.tokenData.username,
        user_email: req.tokenData.email,
        project_date: new Date()
      })
      .then(card => {
        Promise.all([
          db.todos.findAll({
            raw: true,
            attributes: ["project_id"],
            where: {
              assigned_to: req.tokenData.email
            }
          }),
          db.projects.findAll({
            raw: true,
            where: {
              user_id: req.tokenData.id
            }
          })
        ])
          .then(data => {
            if (data[0].length > 0) {
              console.log("this project has some assigned todos");
              db.projects
                .findAll({
                  raw: true,
                  where: {
                    [Op.or]: [
                      { user_id: req.tokenData.id },
                      { project_id: data[0][0].project_id }
                    ]
                  }
                })
                .then(result => {
                  console.log(result);
                  res.json(result);
                });
            } else {
              console.log("this todo hasn't any assigned todo");
              res.json(data[1]);
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log("error in inserting new project into db", err));
  });

  project.post("/getProject", checkToken, (req, res) => {
    Promise.all([
      db.todos.findAll({
        raw: true,
        attributes: ["project_id"],
        where: {
          assigned_to: req.tokenData.email
        }
      }),
      db.projects.findAll({
        raw: true,
        where: {
          user_id: req.tokenData.id
        }
      })
    ])
      .then(data => {
        if (data[0].length > 0) {
          console.log("this project has some assigned todos");
          db.projects
            .findAll({
              raw: true,
              where: {
                [Op.or]: [
                  { user_id: req.tokenData.id },
                  { project_id: data[0][0].project_id }
                ]
              }
            })
            .then(result => {
              console.log(result);
              res.json(result);
            });
        } else {
          console.log("this todo hasn't any assigned todo");
          res.json(data[1]);
        }
      })
      .catch(err => console.log(err));
  });
};
