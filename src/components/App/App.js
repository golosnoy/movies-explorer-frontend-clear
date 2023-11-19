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

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideFooter = ["/profile"].includes(location.pathname);
  const hideHeader = ["/signup", "/signin"].includes(location.pathname);

  const [currentUser, setCurrentUser] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInited, setIsInited] = useState(false);

  const [valueHideHeaderAndFooter, setValueHideHeaderAndFooter] =
    useState(false);
  const [preloader, setPreloader] = useState(false);
  const [serverResWithError, setServerResWithError] = useState({});

  const [dataUserMovies, setDataUserMovies] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    apiMain
      .getAuthenticationUser()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
        }
      })
      .finally(() => setIsInited(true))
      .catch((err) => console.log(`Вы не авторизованы, ${err}`));
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

  const hendlerMoviesLike = (movies, isLiked) => {
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

  function hendlerMoviesDelete(movies) {
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
            message: "Пользователь с таким email уже существует.",
          });
        } else {
          setServerResWithError({
            message: "На сервере произошла ошибка.",
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
      });
  };

  const handleLogin = (email, password) => {
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
            message: "Ошибка авторизации.",
          });
        } else if (err === 401) {
          setServerResWithError({
            message: "Неправильный логин или пароль.",
          })
        } else {
          setServerResWithError({
            message: "На сервере произошла ошибка.",
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
        setLoggedIn(false);
      });
  };

  function handleRegister(name, email, password) {
    apiMain
      .setRegisterUser(name, email, password)
      .then(() => {
        return handleLogin(email, password);
      })
      .catch((err) => {
        if (err === 400) {
          setServerResWithError({
            message: "При регистрации пользователя произошла ошибка.",
          })
        } else if (err === 409) {
          setServerResWithError({
            message: "Пользователь с таким email уже существует.",
          });
        } else {
          setServerResWithError({
            message: "На сервере произошла ошибка.",
          });
        }
        setTimeout(() => setServerResWithError({}), 3500);
        setLoggedIn(false);
      });
  }

  const handleLoggedIn = (boolew) => {
    apiMain.getLogout().catch((err) => console.log(err));
    localStorage.clear();
    setLoggedIn(boolew);
    setCurrentUser(null);
  };

  if (!isInited) {		
    return null;		
    }
  return (
    <>
     <userContex.Provider value={currentUser}>
        {hideHeader || valueHideHeaderAndFooter ? (
          <></>
        ) : (
          <Header loggedIn={loggedIn} />
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
                    hendlerMoviesDelete={hendlerMoviesDelete}
                  />
                }
              /> 
              <Route
                path="/movies"
                element={
                  <PageMovies
                    hendlerMoviesLike={hendlerMoviesLike}
                    dataUserMovies={dataUserMovies}
                    preloader={preloader}
                    handleShowPreloader={handleShowPreloader}
                    handleAddPlaceSubmit={handleAddPlaceSubmit}
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
                    onLoggedIn={handleLoggedIn}
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