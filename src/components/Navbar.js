import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from "../firebase"




const Navbar = ({ setIsLogged, query, handleSearch, userCredentials, setUserCredentials, setUserWatchlist, getWatchlists, setUserWatchlistIDs }) => {

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                setUserCredentials(user)
                setIsLogged(true)
                getWatchlists()
                // ...
            })

    }

    const signOutGoogle = () => {
        const auth = getAuth(app);
        signOut(auth)
        setUserCredentials({})
        setUserWatchlist([])
        setUserWatchlistIDs([])
        setIsLogged(false)

        window.location.reload()
    }

    return (
        <nav className="navbar">
            <Link to={'/'} className="heroTitleLink">
                <h1 className="heroTitle">Movie's database</h1>
            </Link>
            <form className="search" onSubmit={(e) => { e.preventDefault() }}>
                <input type="text" className="searchTerm" placeholder="Input your movie..." value={query} onChange={handleSearch} />
                <button type="submit" className="searchButton">
                    <FaSearch />
                </button>
            </form>
            <div>
                {Object.keys(userCredentials).length === 0 ?
                    <button onClick={() => {
                        googleSignIn()
                    }} type="button" className="login-with-google-btn" >
                        Sign in with Google
                    </button> :
                    <div className="userWrapper">
                        <Link to={'/watchlist'}>
                            <div className="userInfo">
                                <div className="userName">
                                    Watchlist
                                </div>
                                <div className="userPhoto">
                                    <img className="userPhotoSource" src={userCredentials.photoURL} alt="User Photo" />
                                </div>
                            </div>
                        </Link>
                        <button className="logoutButton" onClick={() => { signOutGoogle() }}>Logout</button>
                    </div>

                }

            </div>

        </nav >
    )
}

export default Navbar
