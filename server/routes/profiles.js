const router = require('express').Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  router.get('/profiles', (req, res) => {
    db.query(`
      SELECT *
      FROM USERS;
    `)
    .then(data => {
      res.json(data.rows)
    })
  })

  
  router.get('/profiles/:profileid', (req, res) => {
    const id = req.params.profileid
    db.query(`
      SELECT *
      FROM users
      WHERE id = ${id};
    `)
    .then(data => {
      res.json(data.rows)
    })
  })

  router.get('/profiles/:profileid/matches', (req, res) => {
    const id = req.params.profileid

    db.query(`
      SELECT
        matches.id as match_id,
        users.name as Players,
        sports.name as Sport,
        sports.image AS sport_image,
        match_date as Date,
        match_location as Location,
        tournament_id
      FROM matches 
      LEFT JOIN match_player ON matches.id = match_id
      JOIN sports ON sport_id = sports.id
      LEFT JOIN users ON users.id = user_id
      WHERE users.id = ${id}
    `)
    .then(data => {
      res.json(data.rows)
    })
  })

  router.get('/profiles/:profileid/sports', (req, res) => {
    const id = req.params.profileid

    db.query(`
      SELECT
        users.id AS user_id,
        users.name AS user_name,
        sports.name AS sport_name,
        sports.image AS sport_image,
        sports.id AS sport_id
      FROM users
      JOIN user_sport ON users.id = user_sport.user_id
      JOIN sports ON sports.id = user_sport.sport_id
      WHERE users.id = ${id};
    `)
    .then(data => {
      res.json(data.rows)
    })
  })

  router.get('/profiles/:profileid/teams', (req, res) => {
    const id = req.params.profileid

    db.query(`
      SELECT
        users.id AS user_id,
        users.name AS user_name,
        teams.name AS team_name,
        teams.id AS team_id
      FROM users
      JOIN team_member ON users.id = team_member.user_id
      JOIN teams ON teams.id = team_member.team_id
      WHERE users.id = ${id};
    `)
    .then(data => {
      res.json(data.rows)
    })
  })

  router.put('/profiles/editname', (req, res) => {
    console.log('bodytest', req.body)
    const id = req.body.id;
    const name = req.body.name
    db.query(`UPDATE users SET name = $1 WHERE id = $2;`, [name, id])
    .then(data => {
      res.json(data.rows)
    })
  })

  router.put('/profiles/editemail', (req, res) => {
    const id = req.body.id;
    const email = req.body.email
    console.log('hello')
    db.query(`UPDATE users SET email = $1 WHERE id = $2;`, [email, id])
    .then(data => {
      res.json(data.rows)
    })
  })

  router.put('/profiles/editimage', (req, res) => {
    console.log('test')
    const id = req.body.id;
    const image = req.body.image
    db.query(`UPDATE users SET image = $1 WHERE id = $2;`, [image, id])
    .then(data => {
      res.json(data.rows)
    })
  })

  router.put('/profiles/editsport', (req, res) => {
    console.log(req.body)
    const id = req.body.id;
    const sport_id = req.body.sport_id
    console.log('hello')
    db.query(`UPDATE users SET sports = sports || '{${sport_id}}' WHERE id = ${id};`)
    .then(data => {
      res.json(data.rows)
    })
  })

  router.put('/profiles/editpassword', (req, res) => {
    const id = req.body.id;
    const password = bcrypt.hashSync(req.body.password, 10);
    db.query(`UPDATE users SET password = $1 WHERE id = $2;`, [password, id])
    .then(data => {
      res.json(data.rows)
    })
  })
  

  return router;
}


