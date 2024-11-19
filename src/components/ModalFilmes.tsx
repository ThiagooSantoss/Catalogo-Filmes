"use client";
import { Button, Modal } from "flowbite-react";
import { FaStar } from "react-icons/fa";

export function ModalFilmes({
  isModalOpen,
  setModalOpen,
  selectedFilme,
  setSelectedFilme,
  trailer,
}) {
  const closeModalHandler = () => {
    console.log("fechou");
    setModalOpen(false);
    setSelectedFilme(null);
  };

  const modalTheme = {
    root: {
      show: {
        on: "bg-opacity-60 fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900",
      },
    },
  } 

  return (
    <>
      <Button onClick={() => closeModalHandler()}>Fechar Modal</Button>
      <Modal
        theme={modalTheme}
        dismissible
        show={isModalOpen}
        onClose={() => closeModalHandler()}
      >
        <Modal.Header className="text-gray-900 dark:text-white">
          {selectedFilme?.original_title || "Título Indisponível"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
              {selectedFilme?.overview || "Descrição não disponível."}
            </p>
            {trailer && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Trailer
                </h2>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="mt-4">
              <h3 className="text-gray-900 dark:text-white text-sm font-bold mb-2">
                Avaliação do TMDB
              </h3>
              <div className="flex items-center text-yellow-500">
                <FaStar className="mr-1" />
                <span className="text-lg text-gray-900 dark:text-white">
                  {selectedFilme?.vote_average?.toFixed(1) || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
