import { filterResults, orderList } from "../../../utils/charactersUtils";
import lenIcon from "../../../assets/icons/len_icon.svg";
import ListOrder from "../../molecules/List-Order/ListOrder";
import FilterMenu from "../../molecules/Filter-Menu/FilterMenu";

const Filter = () => {
  const handleSearch = (e: any) => {
    filterResults(e.target.value); // 🔥 Aplica el filtro en tiempo real
  };

  return (
    <>
      <span className="flex relative items-center justify-between w-full bg-[#F3F4F6] h-52 rounded-[8px]" >
        <img src={lenIcon} alt="lenIcon"  className="pl-20 pr-8"/>
        <label className="flex relative w-full h-34">
          <input
            className="w-full h-full outline-none border-none text-custom_gray text-14 bg-transparent "
            onChange={handleSearch}
            placeholder="Search or filter results"
          />
        </label>
        <div><FilterMenu/></div>
      </span>

      <div className="mt-[20px]">
        {" "}
        <ListOrder
          ascendantOrder={() => orderList("asc")}
          descendantOrder={() => orderList("desc")}
        />
      </div>
    </>
  );
};

export default Filter;
