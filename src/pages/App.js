import React, { useState } from "react";
import axios from "axios";

function App() {
  const [movie, setMovie] = useState(null);
  const [showMovieInfo, setShowMovieInfo] = useState(false);

  const handleButtonClick = async () => {
    try {
      // Faça uma solicitação para a API para obter um filme aleatório
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        {
          params: {
            api_key: "6dfee295260276aecbb1ed5558b04579",
            language: "pt-BR",
            page: Math.floor(Math.random() * 100) + 1, // Obtenha um filme aleatório em uma página aleatória
          },
        }
      );

      // Defina o estado do filme para o filme aleatório retornado pela API
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="background-images">
      <div className="container">
        <h1>Não sabe o que assistir?</h1>
        {movie && movie.poster_path && (
          <div className="movie-info">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`Pôster do filme ${movie.title}`}
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        )}

        <div className={`box-down ${movie && movie.poster_path ? "show" : ""}`}>
          <button onClick={handleButtonClick}>Encontrar filme</button>
          <p>
            Clique em "Encontrar filme" que traremos informações de algum filme
            para você assistir hoje.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
