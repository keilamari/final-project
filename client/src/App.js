import { Outlet, Link } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import Banner from "./components/Banner";
import HomepageIconsList from "./components/HomepageIconsList";
    
function App() {
  const state = useApplicationData()
  // const matches = state.matches
  // console.log(matches)
  // console.log(state.matches)
  console.log(state)
  return (
    <div className="App">
      <Banner />
      <HomepageIconsList />
      <ul>
        <li><a href="profile">Profile</a></li>
        <li><Link to="/matches" state={state}>Matches</Link></li>
        <li><a href="tournaments">All Tournaments</a></li>
        <li><a href="sports">Sports</a></li>
        <li><a href="match/create">Create Match</a></li>
        <li><a href="tournament/create">Create Tournament</a></li>
        <li><a href="team/create">Create Teams</a></li>
        <li><a href="sport/create">Create Sport</a></li>
    </ul>
    <Outlet />
    </div>
  );
}

export default App;
