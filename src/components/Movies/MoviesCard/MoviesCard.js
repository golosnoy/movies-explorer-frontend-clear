import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
const IMG_URL = 'https://api.nomoreparties.co';

function MoviesCard({ movie, card, dataUserMovies, handleMoviesDelete, hаndleMoviesLike, ...props }) {
    const location = useLocation();
    const [duration, setDuratiion] = useState('');
    const showCross = ['/saved-movies'].includes(location.pathname);

    useEffect(() => {
        timeDuration();
    }, [])

    const isInUserMovies = () => {
        return dataUserMovies?.some((i) => i.movieId === movie.id);
    };

    const isLiked = isInUserMovies();

    const moviesLikeButton = (
        `card__like-heart ${isLiked ? 'card__like-heart-active' : ''}`
    );

    function handleLikeClick() {
        hаndleMoviesLike(props, !isLiked);
    }

    function handleDeleteClick() {
        handleMoviesDelete(props);
    }

    const timeDuration = () => {
        let hour = Math.floor(props.duration / 60) + ' ч';
        if (Math.floor(props.duration / 60) === 0) {
            hour = '';
        }
        let min = (props.duration % 60) + ' мин';
        setDuratiion(`${hour} ${min}`);
    }

    return (
        <>
            <div className='card'>
                <a href={props.trailerLink} target="_blank">
                    <img className='card__afisha' src={showCross ? `${props.image}` : `${IMG_URL}/${props.image.url}`} alt={props.nameRU} preserveAspectRatio='xMidYMid slice' />
                </a>
                <div className='card__discription'>
                    <h2 className='card__title'>{props.nameRU}</h2>
                    {
                        showCross
                            ? <button type="button" onClick={handleDeleteClick} className='card__delete-btn'>
                                <span className='card__delete-cross'>+</span>
                            </button>
                            : <button type="button" onClick={handleLikeClick} className='card__like-btn'>
                                <div className={moviesLikeButton}></div>
                            </button>
                    }
                </div>
                <span className='card__duration-film'>{duration}</span>
            </div>
        </>
    )
}

export default MoviesCard