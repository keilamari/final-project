import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MatchItem from "./components/MatchItem";
import './App.scss';
import MatchItemList from "./components/MatchItemsList";
import NavBar from "./components/partials/NavBar"
import Footer from './components/partials/Footer';

import CreateSport from './components/CreateSport';
import Tournaments from './components/Tournaments';
import CreateMatch from './components/CreateMatch';
import SportsList from './components/SportsList';
import CreateTournament from './components/CreateTournament';
import TournamentItem from './components/TournamentItem';
import CreateTeam from './components/CreateTeam';
import Profile from './components/Profiles';
import ViewUserDetails from './components/Profiles/ViewUserDetails';
import SingleTeamItem from './components/SingleTeamItem';
import TeamItemsList from './components/TeamItemsList';
import MyProfile from './components/MyProfile';
import UserTest from './components/UserTest';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="matches" element={<MatchItemList />} />
        <Route path="matches/:matchid" element={<MatchItem />} />
        <Route path="matches/create" element={<CreateMatch />} />
        <Route path="sport/create" element={<CreateSport />} />
        <Route path="tournament/create" element={<CreateTournament />}/>
        <Route path="tournaments" element={<Tournaments />} />
        <Route path="sports" element={<SportsList />} />
        <Route path='tournaments/:tournament_id' element={<TournamentItem />} />
        <Route path="profiles" element={<Profile />} />
        <Route path="profiles/:profileid" element={<ViewUserDetails />} />
        <Route path="teams/create" element={<CreateTeam />} />
        <Route path="teams/:teamid" element={<SingleTeamItem />} />
        <Route path="teams" element={<TeamItemsList />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="login/test" element={<UserTest />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
