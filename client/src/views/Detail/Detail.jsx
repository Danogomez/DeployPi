import style from './Detail.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameId, delGame, getAllGames } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Detail = ()=> {
    const {detailId} = useParams();
    const detail = useSelector((state) => state.gameDetail);
    const dispatch = useDispatch();
    
    

    useEffect(()=>{
      
    dispatch(getGameId(detailId));
    },[dispatch, detailId]);
        
    const handleDelete = () => {
      dispatch(delGame(detailId));
      dispatch(getAllGames())
    };

      return (
        <div className={style.padre} >
        <div className={style.card}>
          <div >
            {detail.name ? (
              <>
                <div className={style.buttonEffect}>
                  <Link to="/home">
                    {/* <a  className={style.a} href="#"><span >BACK HOME</span><i></i></a> */}
                    <button  className={style.button}>BACK HOME</button>
                  </Link>

                </div>
                
                <img
                  className={style.imagen}
                  src={detail.background_image}
                //   alt="img"
                  />
                <h1 className={style.h1} > {detail.name}</h1>
                <p>ID:{detail.id}</p>
                <p>PLATFORMS: {detail.platforms && detail.platforms.join(",  ")}</p>
                <p>GENRES: {detail.genres.join(",  ")}</p>
                <p>RELEASE DATE: {detail.released}</p>
                <p>RATING: {detail.rating}</p>
                <p >DESCRIPTION: {detail.description.replace(/<[^>]+>/g, "")}</p>
                {(detail.created === true)
                ? 
                (<Link to="/home">
                <button onClick={handleDelete}>DELETE GAME
                </button>
                </Link> )
                : (<div></div>)
                }
              </>
            ) : (
              <h1>im loading</h1>
            )}
          </div>
        </div>
        </div>
      )
};

export default Detail;
