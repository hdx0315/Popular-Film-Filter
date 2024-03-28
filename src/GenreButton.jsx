import { useEffect } from "react";


function GenreButton({
    genre,
    activeGenre, 
    setActiveGenre, 
    setFiltered, 
    popular}) {
    
useEffect(()=>{
    if (activeGenre===0){
        setFiltered(popular);
        return;
    }

    const filtered = popular.filter((movie)=> movie.genre_ids.includes(activeGenre));
    
    setFiltered(filtered);

},[activeGenre])

    return(

        <div className="buttons">
            <button 
                className={activeGenre===genre.id ? 'active' : ''}
                onClick={()=> setActiveGenre(genre.id)}
            >
                {genre.name}
            </button>
        </div>
    )
}

export default GenreButton;