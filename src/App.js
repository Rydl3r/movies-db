import { useState, useEffect } from 'react'
import Movie from './components/Movie';
import MoviePage from './components/MoviePage';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Watchlist from './components/Watchlist';
import { app } from "./firebase"
import { doc, getDoc, getFirestore, setDoc, updateDoc, deleteField } from "firebase/firestore";

function App() {


  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [userCredentials, setUserCredentials] = useState({})
  const [userWatchlistIDs, setUserWatchlistIDs] = useState({})
  const [userWatchlist, setUserWatchlist] = useState([])
  const [isLogged, setIsLogged] = useState(false)

  const db = getFirestore(app);



  async function mapWatchlist() {


    for (let movieID of Object.keys(userWatchlistIDs)) {

      let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=e764649bbb8537331dad79eaec972aa4`
      const response = await fetch(url)
      const movie = await response.json()

      setUserWatchlist(prevItems => [...prevItems, movie]);
      console.log(userWatchlist)



    }

  }

  async function getWatchlists() {
    if (Object.keys(userCredentials).length !== 0) {
      const docRef = doc(db, "Watchlists", userCredentials.uid);
      const docSnap = await getDoc(docRef);


      setUserWatchlistIDs(docSnap.data())
      setUserWatchlist([])
    }


  }

  async function addWatchlistItem(movie_id) {
    const data = {}
    data[movie_id] = true


    if (Object.keys(userCredentials).length !== 0) {

      const docRef = doc(db, 'Watchlists', userCredentials.uid);
      await setDoc(docRef, data, { merge: true });

      await getWatchlists()
    } else {
      alert("Please, login!")
    }
  }

  async function deleteWatchlistItem(movie_id) {
    const data = {}
    data[movie_id] = deleteField()


    if (Object.keys(userCredentials).length !== 0) {

      const docRef = doc(db, 'Watchlists', userCredentials.uid);
      await updateDoc(docRef, data);

      await getWatchlists()
    } else {
      alert("Please, login!")
    }
  }



  const handleSearch = (e) => {
    setQuery(e.target.value)
    setIsLoading(true)
  }

  const getMovies = async () => {
    let url = "";
    if (query === "") {
      url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e764649bbb8537331dad79eaec972aa4&page=${page}`
    } else {
      url = `https://api.themoviedb.org/3/search/movie?&api_key=e764649bbb8537331dad79eaec972aa4&page=1&query=${query}`
    }

    const response = await fetch(url)
    const data = await response.json()

    setMovies(data.results)
    setIsLoading(false)
  }

  const getNextPage = () => {
    setIsLoading(true)
    let newPage = page + 1;
    setPage(newPage)

    getMovies()


  }

  const getPreviousPage = () => {
    setIsLoading(true)
    let newPage = 1
    if (page > 1) {
      newPage = page - 1;
    }

    setPage(newPage)

    getMovies()

  }

  useEffect(() => {
    getWatchlists()
  }, [isLogged])

  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query])

  useEffect(() => {
    mapWatchlist()
  }, [userWatchlistIDs])




  return (
    <Router>
      <div className="App">


        <Switch>
          <Route path="/watchlist">
            <Navbar setUserWatchlistIDs={setUserWatchlistIDs} setIsLogged={setIsLogged} getWatchlists={getWatchlists} setUserWatchlist={setUserWatchlist} query={query} handleSearch={handleSearch} userCredentials={userCredentials} setUserCredentials={setUserCredentials} />
            <Watchlist deleteWatchlistItem={deleteWatchlistItem} userWatchlistIDs={userWatchlistIDs} movies={userWatchlist} addWatchlistItem={addWatchlistItem} />
          </Route>
          <Route path="/movie/:id">
            <MoviePage deleteWatchlistItem={deleteWatchlistItem} userWatchlistIDs={userWatchlistIDs} addWatchlistItem={addWatchlistItem} />
          </Route>
          <Route exact path="/">
            <Navbar setUserWatchlistIDs={setUserWatchlistIDs} setIsLogged={setIsLogged} getWatchlists={getWatchlists} setUserWatchlist={setUserWatchlist} query={query} handleSearch={handleSearch} userCredentials={userCredentials} setUserCredentials={setUserCredentials} />
            {!isLoading ? <div>
              <div className="moviesContainer">
                {movies !== undefined ? movies.map((movie) => {
                  return (
                    <div className="movieContainer">
                      <Movie deleteWatchlistItem={deleteWatchlistItem} userWatchlistIDs={userWatchlistIDs} info={movie} key={movie.id} addWatchlistItem={addWatchlistItem} />
                    </div>
                  )
                }) : "Nothing found, please try another input"}
              </div>
              {query === "" ? <div className="hero_buttons">
                <div className="loadless hero_button" onClick={() => {
                  getPreviousPage()
                }}>Prev Page</div>
                <div className="pagecount">{page}</div>
                <div className="loadmore hero_button" onClick={() => {
                  getNextPage()
                }}>Next Page</div>

              </div> : ""}
            </div> : <Loader className="loader" type="ThreeDots" color="#fff" height={80} width={80} />}
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
