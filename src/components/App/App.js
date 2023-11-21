import { userContex } from "../../contexts/CurrentUserContext";

import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PageMovies from "../../pages/PageMovies/PageMovies";
import PageSaveMovies from "../../pages/PageSaveMovies/PageSaveMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Authorization/Register/Register";
import Login from "../Authorization/Login/Login";
import Profile from "../Authorization/Profile/Profile";
import Footer from "../Footer/Footer";
import apiMain from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  DUPLICATE_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  AUTHORIZATION_ERROR_MESSAGE,
  REGISTRATION_ERROR_MESSAGE,
  UNATHORIZED_ERROR_MESSAGE
} from "../../utils/constants";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideFooter = ["/profile"].includes(location.pathname);
  const hideHeader = ["/signup", "/signin"].includes(location.pathname);

  const [currentUser, setCurrentUser] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInited, setIsInited] = useState(false);

  const [valueHideHeaderAndFooter, setValueHideHeaderAndFooter] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [serverResWithError, setServerResWithError] = useState({});

  const [dataUserMovies, setDataUserMovies] = useState([]);
  const [cards, setCards] = useState([]);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
        window.removeEventListener('resize', handleResizeWindow);
    };
}, []);

  useEffect(() => {
    apiMain
      .getAuthenticationUser()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(`${UNATHORIZED_ERROR_MESSAGE} , ${err}`))
      .finally(() => setIsInited(true));
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    Promise.all([apiMain.getInitialUsers(), apiMain.getInitialMovies()])
      .then(([dataUser, moviesUserList]) => {
        setCurrentUser(dataUser);
        setDataUserMovies(moviesUserList);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function hideHeaderAndFooter(value) {
    return setValueHideHeaderAndFooter(value);
  }

  const handleShowPreloader = (state) => {
    setPreloader(state);
  };

  const hаndleMoviesLike = (movies, isLiked) => {
    if (!isLiked) {
      apiMain
        .deleteMovies(dataUserMovies.find((i) => i.movieId === movies.id)._id)
        .then(() => {
          setDataUserMovies((prev) =>
            prev.filter((arrCards) => arrCards.movieId !== movies.id)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiMain
        .setAddNewMovies(movies)
        .then((arrNewMovies) => {
          setDataUserMovies((prev) => [...prev, arrNewMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function handleMoviesDelete(movies) {
    apiMain
      .deleteMovies(movies._id)
      .then(() => {
        setDataUserMovies(
          dataUserMovies.filter((arrCards) => arrCards._id !== movies._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddPlaceSubmit = (dataAddMovie) => {
    apiMain
      .setAddNewMovies(dataAddMovie)
      .then((arrAddCard) => {
        return setCards([arrAddCard, ...cards]);
      })
      .catch((err) => {
        return console.log(err);
      });
  };

  const handleNewUserData = (name, email) => {
    toggleForm();
    return apiMain
      .setInitialUsers(name, email)
      .then((newDataUser) => {
        setCurrentUser({
          name: newDataUser.name,
          email: newDataUser.email,
        });
      })
      .catch((err) => {
        if (err === 409) {
          setServerResWithError({
            message: DUPLICATE_ERROR_MESSAGE,
          });
        } else {
          setServerResWithError({
            message: SERVER_ERROR_MESSAGE,
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
      })
      .finally(() => toggleForm());
  };

  const handleLogin = (email, password) => {
    toggleForm();
    apiMain
      .setAuthorizeUser(email, password)
      .then((data) => {
        if (true) {
          setLoggedIn(true);
          navigate("/movies");
          return data;
        }
      })
      .catch((err) => {
        if (err === 400) {
          setServerResWithError({
            message: AUTHORIZATION_ERROR_MESSAGE,
          });
        } else if (err === 401) {
          setServerResWithError({
            message: LOGIN_ERROR_MESSAGE,
          })
        } else {
          setServerResWithError({
            message: SERVER_ERROR_MESSAGE,
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
        setLoggedIn(false);
      })
      .finally(() => toggleForm());
  };

  function handleRegister(name, email, password) {
    toggleForm();
    apiMain
      .setRegisterUser(name, email, password)
      .then(() => {
        return handleLogin(email, password);
      })
      .catch((err) => {
        if (err === 400) {
          setServerResWithError({
            message: REGISTRATION_ERROR_MESSAGE,
          })
        } else if (err === 409) {
          setServerResWithError({
            message: DUPLICATE_ERROR_MESSAGE,
          });
        } else {
          setServerResWithError({
            message: SERVER_ERROR_MESSAGE,
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
        setLoggedIn(false);
      })
      .finally(() => toggleForm());
  }

  const handleLogOut = () => {
    toggleForm();
    apiMain
      .getLogout()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser(null);
        navigate("/");
      })
      .catch((err) => console.log(err))
      .finally(() => toggleForm()); 
  };

  const toggleForm = () => {
    const form = document.getElementById('form')
    form.classList.toggle('disabled');
  }

  if (!isInited) {		
    return null;		
    }
  return (
    <>
     <userContex.Provider value={currentUser}>
        {hideHeader || valueHideHeaderAndFooter ? (
          <></>
        ) : (
          <Header loggedIn={loggedIn} width={width} breakpoint={breakpoint}/>
        )}
        <main className="main-content">
          <Routes>
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route
                path="/saved-movies"
                element={
                  <PageSaveMovies
                    dataUserMovies={dataUserMovies}
                    preloader={preloader}
                    handleMoviesDelete={handleMoviesDelete}
                  />
                }
              /> 
              <Route
                path="/movies"
                element={
                  <PageMovies
                    hаndleMoviesLike={hаndleMoviesLike}
                    dataUserMovies={dataUserMovies}
                    preloader={preloader}
                    handleShowPreloader={handleShowPreloader}
                    handleAddPlaceSubmit={handleAddPlaceSubmit}
                    width={width}
                    breakpoint={breakpoint}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    greeting="Привет"
                    btnEditText="Редактировать"
                    btnExitText="Выйти из аккаунта"
                    handleLogOut={handleLogOut}
                    handleNewUserData={handleNewUserData}
                    serverResWithError={serverResWithError}
                  />
                }
              />
            </Route>
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} serverResWithError={serverResWithError} />}
            />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} serverResWithError={serverResWithError} />}
            />
            <Route
              path="*"
              element={
                <PageNotFound hideHeaderAndFooter={hideHeaderAndFooter} />
              }
            />
            <Route path="/" element={<Main />} />
          </Routes>
        </main>
        {hideFooter || hideHeader || valueHideHeaderAndFooter ? (
          <></>
        ) : (
          <Footer />
        )}
      </userContex.Provider>
    </>
  );
}

export default App;