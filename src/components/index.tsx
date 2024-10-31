"use client";

import "../index.css";
import { List, Avatar } from "flowbite-react";
import { useEffect, useState } from "react";

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

  const buscaFilmes = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    const resJson = await res.json();
    setFilmes(resJson.results || []);
    console.log(resJson.results); // Verifique os resultados recebidos
  };

  useEffect(() => {
    buscaFilmes();
  }, []);

  console.log(filmes); // Verifique o estado dos filmes

  return (
    <div>
      <List
        unstyled
        className="max-w-md divide-y divide-gray-200 dark:divide-gray-700"
      >
        {filmes.map((filme) => (
          <List.Item key={filme.id} className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-5">
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
    </div>
  );
};
