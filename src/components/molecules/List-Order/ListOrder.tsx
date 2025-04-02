interface OrderListProps {
  ascendantOrder: () => void;
  descendantOrder: () => void;
}

const ListOrder = ({ ascendantOrder, descendantOrder }: OrderListProps) => {
  return (
    <span className="flex items-center w-full justify-between">
      <p className="text-16 text-custom_blue text-nowrap font-greycliff font-medium">
        Order list
      </p>

      <button
        className="hover:bg-gray-100 p-4 rounded-lgs text-16 hover:text-custom_gray"
        onClick={ascendantOrder}
      >
        A - Z
      </button>
      <button
        className="hover:bg-gray-100 p-4 rounded-lgs text-16 hover:text-custom_gray"
        onClick={descendantOrder}
      >
        Z - A
      </button>
    </span>
  );
};

export default ListOrder;
