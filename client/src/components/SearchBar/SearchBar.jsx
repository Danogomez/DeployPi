import style from './SearchBar.module.css';
import { useDispatch } from "react-redux";
import { useState, } from "react";
import { getAllGames, searchBar } from "../../redux/actions";



const SearchBar = ({setCurrentPage}) => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    


    const handleSearch = (event) => {
        // event.preventDefault();
        setName(event.target.value)
        
    };

    const dispatchName = (e) => {
        e.preventDefault()
        dispatch(searchBar(name))
        .then(res => setCurrentPage(1))
        
        setName("");   
        
    };

    const showAll = e => {
        dispatch(getAllGames())
    }

    return (
        <div >
            <form >
                <input className={style.input} 
                type="text" 
                placeholder="Find by name"
                onChange={handleSearch}
                value ={name}
                />
                <button className={style.button} onClick={(e)=> dispatchName(e)}>SEARCH</button>
                <button className={style.button} onClick={e=>showAll(e)}>RESET FILTERS</button>
            </form>

        </div>
    )
}

export default SearchBar;