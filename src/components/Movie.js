import React from 'react'
import { FaStar } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom'

const Movie = ({ info, addWatchlistItem, userWatchlistIDs, deleteWatchlistItem }) => {
    const IMGPATH = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="movieBlock">
            <img alt={info.original_title} className="MovieImage" src={IMGPATH + info.poster_path}></img>
            <h2 className="movieTitle">{info.original_title}</h2>
            <p className="releaseDate">{info.release_date}</p>
            <div className="score">
                <FaStar className="vote_icon" />
                <div className="vote_average">{info.vote_average}</div>
                <div className="vote_count">({info.vote_count})</div>
            </div>
            <div className="movieButtons">
                <Link className="moreInfo" to={'/movie/' + info.id}>
                    More Info
                </Link>
                <div>
                    {userWatchlistIDs.length !== 0 && Object.keys(userWatchlistIDs).map(a => a.toString()).indexOf(info.id.toString()) === -1 ?
                        <button className="watchlistButton" onClick={() => { addWatchlistItem(info.id) }}><MdWatchLater /></button>
                        :
                        <button className="watchlistButton" onClick={() => { deleteWatchlistItem(info.id) }}><AiFillCheckCircle /></button>}
                </div>
            </div>
        </div>
    )
}

export default Movie
