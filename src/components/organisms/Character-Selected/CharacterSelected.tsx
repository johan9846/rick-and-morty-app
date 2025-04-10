import { useReactiveVar } from "@apollo/client";
import { allCharacterVar } from "../../../apollo/reactiveVars";
import ProfileLike from "../../molecules/Profile-Like/ProfileLike";
import { toggleFavoriteCharacter } from "../../../utils/charactersUtils";
import { useState } from "react";
import { updateComments, deleteComment } from "../../../utils/charactersUtils";
import { nanoid } from "nanoid";
import ArrowBackIcon from "../../../assets/icons/arrow_back_icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes/Routes";

const CharacterSelected = () => {
  const navigate = useNavigate();
  const characterState = useReactiveVar(allCharacterVar);
  const characterSelected = characterState.characterSelected;
  const [inputComment, setInputComment] = useState("");

  if (!characterSelected) return null;

  const handlerUpdateComments = (e: any) => {
    e.preventDefault();
    if (!inputComment.trim() || !characterSelected) return;

    const newComment = {
      id: nanoid(8),
      comment: inputComment,
    };

    updateComments(newComment, characterSelected.id);
    setInputComment("");
  };

  return (
    <div className="flex flex-col md:w-full h-full p-24 pt-0 md:pt-40 md:pr-100 md:pb-40 md:pl-100  overflow-auto">
      <div className="h-[70px] md:hidden flex items-center ">
        <img
          className=" h-24 w-24 cursor-pointer"
          src={ArrowBackIcon}
          alt="arrow_back_icon"
          onClick={() => navigate(ROUTES.HOME)}
        />
      </div>

      <ProfileLike
        img={characterSelected?.image || ""}
        name={characterSelected?.name || "Desconocido"}
        like={!!characterSelected?.isFavorite}
        clickLike={() => {
          const toggleInformation = toggleFavoriteCharacter(characterSelected);
          allCharacterVar({ ...toggleInformation });
        }}
      />

      <div className="flex flex-col w-full h-[74px] justify-center mt-16">
        <h3 className="text-16 font-greycliff font-medium text-black">
          Specie
        </h3>
        <p className="text-16 text-custom_gray"> {characterSelected.species}</p>
      </div>

      <hr />

      <div className="flex flex-col w-full h-[74px] justify-center">
        <h3 className="text-16 font-greycliff font-medium text-black">
          Status
        </h3>
        <p className="text-16 text-custom_gray"> {characterSelected.status}</p>
      </div>

      <hr />

      <div className="flex flex-col w-full h-[74px] justify-center">
        <h3 className="text-16 font-greycliff font-medium text-black">
          Specie
        </h3>
        <p className="text-16 text-custom_gray"> {characterSelected.species}</p>
      </div>

      <hr />

      <form
        className="flex flex-col gap-5 pt-24 pb-12"
        onSubmit={handlerUpdateComments}
      >
        <input
          type="text"
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
          placeholder="Comment"
          className="border p-2 rounded max-w-[200px]"
        />
        <button
          type="submit"
          disabled={!inputComment}
          className="w-[200px] mb-5 bg-primary600 text-white min-h-38 rounded-sm hover:bg-primary700 disabled:bg-custom_gray_dark disabled:cursor-not-allowed disabled:text-custom_gray"
        >
          Add
        </button>
      </form>

      <h3 className="text-lg font-greycliff font-bold">Comentarios</h3>
      <ul className="mt-2 h-auto overflow-auto border border-gray-300 pr-12 pl-12 rounded">
        {characterSelected.comments?.map((comment) => (
          <li
            key={comment.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{comment.comment}</span>
            <button
              onClick={() => deleteComment(comment.id, characterSelected.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterSelected;
