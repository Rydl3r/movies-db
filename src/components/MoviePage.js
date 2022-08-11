import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import Button from "@material-ui/core/Button";
import { FaStar, FaMoneyBill, FaQuoteLeft } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";

const MoviePage = ({
  addWatchlistItem,
  userWatchlistIDs,
  deleteWatchlistItem,
}) => {
  let { id } = useParams();
  const [info, setInfo] = useState([]);
  const [actors, setActors] = useState([]);

  const IMGPATH = "https://image.tmdb.org/t/p/w500";
  const ACTORIMGPATH = "https://image.tmdb.org/t/p/w500";

  const getMovieInfo = async () => {
    let url = `https://api.themoviedb.org/3/movie/${id}?&api_key=e764649bbb8537331dad79eaec972aa4`;
    const response = await fetch(url);
    const data = await response.json();
    setInfo(data);
  };

  const getActorsInfo = async () => {
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?&api_key=e764649bbb8537331dad79eaec972aa4`;
    const response = await fetch(url);
    const data = await response.json();
    setActors(data.cast);
    console.log(data);
  };

  function commafy(num) {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  }

  useEffect(() => {
    getMovieInfo();
    getActorsInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="MoviePageWrapper">
        <div className="moviePageImageWrapper">
          <img
            alt={info.original_title}
            className="MoviePageImage"
            src={IMGPATH + info.poster_path}
          ></img>
        </div>
        <div className="moviePageInfo">
          <h1 className="moviePageTitle">
            {info.original_title} ({info.release_date})
          </h1>
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
            <div className="moviePageBudgetNum">
              {!info.budget ? info.budget : commafy(info.budget)} $
            </div>
          </div>
          <div className="moviePageQuote">
            <FaQuoteLeft className="moviePageQuoteIcon" />
            <div className="moviePageQuoteText">
              {info.tagline === "" ? "Some epic quote" : info.tagline}
            </div>
          </div>
          <div className="moviePageButtons">
            <Link to={"/"}>
              <Button variant="contained">Home Page</Button>
            </Link>
            <div>
              {userWatchlistIDs.length !== 0 &&
              Object.keys(userWatchlistIDs)
                .map((a) => a.toString())
                .indexOf(id.toString()) === -1 ? (
                <button
                  className="watchlistButton"
                  variant="contained"
                  onClick={() => {
                    addWatchlistItem(info.id);
                  }}
                >
                  <MdWatchLater />
                </button>
              ) : (
                <button
                  className="watchlistButton"
                  variant="contained"
                  onClick={() => {
                    deleteWatchlistItem(info.id);
                  }}
                >
                  <AiFillCheckCircle />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="actors_wrapper">
        <div className="actors_title">Actors</div>
        <div className="actors_block">
          {actors.map((actor, idx) => {
            return (
              <div variant="outlined" className="actor_card" key={idx}>
                <div className="actor_image">
                  <img
                    alt={actor.name}
                    className="actorImage"
                    src={ACTORIMGPATH + actor.profile_path}
                  ></img>
                </div>

                <div className="actorName">{actor.name}</div>
                <div className="actorCharacter">{actor.character}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
