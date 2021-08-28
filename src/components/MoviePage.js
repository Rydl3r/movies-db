import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { BiTimeFive } from 'react-icons/bi';
import { FaStar, FaMoneyBill, FaQuoteLeft } from 'react-icons/fa';
import { MdWatchLater } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';

const MoviePage = ({ addWatchlistItem, userWatchlistIDs, deleteWatchlistItem }) => {
    let { id } = useParams();
    const [info, setInfo] = useState([])

    const IMGPATH = "https://image.tmdb.org/t/p/w500";

    const getMovieInfo = async () => {
        let url = `https://api.themoviedb.org/3/movie/${id}?&api_key=e764649bbb8537331dad79eaec972aa4`
        const response = await fetch(url)
        const data = await response.json()
        setInfo(data)
    }

    useEffect(() => {
        getMovieInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className="MoviePageWrapper">
                <div className="moviePageImageWrapper">
                    <img alt={info.original_title} className="MoviePageImage" src={IMGPATH + info.poster_path}></img>
                </div>
                <div className="moviePageInfo">
                    <h1 className="moviePageTitle">{info.original_title} ({info.release_date})</h1>
                    <div className="moviePageDescription">{info.overview}</div>
                    <div className="runtime">
                        <BiTimeFive className="runtime_icon" />
                        <div className="runtime_num">{info.runtime} minutes</div>
                    </div>
                    <div className="moviePageScore">
                        <FaStar className="moviePageVoteIcon" />
                        <div className="moviePageVoteAverage">{info.vote_average}</div>
                        <div className="moviePageVoteCount">({info.vote_count})</div>
                    </div>
                    <div className="moviePageBudget">
                        <FaMoneyBill className="moviePageBudgetIcon" />
                        <div className="moviePageBudgetNum">{info.budget} $</div>
                    </div>
                    <div className="moviePageQuote">
                        <FaQuoteLeft className="moviePageQuoteIcon" />
                        <div className="moviePageQuoteText">{info.tagline === "" ? "Some epic quote" : info.tagline}</div>
                    </div>
                    <div className="moviePageButtons">
                        <Link className="moviePageButton" to={'/'}>
                            Home Page
                        </Link>
                        <div>
                            {userWatchlistIDs.length !== 0 && Object.keys(userWatchlistIDs).map(a => a.toString()).indexOf(id.toString()) === -1 ?
                                <button className="watchlistButton" onClick={() => { addWatchlistItem(info.id) }}><MdWatchLater /></button>
                                :
                                <button className="watchlistButton" onClick={() => { deleteWatchlistItem(info.id) }}><AiFillCheckCircle /></button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoviePage
