import style from './Detail.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameId } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Detail = ()=> {
    const {detailId} = useParams();
    
    const detail = useSelector((state) => state.gameDetail);
    const dispatch = useDispatch();
    
     


    useEffect(()=>{
    dispatch(getGameId(detailId));
    },[dispatch, detailId]);
        
    return (
        <div className={style.padre} >

        <div 
      
        className={style.card}
        >
          
          
          <div >
            {detail.name ? (
              <>
                <div>
                  <Link to="/home">
                    <a  className={style.a} href="#"><span >BACK HOME</span><i></i></a>
                  </Link>

                </div>
                <img
                  className={style.imagen}
                  src={detail.background_image}
                //   alt="img"
                  />
                
                <h2 > {detail.name}</h2>
                <p>ID:{detail.id}</p>
                <p>PLATFORMS: {detail.platforms && detail.platforms.join(",  ")}</p>
                <p>GENRES: {detail.genres.join(",  ")}</p>
                <p>RELEASE DATE: {detail.released}</p>
                <p>RATING: {detail.rating}</p>
                <p >DESCRIPTION: {detail.description.replace(/<[^>]+>/g, "")}</p>
                {(detail.created === true)?(<Link to="/home">
                </Link>) : (<div></div>)
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
