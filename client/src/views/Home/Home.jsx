import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getAllGames, getGenres, } from '../../redux/actions';
import style from './Home.module.css';
import NavBar from "../../components/NavBar/NavBar";

const pageSize = 15

const Home = ()=> {

    const videoGames = useSelector((state) => state.videoGames)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);

        useEffect(()=>{
        dispatch(getGenres());
        dispatch(getAllGames())

        .then(res=>setLoading(false));
    },[dispatch]);
    
    const gamesPage = 15; 
  
    const indexOfLastGame = currentPage * gamesPage;
    const indexOfFirstGame = indexOfLastGame - gamesPage;
    const currentGames = videoGames.slice(indexOfFirstGame, indexOfLastGame);
  
    const totalPages = Math.ceil(videoGames.length / gamesPage);
  
    const handlePageChange = page => {
      setCurrentPage(page);
    };
    //
  
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const next = () => {
        if(currentPage < pageNumbers.length) {
          setCurrentPage(currentPage + 1);
        }
      };
      const prev = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }; 
    return (
              <div className={style.landing}>
      
            
            <NavBar setCurrentPage={setCurrentPage}  ></NavBar>
            
            
        <div className={style.paginado}>
          <button className={style.unButton} onClick={prev}>PREV</button>
          {pageNumbers.map(number => (
            <button className={style.unButton} key={number} onClick={() => handlePageChange(number)}>
              {number}
            </button>
          ))}
          <button className={style.unButton} onClick={next}>NEXT</button>
        </div>
        <div className={style.main}>
        {loading ? (
          <div>

         <img src="https://media0.giphy.com/media/cnzP4cmBsiOrccg20V/giphy.gif?cid=ecf05e47r7afbzr9drng3k6xdvih33w728pf6djy7lseyde1&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Cargando..."/>
          </div>
        )
        : videoGames.length === 0 ? 
        <h1 className={style.card}>Not videogames Found</h1> 
        : 
        (
            <div className={style.cardsContainer}>
                <CardsContainer games={currentGames}/>
            </div>
            )
        }
        </div>
        <div className={style.paginado} >
          <button className={style.unButtonAbajo} onClick={prev}>PREV</button>
          {pageNumbers.map(number => (
            <button className={style.unButtonAbajo} key={number} onClick={() => handlePageChange(number)}>
              {number}
            </button>
          ))}
          <button className={style.unButtonAbajo} onClick={next}>NEXT</button>
        </div>
        </div>  
        
    )
};
export default Home;