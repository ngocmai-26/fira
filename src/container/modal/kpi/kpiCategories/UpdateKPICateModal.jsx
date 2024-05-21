import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateKPICategories } from "../../../../thunks/KPICategoriesSlice";
import { setAlert } from "../../../../slices/AlertSlice";
import { TOAST_ERROR } from "../../../../constants/toast";
import ButtonComponent from "../../../component/ButtonComponent";

function UpdateKPICateModal({handleHiddenUpdate}) {
    const { singleKPICategories } = useSelector(
        (state) => state.kpiCategoriesReducer
      );
      console.log("singleKPICategories", singleKPICategories)
    const [newKPICateData, setNewKPICateData] = useState({name: singleKPICategories?.name})
    
    const dispatch = useDispatch();
    const handleUpdate = () => {
      if(!newKPICateData?.name) {
        dispatch(
          setAlert({
            type: TOAST_ERROR,
            content:
              "Vui lòng nhập đầy đủ thông tin",
          })
        );
        return
      }
        dispatch(updateKPICategories({id: singleKPICategories?.id , data: newKPICateData})).then((resp) => {
            if (!resp?.error) {
                handleHiddenUpdate()
            }
          });
    }

    return ( 
        <div
        className={`fixed left-0 right-0 z-50 items-center justify-center flex overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="edit-user-modal"
      >
        <div className="relative w-full h-full max-w-lg px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow "  style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)',
          }}>
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold ">Thêm danh mục KPI</h3>
              <button
                type="button"
                onClick={() => handleHiddenUpdate()}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="edit-user-modal"
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
            <div className="p-6 space-y-6">
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tên danh mục: 
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => setNewKPICateData({...newKPICateData, name: e.target.value})}
                      defaultValue={singleKPICategories?.name}
                      id="name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>

                </div>
                <div className=" py-6  border-gray-200 rounded-b flex justify-end  ">
              
                  <ButtonComponent
                  type={"button"}
                  textButton={"Lưu"}
                  style={
                    "bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 px-5 text-white"
                  }
                  handleClick={handleUpdate}
                />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     );
}

export default UpdateKPICateModal;