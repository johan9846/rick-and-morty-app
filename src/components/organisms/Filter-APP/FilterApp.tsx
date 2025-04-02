
import {  filterResults, orderList } from "../../../utils/charactersUtils";
import lenIcon from "../../../assets/icons/len_icon.svg";
import ListOrder from "../../molecules/List-Order/ListOrder";

const Filter = () => {
  const handleSearch = (e:any) => {
    filterResults(e.target.value); // 🔥 Aplica el filtro en tiempo real
  };

  return (
    <div>
      <span className="flex relative items-center justify-between w-full bg-[#F3F4F6] h-52 rounded-[8px] pt-9 pr-13 pb-9 pl-20">
        <img src={lenIcon} alt="lenIcon" />
        <label className="flex relative w-full h-34">
          <input
            className="w-full h-full outline-none border-none text-custom_gray text-14 bg-transparent p-2"
            onChange={handleSearch}
            placeholder="Search or filter results"
          />
        </label>
      </span>


      <ListOrder
        ascendantOrder={() => orderList("asc")}
        descendantOrder={() => orderList("desc")}
      />
    </div>
  );
};

export default Filter;
