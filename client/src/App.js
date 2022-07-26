import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, Fragment } from 'react';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import setAuthToken from './helper/setAuthToken';
import { loadUser } from './actions/auth-action';
import PrivateRoute from './components/route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import addExperience from './components/profile/AddExperience';
import addEducation from './components/profile/AddEducation';
import Profiles from './components/profile/profiles/Profiles';
import Profile from './components/profile/component/Profile';
import Posts from './components/posts/Posts';
import NotFound from './components/layouts/NotFound';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Post from './components/posts/post/Post';

// check for token in LS when app first runs
if (localStorage.token) {
  // if there is a token set axios headers for all requests
  setAuthToken(localStorage.token);
}

const App = () => {
  // If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.
  // when state update this will keep running(loop constant) ,unless adding [] empty bractes as 2nd parameter, this will make it run  only once  (component demount). There are certain propertes can be added in empty bracets [], which will only update idf those properties are updated
  useEffect(() => {
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className='container'>
            <Alert />
            {/* Its most basic responsibility is to render some UI when its path matches the current URL. */}
            {/* switch can only have routes so we will put itt below navbar */}
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profiles' element={<Profiles />} />
              <Route path='/profiles/:id' element={<Profile />} />
              <Route path='/register' element={<Register />} />
              <Route
                path='dashboard'
                element={<PrivateRoute component={Dashboard} />}
              />
              <Route
                path='create-profile'
                element={<PrivateRoute component={CreateProfile} />}
              />
              <Route
                path='edit-profile'
                element={<PrivateRoute component={EditProfile} />}
              />
              <Route
                path='add-experience'
                element={<PrivateRoute component={addExperience} />}
              />
              <Route
                path='add-education'
                element={<PrivateRoute component={addEducation} />}
              />
              <Route
                path='/posts'
                element={<PrivateRoute component={Posts} />}
              />
              <Route
                path='/post/:id'
                element={<PrivateRoute component={Post} />}
              />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
