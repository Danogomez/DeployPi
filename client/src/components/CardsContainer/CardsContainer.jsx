import style from './CardsContainer.module.css';

import Card from "../Card/Card";

const CardsContainer = ({games}) => {
    

    return (
            
        <div className={style.container}>


          {games.map(({ id, background_image, name, genres, rating }) => (
            <Card
            key={id} 
            background_image={background_image} 
            name={name} 
            genres={genres} 
            id={id} 
            rating={rating} 
            />
          ))}
        </div>        
    );
  };
  
  export default CardsContainer;