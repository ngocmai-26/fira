function TableComponent({ headTable, bodyTable }) {
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
        {bodyTable?.map((item, key) => (
          <tr className="hover:bg-gray-100" key={key}>
            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
              <div className="text-base font-semibold text-gray-900">
                {key + 1}
              </div>
            </td>
            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
              {item?.name}
            </td>
            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
              {item?.email}
            </td>
            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
              {item?.phone}
            </td>
            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
              {item?.department}
            </td>
            <td className="p-4 space-x-2 whitespace-nowrap">
              <button
                type="button"
                id="updateaccountButton"
                className="bg-blue-500 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Chỉnh sửa
              </button>
              
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Vô hiệu hóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
