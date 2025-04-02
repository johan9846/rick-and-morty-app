import { useState } from "react";
import LikeIcon from "../atoms/LikeIcon/LikeIcon";
import { useReactiveVar } from "@apollo/client";
import { allCharacterVar } from "../../apollo/reactiveVars";

interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
}

interface SidebarSectionProps {
  title: string;
  list: Character[];
}

const SidebarSection = ({ title, list }: SidebarSectionProps) => {
  const [open, setOpen] = useState(true);
  const characterState = useReactiveVar(allCharacterVar);

  // Función para agregar o quitar favoritos
  const toggleFavorite = (character: Character) => {
    const isFavorite = characterState.favoritesCharacter.some(
      (fav) => fav.id === character.id
    );

    if (isFavorite) {
      // Si está en favoritos, lo eliminamos y lo devolvemos a allCharacter
      allCharacterVar({
        allCharacter: [...characterState.allCharacter, character], // Lo añadimos a allCharacter
        favoritesCharacter: characterState.favoritesCharacter.filter(
          (fav) => fav.id !== character.id
        ), // Lo quitamos de favoritos
      });
    } else {
      // Si NO está en favoritos, lo agregamos
      allCharacterVar({
        allCharacter: characterState.allCharacter.filter(
          (char) => char.id !== character.id
        ), // Lo quitamos de allCharacter
        favoritesCharacter: [...characterState.favoritesCharacter, character], // Lo añadimos a favoritos
      });
    }
  };

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
        <div
          className="w-full flex flex-col"
          style={{ border: "2px solid red" }}
        >
          {list.map((character) => (
            <div key={character.id} style={{ margin: 10, textAlign: "center" }}>
              <img
                src={character.image}
                alt={character.name}
                style={{ borderRadius: "50%" }}
              />
              <h3>{character.name}</h3>
              <p>{character.species}</p>

              {/* LikeIcon cambia según si el personaje está en favoritos */}
              <LikeIcon
                onClick={() => toggleFavorite(character)}
                like={characterState.favoritesCharacter.some(
                  (fav) => fav.id === character.id
                )}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarSection;
