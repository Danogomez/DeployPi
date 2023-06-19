import style from './About.module.css';
import { Link } from 'react-router-dom';

// pepe
const About = ()=> {
    return (
        <>
        <div className={style.padre}>
            <div className={style.card}>
            <div className={style.buttonEffect}>
                  <Link to="/home">
                    <button className={style.button}>BACK HOME</button>
                  </Link>

                <img src="client/src/views/About/imagen/aboutimagen.jpg" alt="" />
                </div>

                
        <h1>Esta es la vista de About!</h1>
        
            </div>
        </div>
     </>
    )
};

export default About;