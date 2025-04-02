import { useState } from "react";
import LikeIcon from "../../atoms/LikeIcon/LikeIcon";
import { toggleFavoriteCharacter } from "../../../utils/charactersUtils";

interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  comments?: Comment[];
  occupation?: string;
  isFavorite?: boolean;
}

interface SidebarSectionProps {
  title: string;
  list: Character[];
}

const SidebarSection = ({ title, list }: SidebarSectionProps) => {
  const [open, setOpen] = useState(true);

  if (list.length === 0) return null;

  return (
    <>
      <header
        onClick={() => setOpen(!open)}
        className="min-h-56 flex items-center cursor-pointer hover:bg-gray-200"
      >
        <h1 className="text-12 w-full pr-16 pl-16 text-gray">{title}</h1>
      </header>

      {open && (
        <div className="w-full flex flex-col pt-16 pr-20 pb-16 pl-20 border-2 border-green-500"  >
          {list.map((character) => (
            <div key={character.id} className="flex gap-5 items-center pt-12 pb-12" style={{border:"4px solid black"}}>
              {/* Imagen circular */}
              <div className="h-32 w-32 flex items-center justify-center rounded-full overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={character.image}
                  alt={character.name}
                />
              </div>

              {/* Contenedor de información */}
              <div className="flex justify-between items-center w-full border-2 border-red-500">
                <div>
                  <h3>{character.name}</h3>
                  <p>{character.species}</p>
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
