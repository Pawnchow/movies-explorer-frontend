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
import moviesApi from '../../ultis/MoviesApi';

import {
  SERVER_ERROR_MESSAGE,
  AUTH_ERROR,
  EMAIL_EXIST,
  BAD_REQUEST
} from '../../ultis/constants';


function App() {

  const [isLogged, setIsLogged] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
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
      })
  };

  useEffect(() => {
    checkToken()
  }, [])

  // Получение информации о пользователе и сохранённых фильмах
  useEffect(() => {
    if(isLogged) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([userData, savedMoviesData]) => {
        setSavedMovies(savedMoviesData);
        setCurrentUser(userData);
      })
      .catch(err => console.log(err))
    }
  }, [isLogged]);

  // Обработчик регистрации
  function handleRegistration(values) {
    const { name, email, password } = values;
    authApi.register({ password, email, name })
      .then(() => handleLogin(password, email))
      .catch(err => {
        if (err === 409) {
          setError(EMAIL_EXIST)
        }
        else if (err === 400) {
          setError(BAD_REQUEST)
        }
        else setError(SERVER_ERROR_MESSAGE)
      })
  };

  // Обработчик авторизации
  function handleLogin(values) {
    const { email, password } = values;
    authApi.authorize({ password, email })
      .then(res => {
        setIsLogged(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch(err => {
        setIsLogged(false);
        if (err === 401) {
          setError(AUTH_ERROR)
        }
        else if (err === 400) {
          setError(BAD_REQUEST)
        }
        else setError(SERVER_ERROR_MESSAGE)
      })
  };

  // Обработчик выхода из приложения
  function handleSignOut() {
    if (isLogged) {
      authApi.signOut()
        .then(res => {
          setIsLogged(false);
          setCurrentUser({});
          setSavedMovies([]);
          localStorage.clear();
          navigate('/');
        })
        .catch(err => console.log(err))
    };
  };

  // Обработчик обновления информации о пользователе
  function handleUpadteUserInfo(values) {
    const { name, email } = values;
    mainApi.setUserInfo(name, email)
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
        if (err === 409) {
          setError(EMAIL_EXIST)
        }
        else if (err === 400) {
          setError(BAD_REQUEST)
        }
        else setError(SERVER_ERROR_MESSAGE)
      })
  };

  // Обработчик сохранения фильма
  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then(movie => {
        setSavedMovies([ movie, ...savedMovies])
      })
      .catch(err => console.log(err))
  };

  // Обработчик удаления фильма
  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies(prevMovies => prevMovies.filter(item => item !== movieId));
      })
      .catch(err => console.log(err))
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {isLogged !== null &&
        <Routes>
          <Route exect path='/' element={<Main isLogged={isLogged} />}/>
          <Route element={<ProtectedRoute isLogged={isLogged} />}>
            <Route path='/movies' element={<Movies showMore={true} handleDeleteMovie={handleDeleteMovie} handleSaveMovie={handleSaveMovie} />}/>
            <Route path='/saved-movies' element={<SavedMovies movies={savedMovies} handleDeleteMovie={handleDeleteMovie} />} />
            <Route path='/profile' element={<Profile onProfileUpdate={handleUpadteUserInfo} onSignout={handleSignOut} serverResponse={error}/>} />
          </Route>
          <Route path='/signin' element={isLogged ? <Navigate to='/'/> : <Login onLogin={handleLogin} error={error} />} />
          <Route path='/signup' element={isLogged ? <Navigate to='/'/> : <Register onRegister={handleRegistration} error={error} />} />
          <Route path='/*' element={<NotFoundError />}/>
        </Routes>
        }
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
