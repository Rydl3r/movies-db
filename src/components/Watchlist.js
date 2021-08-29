import React from 'react'
import Movie from './Movie'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const Watchlist = ({ movies, addWatchlistItem, userWatchlistIDs, deleteWatchlistItem }) => {

    return (
        <div>
            <div className="moviesContainer">
                {movies !== undefined ? movies.map((movie) => {
                    return (
                        <div className="movieContainer">
                            <Movie deleteWatchlistItem={deleteWatchlistItem} userWatchlistIDs={userWatchlistIDs} info={movie} key={movie.id} addWatchlistItem={addWatchlistItem} />
                        </div>
                    )
                }) : "Nothing found, please try another input"}
            </div>
            <Link className="HomePageButton" to={'/'}>
                <Button variant="contained">
                    Home Page
                </Button>
            </Link>
        </div>

    )
}

export default Watchlist
