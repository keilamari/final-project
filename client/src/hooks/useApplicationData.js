import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {
  
  const [state, setState] = useState({
  
    matches: {},
    tournaments: {},
    sports: {},
    match: {},
    users: {},
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/matches/all'),
      axios.get('/api/tournaments'),
      axios.get('/api/sports'),
      axios.get('/api/matches'),
      axios.get('/api/profiles'),
      axios.get('/api/teams')
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        matches: all[0].data,
        tournaments: all[1].data,
        sports: all[2].data,
        match: all[3].data,
        users: all[4].data,
        teams: all[5].data
      }))
    })
  }, [])

  const createSport = (id, name, image) => {
    const data = {
      name: name,
      image: image
    }
    return axios.put(`/api/sports/${id}`, data)
      .then(res => {
        console.log("res", res)
      })
      .catch(error => {
        console.log(error)
      })
  }


  const createMatch = (sport, date, location) => {
    const data ={
      sport: sport,
      date: date,
      location: location
    }
    return axios.put('/api/matches/create', data)
  }

  const getNewMatch = () => {
    return axios.get('/api/matches/create')

  }

  const addPlayerToMatch = (id, matchId) => {
    const data = {
      user_id: id,
      match_id: matchId
    }
    return axios.put('/api/matches/add', data)
  }

  const createNewTournament = (name, sport, number_of_players, type, number_of_matches) => {
    const data = {
      name: name,
      sport: sport,
      number_of_players: number_of_players,
      type: type,
      number_of_matches: number_of_matches
    }
    return axios.put('/api/tournaments', data)
  }

  const createTournamentMatch = (sport, date, location, tournamentId) => {
    const data ={
      sport: sport,
      date: date,
      location: location,
      tournamentId: tournamentId
    }
    return axios.put('/api/tournaments/create', data)
  }
  const createTeam = (name, sport_id, image) => {
    const data = {
      name: name,
      sportId: sport_id,
      image: image
    }
    return axios.put(`/api/teams`, data)
      .then(res => {
        console.log("res", res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addMemberToTeam = (id, teamId) => {
    const data = {
      user_id: id,
      team_id: teamId
    }
    return axios.put('/api/teams/add', data)
      .then(res => {
        console.log('RES', res)
      })
  }

  const editName = (id, name) => {
    const data = {
      id: id,
      name: name
    }
    return axios.put('/api/profiles/editname', data)
    .then(res => {
      console.log('res', res)
    })
  }

  const editEmail = (id, email) => {
    const data = {
      id: id,
      email: email
    }
    return axios.put('/api/profiles/editemail', data)
    .then(res => {
      console.log('res', res)
    })
  }

  const editImage = (id, image) => {
    const data = {
      id: id,
      image: image
    }
    return axios.put('/api/profiles/editimage', data)
    .then(res => {
      console.log('res', res)
    })
  }


  const addSport = (id, sport_id) => {
    const data ={
      id: id,
      sport_id: sport_id
    }
    return axios.put('/api/profiles/editsport', data)
    .then(res => {
      console.log('res', res)
    })
  }
  
  const editPassword = (id, password) => {
    const data ={
      id: id,
      password: password
    }
    return axios.put('/api/profiles/editpassword', data)
    .then(res => {
      console.log('res', res)
    })
  }

  return { state, createSport, createMatch, getNewMatch, addPlayerToMatch, createNewTournament, createTournamentMatch, createTeam, addMemberToTeam, editName, editEmail, editImage, addSport, editPassword } 
}