import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from './NavBar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { filterGenres, filterOrigin, orderByRating, orderByname } from "../../redux/actions";

const NavBar = () => {
        
    const genres = useSelector(state=> state.genres);
    const dispatch = useDispatch();


    const handleFilterOrigin = (event)=> {
            dispatch(filterOrigin(event.target.value))
            setCurrentPage(1)
    };
    const handleFilterGenre = (event)=> {
            dispatch(filterGenres(event.target.value))
            setCurrentPage(1)
        };

    const handleOrderGames = (event)=> {
        dispatch(orderByname(event.target.value))
    }
    const handleOrderRating = (event)=> {
        dispatch(orderByRating(event.target.value))
    }

    return (
        <nav className={style.mainContainer}>
            <div >
                <Link to='/create'>
                <button onClick={()=> {}}>CREATE GAME</button>
                </Link>
                <Link to='/about'>
                <button onClick={()=> {}}>ABOUT</button>
                </Link>
                <Link to='/home'>
                <button onClick={()=> {}}>HOME</button>
                </Link>
                <Link to='/'>
                <button onClick={()=> {}}>LOG OUT</button>
                </Link>
            </div>
                <SearchBar />
            <div>
                <div>
                <select 
                    onChange={(e) => {
                        handleFilterOrigin(e)}}
                    defaultValue="0"
                    >
                        <option disabled value="0">
                            FILTER BY ORIGIN
                        </option>
                        <option value="allGames">ALL</option>
                        <option value="Created">CREATED</option>
                        <option value="API">API</option>
                        </select>
                </div>
                <div>
                    <select 
                    onChange={handleFilterGenre}
                    defaultValue="0"
                    >
                        <option disabled value="0">
                            FILTER BY GENRES
                        </option>
                        {genres.map((genre, index )=>{
                            return (
                                <option key={index} value={genre}>{genre}</option>
                                );
                            })}
                        </select>
                </div>
                <div>
                <select 
                    onChange={handleOrderGames}
                    defaultValue="0"
                    >
                        <option disabled value="0">
                            ORDER BY NAME
                        </option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        
                        </select>
                </div>
                <div>
                <select 
                    onChange={handleOrderRating}
                    defaultValue="0"
                    >
                        <option disabled value="0">
                            ORDER BY RATING
                        </option>
                        <option value="1-9">1-9</option>
                        <option value="9-1">9-1</option>
                        
                        </select>
                </div>

            </div>
        </nav>
    )
};

export default NavBar;