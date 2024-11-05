"use client";

import { Button, Modal } from "flowbite-react";

export function ModalFilmes({ isModalOpen, setModalOpen, selectedFilme }) {
  console.log(selectedFilme);

  return (
    <>
      <Button onClick={() => setModalOpen(false)}>Toggle modal</Button>
      <Modal dismissible show={isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header className="text-gray-900 dark:text-white">{selectedFilme.original_title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {selectedFilme.overview}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
