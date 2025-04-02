import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes/Routes";
import LikeIcon from "../../atoms/Like-Icon/LikeIcon";
import { toggleFavoriteCharacter } from "../../../utils/charactersUtils";
import { allCharacterVar } from "../../../apollo/reactiveVars";

interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  comments?: Comment[];
  occupation?: string;
  isFavorite?: boolean;
}

export interface Comment {
  id: string;
  comment: string;
}

interface SidebarSectionProps {
  title: string;
  list: Character[];
}

const SidebarSection = ({ title, list }: SidebarSectionProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  if (list.length === 0) return null;
  const selectedCharacter = allCharacterVar().characterSelected;

  return (
    <>
      <header
        onClick={() => setOpen(!open)}
        className="min-h-56 flex items-center cursor-pointer hover:bg-primary100"
      >
        <h1 className="text-12 w-full pr-16 pl-16 text-gray">{title}</h1>
      </header>

      {open && (
        <div className="w-full flex flex-col pt-16 pb-16 ">
          {list.map((character) => (
            <div
              key={character.id}
              className={`flex gap-3 border-b border-gray-300 items-center pt-12 mt-4 pb-12 pr-20 pl-20 relative hover:bg-primary100 cursor-pointer
                ${
                  character.id == selectedCharacter?.id
                    ? "bg-primary100 rounded-[8px]"
                    : "hover:rounded-[8px]"
                }`}
              onClick={() => {
                allCharacterVar({
                  ...allCharacterVar(), // Mantiene el estado actual completo
                  characterSelected: character, // Reemplaza el personaje anterior
                });
                navigate(ROUTES.SELECTED_CHARACTER);
              }}
            >
              {/* Imagen circular */}
              <div className="w-[42px] h-[34px] rounded-full overflow-hidden flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src={character.image}
                  alt={character.name}
                />
              </div>

              {/* Contenedor de información */}
              <div className="flex justify-between items-center w-full ">
                <div>
                  <h3 className="text-16 font-greycliff font-semibold text-black">
                    {character.name}
                  </h3>

                  <p className="text-16 text-custom_gray">
                    {character.species}
                  </p>
                </div>

                {/* Icono de "Me gusta" */}
                <LikeIcon
                  onClick={() => toggleFavoriteCharacter(character)}
                  like={!!character.isFavorite}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarSection;
