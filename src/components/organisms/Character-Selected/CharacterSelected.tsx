import { useReactiveVar } from "@apollo/client";
import { allCharacterVar } from "../../../apollo/reactiveVars";
import ProfileLike from "../../molecules/ProfileLike/ProfileLike";
import { toggleFavoriteCharacter } from "../../../utils/charactersUtils";
import { useState } from "react";
import { updateComments,deleteComment } from "../../../utils/charactersUtils";
import { nanoid } from "nanoid";

const CharacterSelected = () => {
  const { characterSelected } = useReactiveVar(allCharacterVar);
  const [inputComment, setInputComment] = useState("");


  if (!characterSelected) return null;


  const handlerUpdateComments = (e:any) => {
    e.preventDefault();
    if (!inputComment.trim() || !characterSelected) return;
  
    const newComment = {
      id: nanoid(8), // Genera un ID único para el comentario
      comment: inputComment,
    };
  
    updateComments(newComment, characterSelected.id);
    setInputComment(""); // Limpiar el input después de agregar el comentario
  };
  

  return (
    <div
      className="flex flex-col md:w-full h-full md:pt-40 pt-20 md:pr-100 pr-50 pb-40 md:pl-100 pl-50 overflow-auto"
      style={{ border: "5px solid yellow" }}
    >
      <h2>Personajes Seleccionados</h2>

      <ProfileLike
        img={characterSelected?.image || ""}
        name={characterSelected?.name || "Desconocido"}
        like={!!characterSelected?.isFavorite}
        clickLike={() =>
          characterSelected && toggleFavoriteCharacter(characterSelected)
        }
      />

      <div className="flex flex-col w-full min-h-74 pt-16 pr-24 pb-16">
        <h3 className="text-16 font-greycliff font-medium text-black">Specie</h3>
        <p className="text-16 text-custom_gray"> {characterSelected.species}</p>
      </div>

      <div className="flex flex-col w-full min-h-74 pt-16 pr-24 pb-16">
        <h3 className="text-16 font-greycliff font-medium text-black">Status</h3>
        <p className="text-16 text-custom_gray"> {characterSelected.status}</p>
      </div>

      <div className="flex flex-col w-full min-h-74 pt-16 pr-24 pb-16">
        <h3 className="text-16 font-greycliff font-medium text-black">Specie</h3>
        <p className="text-16 text-custom_gray"> {characterSelected.species}</p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handlerUpdateComments}>
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
          className="w-[200px] mb-5 bg-primary600 text-white min-h-38 w-full rounded-sm hover:bg-primary700 disabled:bg-custom_gray_dark disabled:cursor-not-allowed disabled:text-custom_gray"
        >
          Add
        </button>
      </form>

      {/* Lista de comentarios */}
      <div className="mt-5">
        <h3 className="text-lg font-bold">Comentarios</h3>
        <ul className="mt-2">
          {characterSelected.comments?.map((comment) => (
            <li key={comment.id} className="flex justify-between items-center border-b py-2">
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
    </div>
  );
};

export default CharacterSelected;
