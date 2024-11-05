"use client";

import "../../index.css";
import { List, Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { ModalFilmes } from "./ModalFilmes";

export const ListaDeFilmes = () => {
  const API_AUTH = import.meta.env.VITE_API_AUTH;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + API_AUTH,
    },
  };

  const [filmes, setFilmes] = useState([]);
  const [selectedFilme, setSelectedFilme] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const buscaFilmes = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    const resJson = await res.json();
    setFilmes(resJson.results || []);
  };

  useEffect(() => {
    buscaFilmes();
  }, []);

  const openModalHandler = (filme) => {
    console.log(filme.original_title);

    setSelectedFilme(filme);
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    console.log("fechou");

    setModalOpen(false);
    setSelectedFilme(null);
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-5 dark:bg-gray-800">

    <div className="flex justify-center mx-auto w-full bg-white bg-gradient-to-r dark:bg-gray-100 p-5">
      <List
        unstyled
        className="cursor-pointer border border-gray-700 max-w-md divide-y divide-gray-200 dark:divide-gray-700"
      >
        {filmes.map((filme) => (
          <List.Item 
            onClick={() =>
              isModalOpen ? closeModalHandler() : openModalHandler(filme)
            }
            key={filme.id}
            className="p-2"
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse ">
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

        {isModalOpen && (
          <ModalFilmes
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            selectedFilme={selectedFilme}
          />
        )}
      </List>
    </div>
  );
};
