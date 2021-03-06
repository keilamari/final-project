import UpcomingMatchItem from "./UpcomingMatchItem";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MatchItem from "../MatchItem"

import './UpcomingMatchesList.scss'

export default function UpcomingMacthesList(props) {
  const location = useLocation();

  const [state, setState] = useState({
    user: location.state[0],
    matches: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get(`/api/profiles/${state.user.id}/matches`)
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        matches: all[0].data
      }))
    })
  }, [])

  if (Array.isArray(state.matches)) {
    
    const allMatches = state.matches;

    const match = allMatches.map(singleMatch => (
      <MatchItem
          key={singleMatch.key}
          id={singleMatch.match_id}
          players={singleMatch.players}
          sport={singleMatch.sport}
          sport_image={singleMatch.sport_image}
          date={singleMatch.date}
          location={singleMatch.location}
          tournament={singleMatch.tournament_id}
        />
    ))

    return (
      <div className="matches-list">
        <h1 className="matches-list-title">Upcoming Matches</h1>
        <div className="matches-list-items">
          {match}
        </div>
      </div>
    )
  }


}