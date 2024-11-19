"use client";


import "../../index.css";
import { Filme } from "../../types/filme";
import { Video } from "../../types/video";
import { List, Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { ModalFilmes } from "../ModalFilmes";

export const ListaDeFilmes = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [selectedFilme, setSelectedFilme] = useState<Filme | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [trailer, setTrailer] = useState<string>("");
  const [isGrid, setIsGrid] = useState(true);

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
        "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1",
        options
      );
      const resJson = await res.json();
      setFilmes(resJson.results || []);
    };
    buscaFilmes();
  }, []);

  const handleFilmeClick = async (filme: Filme) => {
    setSelectedFilme(filme);
    setModalOpen(true);
    setTrailer("");

    const API_AUTH = import.meta.env.VITE_API_AUTH;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_AUTH,
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${filme.id}/videos?language=pt-BR`,
      options
    );
    const resJson = await res.json();

    const trailer = resJson.results.find(
      (video: Video) => video.type === "Trailer" && video.site === "YouTube"
    );
    setTrailer(trailer?.key || null);
  };

  
  

  return (
    <div
      className="flex flex-col items-center bg-cover bg-center bg-repeat min-h-screen"
      style={{
        backgroundImage: `url('/cinema-background-dark.jpg')`,
        backgroundSize: "450px 450px",
      }}
    >
      <h1 className="text-5xl text-center font-bold text-gray-200 dark:text-gray-200 mt-4 mb-4">
        Lista de Filmes
      </h1>
      <div className="flex flex-col gap-6 max-h-screen overflow-y-scroll mx-auto w-full bg-gradient-to-r dark:bg-gray-100 px-5">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsGrid(!isGrid)}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            {isGrid ? "Exibir como Lista" : "Exibir como Grid"}
          </button>
        </div>
        <List
          unstyled
          className={`grid ${
            isGrid
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
              : "flex flex-col"
          } w-full`}
        >
          {filmes.map((filme) => (
            <li
              onClick={() => handleFilmeClick(filme)}
              key={filme.id}
              className={`p-2 transition-all duration-300 cursor-pointer ${
                selectedFilme?.id === filme.id
                  ? "bg-gray-400 dark:bg-gray-700 shadow-md rounded-lg"
                  : "bg-white dark:bg-gray-100"
              } ${isGrid ? "border rounded-lg shadow" : ""}`}
            >
              <div className="flex items-center space-x-4">
                <Avatar
                  img={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                  alt={filme.original_title}
                  rounded={!isGrid}
                  size="lg"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-black">
                    {filme.original_title}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </List>

        {selectedFilme && <ModalFilmes  isModalOpen={isModalOpen}  setModalOpen={setModalOpen} selectedFilme={selectedFilme} setSelectedFilme={setSelectedFilme} trailer={trailer} />}
      </div>
    </div>
  );
};
