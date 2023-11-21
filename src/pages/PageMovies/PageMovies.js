import { React, useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import MoviesCard from "../../components/Movies/MoviesCard/MoviesCard";
import { FIRST_MOVIES, NEXT_STEP } from "../../utils/constants";
import apiOther from "../../utils/MoviesApi";

function PageMovies({ width, breakpoint, ...props }) {
    const [filterString, setFilterString] = useState(
        localStorage.getItem("filterString") ?? ""
    );

    const [showShortOnly, setShowShortOnly] = useState(
        localStorage.getItem("showShortOnly") ?? false
    );

    const [searchValue, setSearchValue] = useState(filterString);
    const [moreButton, setMoreButton] = useState(false);
    const [showMovies, setShowMovies] = useState([]);
    const [paginator, setPaginator] = useState();
    const [showBlockCards, setShowBlockCards] = useState(false);
    const [showBlockErr, setShowBlockErr] = useState(false);
    const [getErrorMovies, setGetErrorMovies] = useState(false);
    const [dataMovies, setDataMovies] = useState([]);

    const getMoviesList = () => {
        props.handleShowPreloader(true);
        setShowBlockErr(false);
        setShowBlockCards(true);

        apiOther
            .getMoviesList()
            .then((moviesList) => {
                let arrayMovies = moviesList.filter((movie) => {
                    if (showShortOnly && movie.duration > 40) {
                        return false;
                    }
                    return (
                        movie.nameRU.toLowerCase().includes(filterString) ||
                        movie.nameEN.toLowerCase().includes(filterString)
                    );
                });
                setDataMovies(arrayMovies);

                if (arrayMovies.length <= 0) {
                    setShowBlockCards(false);
                    setGetErrorMovies(false);
                    setShowBlockErr(true);
                    return;
                }
            })
            .catch(() => {
                setGetErrorMovies(true);
                setShowBlockCards(false);
            })
            .finally(() => {
                props.handleShowPreloader(false);
            });
    };

    useEffect(() => {
        localStorage.setItem("filterString", filterString);
    }, [filterString]);

    useEffect(() => {
        localStorage.setItem("dataMovies", JSON.stringify(dataMovies));
    }, [dataMovies]);

    useEffect(() => {
        localStorage.setItem("showShortOnly", showShortOnly);
        const shortOnly = localStorage.getItem("showShortOnly");

        if (shortOnly) {
            setShowShortOnly(JSON.parse(shortOnly));
        }
    }, [showShortOnly]);

    useEffect(() => {
        showFirstMovies();
    }, [dataMovies, width]);

    useEffect(() => {
        setMoreButton(paginator < dataMovies.length);
    }, [showMovies]);

    useEffect(() => {
        getMoviesList();
    }, [filterString, showShortOnly]);

    const showFirstMovies = () => {
        const firstMoviesCount =
            width > 1279
                ? FIRST_MOVIES.large
                : width > 954
                    ? FIRST_MOVIES.medium
                    : width > 768
                        ? FIRST_MOVIES.small
                        : FIRST_MOVIES.smallest;

        setPaginator(firstMoviesCount);
        setShowMovies(dataMovies.slice(0, firstMoviesCount));
    };

    const handleSearch = useCallback((query) => {
        setFilterString(query);
    }, []);

    const showMoreMovies = () => {
        const additionalMoviesCount =
            width > 1279
                ? NEXT_STEP.large
                : width > 954
                    ? NEXT_STEP.medium
                    : width > 768
                        ? NEXT_STEP.small
                        : NEXT_STEP.smallest;

        const nextPaginator = paginator + additionalMoviesCount;
        setShowMovies(dataMovies.slice(0, nextPaginator));
        setPaginator(nextPaginator);
    };

    return (
        <>
            <Layout
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                preloader={props.preloader}
                moviesList={dataMovies}
                showBlockCards={showBlockCards}
                showBlockErr={showBlockErr}
                usersSearchRequest={handleSearch}
                getErrorMovies={getErrorMovies}
                showMoreMovies={showMoreMovies}
                moreButton={moreButton}
                showShortOnly={showShortOnly}
                setShowShortOnly={setShowShortOnly}
                width={width}
                breakpoint={breakpoint}
            >
                {showMovies.map((movie) => {
                    return (
                        <MoviesCard
                            movie={movie}
                            hаndleMoviesLike={props.hаndleMoviesLike}
                            handleAddPlaceSubmit={props.handleAddPlaceSubmit}
                            dataUserMovies={props.dataUserMovies}
                            key={movie.id}
                            {...movie}
                        />
                    );
                })}
            </Layout>
        </>
    );
}

export default PageMovies;