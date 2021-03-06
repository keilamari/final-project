const router = require('express').Router();

module.exports = (db) => {
  router.get('/tournaments', (req, res) => {
    db.query(`
    SELECT *
    FROM TOURNAMENTS
    `)
    .then(data => {
        res.json(data.rows)
      }
    )
  })

  router.put('/tournaments', (req, res) => {

    const name = req.body.name
    const sport_id = req.body.sport
    const number_of_players = req.body.number_of_players
    const type = req.body.type
    const number_of_matches = req.body.number_of_matches
    db.query(`
    INSERT INTO tournaments (name, sport_id, number_of_players, type, number_of_matches)
    VALUES ($1::text, $2, $3, $4, $5)
    `, [name, sport_id, number_of_players, type, number_of_matches])
    .then(data => {
      res.json(data.rows)
    })

  })

  router.get('/tournaments/:id', (req, res) => {
    const id = req.params.id

    db.query(`
    SELECT * FROM tournaments
    WHERE id = ${id}`)
    .then(data => {
      console.log(data)
      res.json(data.rows)
    })
    .catch(error => {
      console.log(error)
    })
  })


  router.put('/tournaments/create', (req, res) => {
    console.log("body", req.body)

    const sport = req.body.sport
    const date = req.body.date
    const location = req.body.location
    const tournamentId = req.body.tournamentId
    db.query(`
      INSERT INTO matches (sport_id, match_date, match_location, tournament_id)
      VALUES ($1::integer, $2::date, $3::text, $4::integer)
    `, [sport, date, location, tournamentId])
    .then(data => {
      res.json(data.rows)
    })
  })
  return router;
}