import React from 'react'
import Navbar from './Navbar';
import Movie from './Movie'

const Watchlist = ({ movies, addWatchlistItem, userWatchlistIDs, deleteWatchlistItem }) => {

    return (
        <div className="moviesContainer">
            {movies !== undefined ? movies.map((movie) => {
                return (
                    <div className="movieContainer">
                        <Movie deleteWatchlistItem={deleteWatchlistItem} userWatchlistIDs={userWatchlistIDs} info={movie} key={movie.id} addWatchlistItem={addWatchlistItem} />
                    </div>
                )
            }) : "Nothing found, please try another input"}
        </div>
    )
}

export default Watchlist
