import { Filme } from "./filme";

export interface ModalFilmesProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  selectedFilme: Filme | null;
  setSelectedFilme: (filme: Filme | null) => void;
  trailer: string;
}
