import React from "react";
import { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";
import requests from "./requests";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
const base_url = "https://image.tmdb.org/t/p/original";
const Row = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);			
            setMovies(request.data.results);
            console.log(movies);
            return request;            
		}
		fetchData();
	}, [fetchUrl]);
	const opts = {
		height: '390',
		width: "100%",
		playerVars: {
			autoplay:1,
		},
	}
	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl('')
		} else {
			movieTrailer(movie?.title || movie?.name || movie?.original_name)
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search)
					// console.log(urlParams)
					setTrailerUrl(urlParams.get('v'));
					
			})
		}
	}
	console.log(trailerUrl);
	return (
		<div className="row">
			<h1>{title}</h1>
			<div className="row__posters">
				{movies.map((movie) => (
					<img
						onClick={()=>handleClick(movie)}
						className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`}
						alt={movie.name}
					/>
				))}
			</div>
			<div style={{ padding: '40px' }}>
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
			</div>
		</div>
	);
};

export default Row;
