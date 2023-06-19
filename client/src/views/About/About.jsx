import style from './About.module.css';
import { Link } from 'react-router-dom';
import imagen from './imagen/aboutimagenrec.jpg';
import instaLogo from './imagen/instagram3.png';

const About = ()=> {
    return (
        <>
        <div className={style.padre}>
            <div className={style.card}>
            <div className={style.buttonEffect}>
                  <Link to="/home">
                    <button className={style.button}>BACK HOME</button>
                  </Link>
            </div>
      <div>

          <div className={style.instaLinkContainer}>
            <a href="https://www.instagram.com/dano.gomez" target="_blank" rel="noopener noreferrer">
              <img src={instaLogo} alt="Instagram" />
            </a>
            </div>
                <img className={style.imagen} src={imagen} alt="" />
        <h1>Daniel Gómez </h1>
      </div>

                
          </div>
        
        </div>
     </>
    )
};

export default About;