import { orderList } from "../../../utils/charactersUtils";
import ListOrder from "../../molecules/List-Order/ListOrder";
import FilterMenu from "../../molecules/Filter-Menu/FilterMenu";
import { useReactiveVar } from "@apollo/client";
import { filterVar } from "../../../apollo/reactiveVars";
import FilterSearch from "../../molecules/Filter-Search/FilterSearch";

const Filter = () => {
  const filterState = useReactiveVar(filterVar);

  return (
    <>
      <div className="flex relative items-center justify-between w-full bg-[#F3F4F6] h-[52px] rounded-[8px] pt-9 pr-13 pb-9 pl-20">
        <FilterSearch />
        <FilterMenu />
      </div>

      <div className="flex justify-between mt-16">
        <p className="text-16 text-custom_blue font-sans font-medium">
          {`${filterState?.filteredCharactersCount || 0} Results`}
        </p>

        <section className="bg-secondary600 bg-opacity-20 min-w-min-64 min-h-24 rounded-[12px] pr-12 pl-12 flex items-center justify-center">
          <p className="text-custom_green text-14 font-sans font-medium">
            {`${filterState?.selectedFiltersCount || 0} filter${
              filterState?.selectedFiltersCount > 1 ? "s" : ""
            }`}
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
