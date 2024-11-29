import Img from "./Image"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
function Movies({movies}){
 
  let history = useHistory()

    return (
      <div
        onClick={() => {
          history.push(`/movies/${movies.id}`);
        }}
        className="w-max hover:cursor-pointer"
      >
        <Img link={movies.poster_path} />
        <p> {movies.original_title}</p>
      </div>
    );
    
    

}


export default Movies