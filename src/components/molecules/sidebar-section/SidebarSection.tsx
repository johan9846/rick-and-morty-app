import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes/Routes";
import LikeIcon from "../../atoms/Like-Icon/LikeIcon";
import { toggleFavoriteCharacter } from "../../../utils/charactersUtils";
import { allCharacterVar } from "../../../apollo/reactiveVars";
import { useReactiveVar } from "@apollo/client";

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
  const characterState = useReactiveVar(allCharacterVar);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  if (list.length === 0) return null;

  return (
    <>
      <header
        onClick={() => setOpen(!open)}
        className=" h-[48px] flex items-center cursor-pointer hover:bg-primary100"
      >
        <div className="text-12 w-full font-semibold text-[14px] pr-20 pl-16 text-[#6B7280] leading-[16px] tracking-wide">
          {title}
        </div>
      </header>

      {open && (
        <div className="w-full flex flex-col ">
          {list.map((character) => (
            <div
              key={character.id}
              className={`pt-16 mt-4  pr-[21px] pl-20 relative hover:bg-primary100 cursor-pointer
                ${
                  character.id == characterState?.characterSelected?.id
                    ? "bg-primary100 rounded-[8px]"
                    : "hover:rounded-[8px]"
                }`}
              onClick={() => {
                console.log("row");

                allCharacterVar({
                  ...allCharacterVar(),
                  characterSelected: character,
                });

                navigate(ROUTES.SELECTED_CHARACTER);
              }}
            >
              <div className="flex gap-[5px] items-center border-b pb-16 border-gray-300 w-full hover:border-transparent focus:border-transparent">
                {/* Imagen circular */}
                <div className="w-[36.8px] h-[32px] rounded-full   overflow-hidden flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    src={character.image}
                    alt={character.name}
                  />
                </div>

                {/* Contenedor de información */}
                <div className="flex justify-between items-center w-full ">
                  <div>
                    <div className="text-16 font-greycliff font-semibold text-custom_black">
                      {character.name}
                    </div>

                    <div className="text-16 text-custom_gray font-greycliff ">
                      {character.species}
                    </div>
                  </div>

                  {/* Icono de "Me gusta" */}
                  <LikeIcon
                    onClick={() => {
                      const toggleInformation = toggleFavoriteCharacter(
                        character,
                        characterState
                      );
                      allCharacterVar({ ...toggleInformation });
                    }}
                    like={!!character.isFavorite}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarSection;
