import { useEffect, useState } from 'react';
import style from './Form.module.css';
// import ValidationForm from './ValidationForm' 
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getGenres } from '../../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Form = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getGenres());
    }, [dispatch]) 

    let platforms = [
        "PC",
        "PlayStation",
        "Xbox",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo",
        "PS Vita",
        "PSP",
        "Wii",
        "GameCube",
        "Game Boy",
        "SNES",
        "NES",
        "Commodore",
        "Atari",
        "Genesis",
        "SEGA",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
        "PS5",
        "PS4",
        "PS3",
        "PS2",
        "PS1",
      ];

      const genres = useSelector((state)=> state.genres)
    //   const videogames = useSelector((state)=> state.videogames); 



    const [dataGame, setDataGame] = useState({
        name: '',
        background_image: '',
        description: '',
        platforms: [],
        released: '',
        rating: 0,
        genre: [] ,
    })

    // estado local de selects.. genres y platform
    const [valueSelect, setValueSelect] = useState("0");

    // estado local validador
    const [validate, setValidate] = useState("");

    // HANDLES

    const handleSubmit = async(event)=>{
        event.preventDefault();

        if(dataGame.name.trim === "" || dataGame.name.length < 2) setValidate("Minimun 2 characters are required");
        if(dataGame.released === "") setValidate('Release date required');
        if(dataGame.description.trim() === "") setValidate("Description required");
        if(dataGame.rating === 0) setValidate("Rating must be grather than 0");
        if(dataGame.background_image === "") setValidate("Insert URL image");
        if(dataGame.platforms.length === 0) setValidate ("One or more platforms are required");
        if(dataGame.genre.length === 0) {
            setValidate("One or more genres are required")
        } else {   

    const postGame = await axios.post("http://localhost:3001/videogames", dataGame)

        setValidate("");
        setDataGame({
            name: '',
            background_image: '',
            description: '',
            released: '',
            rating: 0,
            platforms: [],
            genre: [] ,
        })
        dispatch(getAllGames());
        navigate('/home');
        alert(postGame.data.message);
        }        
    };
        
    const handleChange = (e) => {
        e.preventDefault()
        setDataGame({
            ...dataGame,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckGenres = (e) => {
        e.preventDefault();
        const genreAct = e.target.value
        if (genreAct && !dataGame.genre.includes(genreAct)) {
          setDataGame({ ...dataGame, genre: [...dataGame.genre, genreAct] });
        }
      };
    
      const handleClickGenres = (e, index) => {
        e.preventDefault();
        const newGenres = [...dataGame.genre];
        newGenres.splice(index,1)
            setDataGame({
              ...dataGame,
              genre: newGenres,
            });
          
      };


    const handleClickPlatforms = (e, index) => {
        e.preventDefault()
        const newPlatforms = [...dataGame.platforms];
        newPlatforms.splice(index, 1);
        setDataGame({
            ...dataGame,
            platforms: newPlatforms
        });
    };
    const handleCheckPlatforms = (e) => {
        e.preventDefault();
        const platform = e.target.value
        if(platform && !dataGame.platforms.includes(platform)) {
          setDataGame({ ...dataGame, platforms: [...dataGame.platforms, platform] });
        }
        setValueSelect("0");
      };


    // HANDLES


    return (
    <div className={style.padre}>
        
        <div className={style.card}>

        <form onSubmit={handleSubmit}  >

        <Link to="/home">
            <button className={style.button}>BACK HOME</button>
          </Link>
            {/* <a  className={style.a} href="#"><span >BACK HOME</span><i></i></a> */}
        {validate && <div>{validate}</div>}
            <div className={style.todoinput}>
                {/* <label>Name: </label> */}
                <input 
                type="text" 
                placeholder="NAME VIDEOGAME"
                name="name"
                value={dataGame.name} 
                onChange={(e)=> handleChange(e)}
            />
            </div>
            <div className={style.todoinput}>
                <label>RELEASED DATE: </label>
                <input 
                type="date" 
                onChange={(e) => handleChange(e)}
                name="released"
                value={dataGame.released}
            />
            </div>

            <div className={style.todoinput}>
                <textarea
                value={dataGame.description}
                // className={style.input}
                type="text"
                name="description"
                id=""
                cols="30"
                rows="5"
                placeholder="VIDEOGAME DESCRIPTION" 
                onChange={(e) => handleChange(e)}
                ></textarea>
            </div>
            
            <div className={style.todoinput}>
                <select
                    onChange={handleCheckPlatforms}
                    value={valueSelect}
                    id="1"
                >                 
                <option disabled value = "0">
                        PLATFORMS
                 </option>
                {platforms.map((e,index) => {
                    return (
                        <option key={index} value={e}>
                            {e}
                        </option>
                    );
                    })}
                </select>
                <div className={style.todoinput}>
                    {dataGame.platforms.map((e, index) => {
            
                    return (
                        <button
                        // className={style.buttonSelect}
                        // onClick={handleClickPlatforms}
                        onClick={(event) => handleClickPlatforms(event, index)}
                        key={index}
                        value={e}
                        >
                        {e}
                        </button>
                    );
                    })}
                </div>
            </div>

            <div className={style.todoinput}>
                <label for="rating">RATING: </label>
                <input 
                type="range"
                min="0"
                max="5"
                name="rating"
                value={dataGame.rating}
                step="0.1"
                onChange={(e) => setDataGame({...dataGame, rating: e.target.value})}
                />
                <output id="rangevalue">
                    {dataGame.rating}
                </output>
            </div>
            
            <div className={style.todoinput}>
                <input
                value={dataGame.background_image}
                type="text"
                placeholder='VIDEOGAME IMAGE'
                name="background_image"
                onChange={(e) => handleChange(e)}
                />
            </div>
            <div className={style.todoinput}>
                <select
                name="genre"
                value={valueSelect}
                onChange={handleCheckGenres}
                >                 
                    <option disabled value = "0">
                        GENRES
                    </option>
                    {genres.map((e,index) => {
                        return (
                            <option key={index} value={e}>
                                {e}
                            </option>
                        );
                    })}
                </select>

            <div className={style.todoinput} >
                {dataGame.genre.map((e, index) => {
                return (
                    <button
                    // className={style.buttonSelect}
                    onClick={(event)=> handleClickGenres(event, index)}
                    key={index}
                    value={e}
                    >
                    {e}
                    </button>
                    );
                })}
            </div>
            </div>
            <button type="submit"
            className={style.button} >CREATE</button>
        </form>
    </div> 
    </div>


     

    );
};

export default Form;