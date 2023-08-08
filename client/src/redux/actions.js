import {
    GET_VIDEO_GAMES,
    GET_GENRES,
    GET_VIDEO_DETAIL,
    SEARCH_BAR,
    GO_HOME,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    FILTER_BY_GENRES,
    FILTER_BY_ORIGIN,
    DELETE_GAME_DETAIL,
} from './action-types'
import axios from 'axios';


export const getAllGames = ()=> {
    return async function (dispatch) {
        const URL_BASE = 'videogamespi-a4f3.onrender.com/videogames'
        const peticion = await axios.get(URL_BASE)
        
       return dispatch({type: GET_VIDEO_GAMES,  payload: peticion.data})
    };
};


// export const getGenres =  () => {
//     return async function (dispatch) {
//     const URL_BASE = '/genres'
//     const peticion = await axios.get(URL_BASE)
//         const generos = peticion.data.map((e)=>e.name)
//         return dispatch({type: GET_GENRES, payload: generos})
//     }
// }

// 1 modelo con fetch y then...
export const getGenres = ()=> {
    return function (dispatch) {
        const URL_BASE = '/genres'
        axios.get(URL_BASE)
        .then((response)=> {
            const generos = response.data.map((e)=>e.name)
            dispatch({type:GET_GENRES, payload: generos})
        })
    }
}




export const searchBar = (name) => {
    return async function (dispatch) {
    const nameGame = await axios.get(
        `/videogames?name=${name}`
    );
    
    dispatch({type: SEARCH_BAR, payload: nameGame.data})
    
    }
};

export const goHome = () => {
    return async function (dispatch) {
        const URL_BASE = '/videogames'
        const peticion = await axios.get(URL_BASE)
        
       return dispatch({type: GO_HOME,  payload: peticion.data})
    };
}

// delete gameDb.. 
export const delGame = (detailId) => {
    return async function (dispatch) {
    await axios.delete(`/videogames/${detailId}`)
        
        dispatch({ type: DELETE_GAME_DETAIL, payload: detailId })
  
    }
}

// para el detail... 
export const getGameId =  (id) => {
    return async function (dispatch) {
        try {
            const getId = await axios.get(`/videogames/${id}`);
            
            dispatch({type:GET_VIDEO_DETAIL, payload: getId.data})
            
        } catch (error) {
            console.log(error.message)
        }
    }
};



  // filtrado

  export const filterOrigin = (origin)=> {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
  };

  export const filterGenres = (genre)=> {
    return {
        type: FILTER_BY_GENRES, 
        payload: genre
    };
  };

  export const orderByname = (order)=> {
    return {
        type: ORDER_BY_NAME, payload: order
    };
  };

  export const orderByRating = (order)=> {
    return {
        type: ORDER_BY_RATING, payload: order
    }
  };