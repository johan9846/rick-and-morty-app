import { MouseEvent } from "react";
import heartIcon from "../../../assets/icons/heart_icon.svg";
import heartLikeIcon from "../../../assets/icons/heart_like_icon.svg";

interface LikeIconProps {
  like: boolean;
  onClick: () => void;
}

const LikeIcon = ({ like, onClick }: LikeIconProps) => {
  return (
    <div
      onClick={(e: MouseEvent<HTMLDivElement>) => {
       
        e.stopPropagation();
        onClick()
      }}
      className="w-[32px] h-[32px] bg-white flex items-center justify-center rounded-3xl z-20"
    >
      {like ? (
        <img
          className="w-[18px] h-[15.3px]"
          src={heartLikeIcon}
          alt="heartIcon"
        />
      ) : (
        <img className="w-[20px] h-[20px]" src={heartIcon} alt="heartIcon" />
      )}
    </div>
  );
};

export default LikeIcon;
