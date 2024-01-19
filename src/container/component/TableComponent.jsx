import ButtonComponent from "./ButtonComponent";

function TableComponent({ headTable, children }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 table-fixed">
      <thead className="bg-gray-100 ">
        <tr>
          {headTable.map((item) => (
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {children}
      </tbody>
    </table>
  );
}

export default TableComponent;
