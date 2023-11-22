import { React, useState, useEffect, useCallback, useMemo } from "react";
import Layout from "../../components/Layout/Layout";
import MoviesCard from "../../components/Movies/MoviesCard/MoviesCard";

function PageSaveMovies(props) {
    const [filterString, setFilterString] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [showShortOnly, setShowShortOnly] = useState(false);
    const [showBlockErr, setShowBlockErr] = useState(false);
    const [getErrorMovies, setGetErrorMovies] = useState(false);
    const [showBlockCards, setShowBlockCards] = useState(false);

    const filteredMovies = useMemo(() => {
        return props.dataUserMovies.filter((movie) => {
            if (showShortOnly && movie.duration > 40) {
                return false;
            }
            return (
                movie.nameRU.toLowerCase().includes(filterString) ||
                movie.nameEN.toLowerCase().includes(filterString)
            );
        });
    }, [props.dataUserMovies, filterString, showShortOnly]);

    const handleSearch = useCallback((query) => {
        setFilterString(query);
    }, []);

    useEffect(() => {
        if (filteredMovies.length <= 0) {
            setShowBlockErr(true);
            setGetErrorMovies(false);
            setShowBlockCards(false);
        } else {
        setShowBlockErr(false);
        setGetErrorMovies(true);
        setShowBlockCards(true);
        }
    }, [filteredMovies]);

    return (
        <>
            <Layout
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                preloader={props.preloader}
                dataUserMovies={filteredMovies}
                getErrorMovies={getErrorMovies}
                showBlockErr={showBlockErr}
                usersSearchRequest={handleSearch}
                showBlockCards={showBlockCards}
                showShortOnly={showShortOnly}
                setShowShortOnly={setShowShortOnly}
            >
                {filteredMovies.map((movie) => {
                    return (
                        <MoviesCard
                            movie={movie}
                            hаndleMoviesLike={props.hаndleMoviesLike}
                            handleAddPlaceSubmit={props.handleAddPlaceSubmit}
                            handleMoviesDelete={props.handleMoviesDelete}
                            dataUserMovies={props.dataUserMovies}
                            key={movie._id}
                            {...movie}
                        />
                    );
                }) ?? []}
            </Layout>
        </>
    );
}

export default PageSaveMovies;