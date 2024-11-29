import axios from "axios";
import { useEffect, useState  , useMemo} from "react";
import { useParams  } from "react-router-dom";
import Img from "../components/Image";


function MovieDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { movieID } = useParams();
  

  useEffect(() => {
    async function fetchData() {
      setLoading(true); 
      setError(""); 
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        setData(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false); 
      }
    }
    fetchData();
  }, [movieID]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      {data ? (
        <>
         <div className="h-1/4 p-6 flex flex-wrap justify-center"  style={{
    background: `linear-gradient(to top, #000000ad, #000000), url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
         <Img link={data.poster_path} />
         <div className="p-5 w-3/4  sm:flex-col md:w-3/4">
         <h1>{data.original_title}</h1>
         <h2>{data.tagline }</h2>
         <br />
         <p>{data.release_date} ({data.origin_country?.join(',')}) <span>&#8226;</span>  {data.genres?.map(item=>item.name).join(",")}</p>
         <br />
         <h2>Overview</h2>
         <p>{data.overview}</p>
         </div>
         </div>
         
         <div className="flex flex-wrap gap-8 p-5 bg-slate-50 rounded-md justify-between">
          {data.production_companies.map(item=>{
            return(
              <img src={'https://image.tmdb.org/t/p/w500'+item.logo_path} alt="" style={{height:'90px'}} />
            )
          })}
         </div>

         <div className="">
          <h3>
            Production Countries
            <ul>
            {data.production_countries?.map(item=>item.name).map(bs=>(<li>{bs}</li>))}
            </ul>
          </h3>
          <div className="text-center">
            <button className="p-4 border-none bg-lime-600">Play Now</button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          
         </div>
         
        </>
      ) : (
        <Error message="No data found." />
      )}
    </div>
  );
}

function Loading() {
  return <h1>...Loading</h1>;
}

function Error({ message }) {
  return <h1 style={{ color: "red" }}>{message}</h1>;
}

export default MovieDetails;
