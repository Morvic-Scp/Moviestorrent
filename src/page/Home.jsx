import Movies from "../components/Movies"
import axios from 'axios'
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Gauge,gaugeClasses } from '@mui/x-charts/Gauge';
import _ from "lodash";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

export default function home(){


    const  [data, setData] = useState([]) 
    const  [WatchList, setWatchList] = useState([]) 
    const [page, setPage] = useState(1);
    console.log("rwak")

     // Throttled fetch function
  const fetchMovies = useCallback(
    _.throttle(async () => {
      try {
        const {data} = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc` ,  {
            headers:  {
              "Authorization":`Bearer ${import.meta.env.VITE_API_KEY}`
            }
      });
      setData((prev)=>{
        return [...prev,data?.results].flat()
      })
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      } 
    }, 1000), // Throttle: Call once every 1000ms
    [page]
  );

    useEffect(() => {
      fetchMovies();
    }, [page, fetchMovies]);
  
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        (document.documentElement.offsetHeight-200)
      ) {
        setPage((prevPage) => prevPage + 1); // Increment page when reaching bottom
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const response = await axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",  {
            headers:  {
              "Authorization":`Bearer ${import.meta.env.VITE_API_KEY}`
            }
        });
          setWatchList(response.data?.results||[]); // Set the data to state
        } catch (err) {
          console.log(err)
        }
      };
      fetchData()
      },[])
    return (
      <>
       <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        autoplay={{
          delay: 9900,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay,EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {WatchList.map(movie=>{
           return (
            <SwiperSlide className="relative">
              <img src={"https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces"+movie.backdrop_path} />
              <div className="absolute bottom-0 flex gap-4 w-full p-4" style={{background:"#0000007d"}}>
                <div className="">
                <h1>{movie.title}</h1>
                <h2>Release Date {movie.release_date}</h2>
                </div>
                <div className="w-14">
                  <Gauge
                    width={60} 
                    height={60} 
                    value={parseInt((movie.popularity / 5000) * 100)}
                    sx={(theme) => ({
                      [`& .${gaugeClasses.valueText} tspan`]: {
                        fill: '#fff',
                      },
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#52b202',
                      },
                      [`& .${gaugeClasses.referenceArc}`]: {
                        fill: theme.palette.text.disabled,
                      },
                    })}
                    />
                </div>

              </div>
            </SwiperSlide>
           )
        })}
       
        
      </Swiper>

       <div className="flex gap-x-4 flex-wrap justify-center flex-row sm:flex-col md:flex-row lg:flex-row xl:flex-row">
        {data.map((d, i)=>(<Movies key={i} movies={d}/>))}
       </div>
      </>
    )
}