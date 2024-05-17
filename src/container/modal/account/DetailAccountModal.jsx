import moment from "moment";
import { useSelector } from "react-redux";

function DetailAccountModal({setShowRoleById}) {
    const { singleAccount } = useSelector(
        (state) => state.accountsReducer
      );
    return ( 
        <div
        className={`fixed mx-auto left-0 right-0 z-50 items-center justify-center mt-10  overflow-x-hidden overflow-y-auto md:inset-0 h-modal sm:h-full`}
        id="edit-user-modal"
      >
        <div className="relative w-full h-full max-w-xl px-4 md:h-auto m-auto">
          <div className="relative bg-white rounded-lg shadow " style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)',
      }}>
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold ">Thông tin chi tiết</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="edit-user-modal"
                onClick={() => setShowRoleById(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <form action="#">
                <div className="">
                  <div className="mt-3">
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      value={singleAccount?.username}
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Họ và Tên
                    </label>
                    <span
                      name="phone"
                      id="phone"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      {singleAccount?.user?.fullName ||
                        "Người dùng chưa cập nhập dữ liệu"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <span
                      name="email"
                      id="email"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      {singleAccount?.user?.email ||
                        "Người dùng chưa cập nhập dữ liệu"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Số điện thoại
                    </label>
                    <span
                      name="phone"
                      id="phone"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      {singleAccount?.user?.phone ||
                        "Người dùng chưa cập nhập dữ liệu"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="birthday"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Ngày sinh
                    </label>
                    <span
                      name="phone"
                      id="phone"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      {moment(singleAccount?.user?.birthday).format(
                        "DD-MM-YYYY"
                      ) || "Người dùng chưa cập nhập dữ liệu"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="birthday"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Phòng ban
                    </label>
                    <span
                      name="department"
                      id="department"
                      disabled
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      {singleAccount?.user?.department ||
                        "Người dùng chưa cập nhập dữ liệu"}
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     );
}

export default DetailAccountModal;