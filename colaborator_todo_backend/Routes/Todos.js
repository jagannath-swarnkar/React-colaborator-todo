module.exports = (db, todos, checkToken) => {
  todos.post("/todo", checkToken, (req, res) => {
    db.todos
      .create({
        project_id: parseInt(req.body.project_id),
        text: req.body.text,
        done: req.body.done,
        user_id: req.tokenData.id,
        user_email: req.tokenData.email,
        assigned_to: req.body.assignedTo
      })
      .then(data => {
        db.todos
          .findAll({
            raw: true,
            where: { project_id: parseInt(req.body.project_id) }
          })
          .then(result => {
            // console.log(result)
            res.json(result);
          })
          .catch(err => {
            console.log(err);
            res.json({ status_code: 404, message: err });
          });
      })
      .catch(err => {
        console.log("err in inserting todo into db", err);
      });
  });

  // getting data in compponent will mount from database using project_id
  todos.post("/getTodos", checkToken, (req, res) => {
    db.todos
      .findAll({
        raw: true,
        where: { project_id: parseInt(req.body.project_id) }
      })
      .then(result => {
        // console.log(result)
        res.json(result);
      })
      .catch(err => {
        console.log(err);
        res.json({ status_code: 404, message: err });
      });
  });

  // deleting a todo by its id---------------------------------------
  todos.post("/delete/:id", checkToken, (req, res) => {
    db.todos
      .destroy({
        raw: true,
        where: { id: req.body.id }
      })
      .then(data => {
        db.todos
          .findAll({
            raw: true,
            where: { project_id: parseInt(req.body.project_id) }
          })
          .then(result => {
            res.json(result);
          })
          .catch(err => {
            res.json({ status_code: 404, message: err });
          });
      })
      .catch(err => {
        console.log("err in deleting data in backend", err);
      });
  });

  // Put method to update the states like done or pending into database and return back to update in frontend
  todos.put("/done/:id", checkToken, (req, res) => {
    db.todos
      .update(
        {
          done: req.body.done
        },
        {
          raw: true,
          where: { id: req.body.id }
          // $and: {user_id: req.tokenData.id}
        }
      )
      .then(data => {
        db.todos
          .findAll({
            raw: true,
            where: { project_id: req.body.project_id }
          })
          .then(result => {
            // console.log("updated done list of todos:",result)
            res.json(result);
          })
          .catch(err =>
            console.log("err in getting done updated todoList", err)
          );
      })
      .catch(err => {
        res.send("err");
      });
  });

  // editing a todo by its id and updating in db and rendering--------------------
  todos.put("/edit/:id", checkToken, (req, res) => {
    let text = req.body.text;
    db.todos
      .update(
        {
          text: req.body.text
        },
        {
          where: { id: req.body.id }
        }
      )
      .then(data => {
        // console.log('todo updated to db')
        db.todos
          .findAll({
            raw: true,
            where: { project_id: parseInt(req.body.project_id) }
          })
          .then(result => {
            // console.log(result);
            res.send(result);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log("token expired please login again");
      });
  });

  // adding note to a todo by post method---------------------
  todos.post("/note/:id", checkToken, (req, res) => {
    db.todos
      .update(
        {
          note: req.body.note
        },
        {
          where: { id: req.params.id }
        }
      )
      .then(data => {
        db.todos
          .findAll({
            where: { project_id: req.body.project_id }
          })
          .then(result => {
            res.send(result);
          })
          .catch(err => {
            res.send("error");
          });
      })
      .catch(err => {
        console.log("err in updating note to backend", err);
      });
  });
};
