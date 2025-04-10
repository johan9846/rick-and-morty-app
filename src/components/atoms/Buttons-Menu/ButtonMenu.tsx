

interface ICountry {
  title: string | null;
  list: Ilist[];
  filters: string|null;
  onChange: (e: string|null) => void;
}

interface Ilist {
  name: string;
  value: string | null;
}

const ButtonsMenu = ({ title, list, filters, onChange }: ICountry) => {
  return (
    <>
      <div className="text-[14px] font-medium font-greycliff mb-2 text-[#6B7280]">
        {title}
      </div>
      <div className="flex gap-2 mb-6 justify-between ">
        {list.map((option) => (
          <button
            key={option.name}
            className={`w-[102px] h-[44px] font-greycliff rounded-[8px] text-[14px] font-semibold
      ${
        filters === option.value
          ? "bg-[#EEE3FF] text-[#8054C7]"
          : "border border-[1px] border-[#E5E7EB] text-[#111827]"
      }`}
            onClick={() => onChange(option.value)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </>
  );
};
export default ButtonsMenu;
