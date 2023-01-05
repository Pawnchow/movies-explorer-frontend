import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../ultis/MainApi';
import authApi from '../../ultis/AuthApi';

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundError from '../NotFoundError/NotFoundError';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';



function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Проверка токена
  function checkToken() {
    authApi.checkToken()
      .then(res => {
        setIsLogged(true);
        setCurrentUser(res);
      })
      .catch(() => {
        setIsLogged(false);
        setCurrentUser({});
        navigate('/')
      })
  };

  useEffect(() => {
    checkToken()
  }, [])

  function handleRegistration(values) {
    const { name, email, password } = values;
    authApi.register({ password, email, name })
      .then(() => handleLogin(password, email))
      .catch(err => console.log(err))
  };

  function handleLogin(values) {
    const { email, password } = values;
    authApi.authorize({ password, email })
      .then(res => {
        setIsLogged(true);
        setCurrentUser(res);
      })
      .catch(() => {
        setIsLogged(false);
      })
  };

  function handleSignOut() {
    if (isLogged) {
      authApi.signOut()
        .then(res => {
          setIsLogged(false);
          setCurrentUser({});
          setSavedMovies([]);
          navigate('/');
        })
        .catch(err => console.log(err))
    };
  };

  function handleUpadteUserInfo(values) {
    setIsLoading(true);
    const { name, email } = values;
    mainApi.setUserInfo(name, email)
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  };

  function handleSaveMovie(movieData) {
    mainApi.saveMovie(movieData)
      .then(res => {})
      .catch(err => console.log(err))
  };

  function handleDeleteMovie(movieId) {
    setIsLoading(true);
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies(prevMovies => prevMovies.filter(item => item !== movieId));
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  };



  













  // Отображение прелоадера
  function renderPreloader() {
    if (isLoading) return (
      <>
        <Preloader />
      </>
    )
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route exect path='/' element={<Main isLogged={isLogged} />}/>
          <Route element={<ProtectedRoute isLogged={isLogged} />}>
          <Route path='/movies' element={<Movies movies={movies} isLogged={isLogged} showMore={true} />}/>
            <Route path='/saved-movies' element={<SavedMovies movies={savedMovies} isLogged={isLogged} showMore={false} isSavedMoviesPage={true} />} />
            <Route path='/profile' element={<Profile isLogged={isLogged} onProfileUpdate={handleUpadteUserInfo} onSignout={handleSignOut} serverResponse={error}/>} />
          </Route>
          <Route path='/signin' element={isLogged ? <Navigate to='/'/> : <Login onLogin={handleLogin} />} />
          <Route path='/signup' element={isLogged ? <Navigate to='/'/> : <Register onRegister={handleRegistration}/>} />
          <Route path='/*' element={<NotFoundError />}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
