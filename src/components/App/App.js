import './App.css';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';
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

function App() {

  const [isLogged, setIsLogged] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [response, setResponse] = useState({message: '', type: ''});
  const navigate = useNavigate();
  const location = useLocation();

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
        setSavedMovies([]);
        localStorage.clear();
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        navigate('/');
      })
  };

  useEffect(() => {
    checkToken()
  }, [])
  
  useEffect(() => {
    setResponse({message: '', type: ''});
  }, [location]);

  // Получение информации о пользователе и сохранённых фильмах
  useEffect(() => {
    if(isLogged) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([userData, savedMoviesData]) => {
        setSavedMovies(savedMoviesData);
        setCurrentUser(userData);
        setResponse({message: '', type: ''});
      })
      .catch(err => console.log(err))
    }
  }, [isLogged]);

  // Обработчик регистрации
  function handleRegistration(values) {
    const { name, email, password } = values;
    authApi.register({ password, email, name })
      .then(() => handleLogin({password, email}))
      .catch(err => {
        setResponse({message: err.message, type: 'error'})
        setTimeout(() => {setResponse({...response, message: ''})}, 5000);
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
        setResponse({message: err.message, type: 'error'})
        setTimeout(() => {setResponse({...response, message: ''})}, 5000);
      })
  };

  // Обработчик выхода из приложения
  function handleSignOut() {
    if(isLogged) {
      authApi.signOut()
        .then(() => {
          setIsLogged(false);
          setCurrentUser({});
          setSavedMovies([]);
          localStorage.clear();
          navigate('/');
        })
        .catch(err => console.log(err))
    }
  };

  // Обработчик обновления информации о пользователе
  function handleUpadteUserInfo(values) {
    const { name, email } = values;
    mainApi.setUserInfo(name, email)
      .then(res => {
        setCurrentUser(res)
        setResponse({type: 'success', message: 'Сохранение прошло успешно!'});
        setTimeout(() => {setResponse({...response, message: ''})}, 5000);
      })
      .catch(err => {
        setResponse({message: err.message, type: 'error'})
        setTimeout(() => {setResponse({...response, message: ''})}, 5000);
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
  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(prevMovies => prevMovies.filter(item => item._id !== movie._id));
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
            <Route path='/movies' element={<Movies savedMovies={savedMovies} handleDeleteMovie={handleDeleteMovie} handleSaveMovie={handleSaveMovie} />}/>
            <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} handleDeleteMovie={handleDeleteMovie} />} />
            <Route path='/profile' element={<Profile onProfileUpdate={handleUpadteUserInfo} onSignout={handleSignOut} serverResponse={response}/>} />
          </Route>
          <Route path='/signin' element={isLogged ? <Navigate to='/'/> : <Login onLogin={handleLogin} error={response.message} />} />
          <Route path='/signup' element={isLogged ? <Navigate to='/'/> : <Register onRegister={handleRegistration} error={response.message} />} />
          <Route path='/*' element={<NotFoundError />}/>
        </Routes>
        }
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
