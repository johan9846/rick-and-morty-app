import heartIcon from "../../../assets/icons/heart_icon.svg";
import heartLikeIcon from "../../../assets/icons/heart_like_icon.svg";

interface LikeIconProps {
  like: boolean;
  onClick: () => void;
}

const LikeIcon = ({ like, onClick }: LikeIconProps) => {
  return (
    <div
      onClick={onClick}
      className="w-32 h-32 bg-white flex items-center justify-center rounded-3xl z-20"
    >
      {like ? (
        <img
          className="w-18 h-15-36"
          src={heartLikeIcon}
          alt="heartIcon"
        />
      ) : (
        <img className="w-18 h-15-36 " src={heartIcon} alt="heartIcon"  style={{border:"2px solid red"}}/>
      )}
    </div>
  );
};

export default LikeIcon;
