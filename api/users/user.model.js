import db from "../../config/components/database.config.js";

function insert(nome, email, idade) {
  const query = "INSERT INTO user (nome, email, idade) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(query, [nome, email, idade], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

function getById(id) {
  const query = "SELECT * FROM user WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function getAll(pageSize, offSet) {
  const query = "SELECT * FROM user LIMIT ? OFFSET ?";

  return new Promise((resolve, reject) => {
    db.all(query, [pageSize, offSet], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function deleteById(id) {
  const query = "DELETE FROM user WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function update(user) {
  const { id, nome, email, idade } = user;
  const query = "UPDATE user SET nome = ?, email = ?, idade = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(query, [nome, email, idade, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function entityExistis(id) {
  const query = "SELECT EXISTS(SELECT 1 FROM user WHERE id=?) as exist";

  return new Promise((resolve, reject) => {
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.exist === 1);
      }
    });
  });
}

export { insert, getById, getAll, deleteById, update, entityExistis };
