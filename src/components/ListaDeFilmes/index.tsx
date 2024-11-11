"use client";

import "../../index.css";
import { List, Avatar } from "flowbite-react";
import { useEffect, useState } from "react";

interface Filme {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
}

interface Video {
  key: string;
  site: string;
  type: string;
}

export const ListaDeFilmes = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [selectedFilme, setSelectedFilme] = useState<Filme | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const API_AUTH = import.meta.env.VITE_API_AUTH;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_AUTH,
      },
    };
    const buscaFilmes = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      );
      const resJson = await res.json();
      setFilmes(resJson.results || []);
    };
    buscaFilmes();
  }, []);

  const handleFilmeClick = async (filme: Filme) => {
    setSelectedFilme(filme);
    setTrailerKey(null); // Limpa o trailer anterior

    const API_AUTH = import.meta.env.VITE_API_AUTH;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_AUTH,
      },
    };

    // Busca o trailer do filme selecionado
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${filme.id}/videos?language=en-US`,
      options
    );
    const resJson = await res.json();

    // Filtra o primeiro vídeo que seja um Trailer e do site YouTube
    const trailer = resJson.results.find(
      (video: Video) => video.type === "Trailer" && video.site === "YouTube"
    );
    setTrailerKey(trailer?.key || null); // Armazena a chave do trailer se existir
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-center font-bold text-gray-800 dark:text-gray-200 mt-4 mb-4">
        Lista de Filmes
      </h1>
      <div className="flex gap-6 max-h-screen overflow-y-scroll mx-auto w-full bg-white bg-gradient-to-r dark:bg-gray-100 p-5">
        <List
          unstyled
          className="flex flex-wrap w-full flex-col overflow-x-auto cursor-pointer  divide-y divide-gray-200 dark:divide-gray-700"
        >
          {filmes.map((filme) => (
            <List.Item
              onClick={() => handleFilmeClick(filme)}
              key={filme.id}
              className={`w-full md:w-1/3 p-2 transition-all duration-300 ${
                selectedFilme?.id === filme.id
                  ? "bg-gray-400 dark:bg-gray-700 shadow-md rounded-lg"
                  : "bg-white dark:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-4">
                <Avatar
                  img={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                  alt={filme.original_title}
                  rounded
                  size="lg"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-black">
                    {filme.original_title}
                  </p>
                </div>
              </div>
            </List.Item>
          ))}
        </List>
        {selectedFilme && (
          <div className="w-full md:w-1/3 border border-gray-700 bg-gray-800 text-white p-4 rounded-lg shadow-lg mt-4 md:mt-0">
            <h1 className="text-2xl font-bold mb-2 text-gray-100 border-b border-gray-600 pb-2">
              {selectedFilme.original_title}
            </h1>
            <p className="text-sm text-gray-300 mt-2 leading-relaxed">
              {selectedFilme.overview}
            </p>
            {trailerKey && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Trailer</h2>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
