import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
      .catch(err => {
        setIsLoading(false);
        setCurrentUser({});
        navigate('/')
      })
  };

  useEffect(() => {
    checkToken()
  }, );

  function handleRegistration({ name, email, password }) {
    authApi.register(password, email, name)
      .then(() => handleLogin(password, email))
      .catch(err => console.log(err))
  };

  function handleLogin({ password, email }) {
    authApi.authorize(password, email)
      .then(res => {
        setIsLogged(true);

      })
      .catch(err => {
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

  function handleUpadteUserInfo({ name, email }) {
    setIsLoading(true);
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
          <Route exect path='/' element={<Main />}/>
          <Route path='/movies' element={ProtectedRoute} movies={movies} showMore={true}/>
          <Route path='/saved-movies' element={ProtectedRoute} movies={savedMovies} showMore={false} isSavedMoviesPage={true} />
          <Route path='/profile' element={ProtectedRoute} />
          <Route path='/signin' element={<Login />}/>
          <Route path='/signup' element={<Register />}/>
          <Route path='/*' element={<NotFoundError />}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
