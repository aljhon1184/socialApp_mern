import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Auth from './pages/auth/Auth';
import Settings from './pages/settings/Settings';
import Message from './pages/message/Message';
import Singlepost from './pages/singpost/Singlepost';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home/> : <Auth/>}
        </Route>
        <Route exact path="/search/:username">
          {user ? <Home/> : <Auth/>}
        </Route>
        <Route path="/single/:postId">
          {user ? <Singlepost /> : <Auth/>}
        </Route>
        <Route exact path="/profile/:username">
          {user ? <Profile/> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/> : <Auth/>}
        </Route>
        <Route path="/messages">
          {user ? <Message/> : <Auth/>}
        </Route>
        <Route path="/login">
          <Auth/>
        </Route>
        <Route path="/settings">
          {user ? <Settings/> : <Redirect to="/login" />}
        </Route>
      </Switch> 
    </Router>
  );
}

export default App;
