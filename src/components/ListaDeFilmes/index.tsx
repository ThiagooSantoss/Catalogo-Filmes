import { useEffect, useState } from "react";
import styles from "./styles.module.css";

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
    console.log(resJson);
    setFilmes(resJson);
  };

  useEffect(() => {
    buscaFilmes();
  }, []);

  return (
    <div>
      <ul>
        {filmes?.results?.map((filme) => (
          <li key={filme.id}> {filme.original_title}</li>
        ))}
      </ul>
    </div>
  );
};
