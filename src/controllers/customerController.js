const controller = {};
const fs = require('fs');

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM alimento', (err, customers) => {
     if (err) {
      res.json(err);
     }
     res.render('viewFood', {
        data: customers
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, connection) => {
    const query = connection.query(`INSERT INTO alimento(alimento, peso, calorias, proteinas, carbohidratos, grasas) values('${data.name_alimento}', ${data.int_peso},${data.int_calorias}, ${data.int_proteinas}, ${data.int_carbohidratos}, ${data.int_grasas})`, (err, customer) => {
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM alimento WHERE id = ?", [id], (err, rows) => {
      res.render('editFood', {
        data: rows[0]
      })
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  req.getConnection((err, conn) => {

  conn.query(`UPDATE alimento set alimento = '${data.name_alimento}', calorias = ${data.int_calorias}, proteinas = ${data.int_proteinas}, carbohidratos =  ${data.int_carbohidratos}, grasas = ${data.int_grasas}  where id = ${id}`, (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM alimento WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
