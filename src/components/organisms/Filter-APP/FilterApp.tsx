import { filterResults, orderList } from "../../../utils/charactersUtils";
import lenIcon from "../../../assets/icons/len_icon.svg";
import ListOrder from "../../molecules/List-Order/ListOrder";
import FilterMenu from "../../molecules/Filter-Menu/FilterMenu";
import { useReactiveVar } from "@apollo/client";
import { filterVar } from "../../../apollo/reactiveVars";


const Filter = () => {
  const filterState = useReactiveVar(filterVar);
  const handleSearch = (e: any) => {
    filterResults(e.target.value);
  };


  return (
    <>
      <span className="flex relative items-center justify-between w-full bg-[#F3F4F6] h-52 rounded-[8px] ">
        <img src={lenIcon} alt="lenIcon" className="pl-20 pr-8" />
        <label className="flex relative w-full h-34">
          <input
            className="w-full h-full outline-none border-none text-custom_gray text-14 bg-transparent "
            onChange={handleSearch}
            placeholder="Search or filter results"
          />
        </label>
        <div>
          <FilterMenu />
        </div>
      </span>


      <div className="flex justify-between mt-16">
        <p className="text-16 text-custom_blue font-sans font-medium">
          {`${filterState?.filteredCharactersCount || 0} Results`}
        </p>

        <section className="bg-secondary600 bg-opacity-20 min-w-min-64 min-h-24 rounded-[12px] pr-12 pl-12 flex items-center justify-center">
          <p className="text-custom_green text-14 font-sans font-medium">
            {`${filterState?.selectedFiltersCount || 0} filter${filterState?.selectedFiltersCount > 1 ? "s" : ""}`}
          </p>
        </section>
      </div>

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
