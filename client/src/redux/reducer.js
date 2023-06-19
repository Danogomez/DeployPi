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



const initialState = {
    videoGames: [],
    genres: [],
    gameDetail: [],
    copiaVideoGames: [],
};

const rootReducer = (state= initialState, action) => {
   
    switch (action.type) {

        case GET_VIDEO_GAMES:
            return {
                ...state,
                videoGames: action.payload,
                copiaVideoGames: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            };
        case GET_VIDEO_DETAIL:
            return {
                ...state,
                gameDetail: action.payload,
            };

        case DELETE_GAME_DETAIL: 
        return {
         ...state,
         videoGames: state.copiaVideoGames.filter((e)=>e.id !== action.payload),
        };
        case SEARCH_BAR:
            return {
                ...state,
                videoGames: action.payload
            }    
        case GO_HOME : 
            return {
                ...state,
                videoGames: action.payload
            }
        case FILTER_BY_GENRES :
            const allGamesFiltered = state.copiaVideoGames.filter(games => games.genres.includes(action.payload));
            return {
                ...state,
                videoGames: allGamesFiltered
            };
        case FILTER_BY_ORIGIN :
            const  gamesApi = state.copiaVideoGames.filter(game=>!game.created);
            const gamesDb = state.copiaVideoGames.filter(game => game.created);            
            return {
                ...state,
                videoGames:
                action.payload === "allGames" ? state.copiaVideoGames
                : action.payload === "Created" ? gamesDb 
                : gamesApi
            }
            case ORDER_BY_NAME:
            const sortedGames = [...state.videoGames].sort((a, b) => (a.name > b.name) ? 1 : -1);
            return {
                ...state,
                videoGames: action.payload === "A-Z" ? sortedGames : sortedGames.reverse()
            }
            case ORDER_BY_RATING:
                const orderGames = [...state.videoGames].sort((a, b) => (a.rating > b.rating));
            return {
                ...state,
                videoGames: action.payload === "Ascendente" ? orderGames : orderGames.reverse()
            }

            
        default:
          return state;
    }
}

export default rootReducer

