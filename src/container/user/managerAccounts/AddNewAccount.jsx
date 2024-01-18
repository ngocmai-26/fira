import { Link } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import { ErrorField } from "../../component/ErrorField";
import { useState } from "react";
import Layout from "../../layout";
import { FormField } from "../../component/FormField";
import { useSelector } from "react-redux";

function AddNewAccount() {
  const [newUserData, setNewUserData] = useState({});
  
  const { errors } = useSelector((state) => state.authReducer);
  return (
    <Layout>
      <div className="p-4 FormAddNewAccount w-2/4 m-auto">
        <div className="title pt-3 text-center">
          <span className="text-xl font-bold uppercase">
            Thêm tài khoản
          </span>
        </div>
       
        <div className="">
        <form action="" className="py-0 sm:py-4">
          <div className="grid grid-cols-2 gap-3">
          <div className="firstName py-5">
            <div className="">
              <div className="">
                <label htmlFor="firstName" className="font-medium text-sm">
                  Firstname
                </label>
                <FormField
                  name={"firstName"}
                  values={newUserData}
                  id={"firstName"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"firstName"} />}
              </div>
            </div>
          </div>
          <div className="lastName py-5">
            <div className=" ">
              <div className="relative">
                <label htmlFor="lastName" className="font-medium text-sm">
                  Lastname
                </label>
                <FormField
                  name={"lastName"}
                  values={newUserData}
                  id={"lastName"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"lastName"} />}
              </div>
            </div>
          </div>
          
          
          <div className="address py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="address" className="font-medium text-sm">
                  Address
                </label>
                <FormField
                  name={"address"}
                  values={newUserData}
                  id={"address"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"address"} />}
              </div>
            </div>
          </div>

          <div className="birthday py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="birthday" className="font-medium text-sm">
                  Birthday
                </label>
                <FormField
                  name={"birthday"}
                  values={newUserData}
                  id={"birthday"}
                  setValue={setNewUserData}
                  type={"date"}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"birthday"} />}
              </div>
            </div>
          </div>

          <div className="department py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="department" className="font-medium text-sm">
                  Department
                </label>
                <FormField
                  name={"department"}
                  values={newUserData}
                  id={"department"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"department"} />}
              </div>
            </div>
          </div>

          <div className="phone py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="phone" className="font-medium text-sm">
                  Phone
                </label>
                <FormField
                  name={"phone"}
                  values={newUserData}
                  id={"phone"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"phone"} />}
              </div>
            </div>
          </div>
          </div>
          <div className="text-center py-3 flex justify-end">
            <Link
              to="/login"
              className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2"
            >
              Quay lại
            </Link>

            <ButtonComponent
         
              type={"button"}
              textButton={"Hoàn thành"}
              style={
                "bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 px-5  mr-3 mb-3"
              }
            />
          </div>
        </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddNewAccount;
