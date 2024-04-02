import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormField } from "../component/FormField";
import SearchComponent from "../component/SearchComponent";
import UserItem from "../component/UserItem";
import ButtonComponent from "../component/ButtonComponent";
import { Spinner } from "../component/Spinner";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../../thunks/AccountsThunk";
import { addNewMember, removeMember } from "../../thunks/RoomThunk";
import { getAllContactByUser } from "../../thunks/ContactThunk";

function AddMember({ setModalVisible, modalVisible, roomAddMember }) {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [searchContact, setSearchContact] = useState([]);

  const { isLoading } = useSelector((state) => state.roomReducer);
  const { allAccount } = useSelector((state) => state.accountsReducer);
  const { allContact } = useSelector((state) => state.contactReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allAccount.length <= 0) {
      dispatch(getAllAccount());
    }
    if (allContact.length <= 0) {
      dispatch(getAllContactByUser());
    }
  }, []);

  const [query, setQuery] = useState("");
  console.log("user", allContact);
  const [searching, setSearching] = useState(false);
  const SearchAni = () => {
    return <Spinner width={4} height={4} />;
  };

  const handleSearch = (q) => {
    // const temp = [];
    // q = q.trim();
    // if (q == "") {
    //   setSearchContact(allContact);
    //   return;
    // }
    // allContact.forEach((element) => {
    //   const me =
    //     user?.id == element?.owner.id ? element?.relate : element?.owner;
    //   if (
    //     me?.fullName?.includes(q) ||
    //     me?.email?.includes(q) ||
    //     me?.phone?.includes(q)
    //   ) {
    //     temp.push(element);
    //   }
    // });
    // setSearchContact(temp);
  };

  const handleRadioClick = (buttonId) => {
    console.log("handleRadioClick", buttonId);
    if (selectedButtons?.some((item) => item.id === buttonId.id)) {
      setSelectedButtons(
        selectedButtons?.filter((item) => item.id !== buttonId.id)
      );
    } else {
      setSelectedButtons([...selectedButtons, buttonId]);
    }

    dispatch(
      addNewMember({
        roomId: roomAddMember.id,
        data: { userId: buttonId.id, adderId: user.id },
      })
    );
  };
  const handleRemoveClick = (buttonId) => {
    console.log("button", buttonId);
    if (selectedButtons?.some((item) => item.id === buttonId.id)) {
      setSelectedButtons(
        selectedButtons?.filter((item) => item.id === buttonId.id)
      );
    } else {
      setSelectedButtons([...selectedButtons, buttonId]);
    }

    dispatch(
      removeMember({
        roomId: roomAddMember.id,
        data: { userId: buttonId.id, adderId: user.id },
      })
    );
  };

  const handleRemoveSelectUser = (item) => {
    setSelectedButtons(selectedButtons.filter((props) => item.id !== props.id));
  };

  const handleCreateRoom = () => {
    console.log("selectedButtons", selectedButtons);
  };

  useEffect(() => {
    console.log("allContact", allContact);
    const accountRoom = roomAddMember?.members?.filter((item1) =>
      allContact?.some(
        (item2) =>
          item2?.relate?.id === item1?.id || item2?.owner?.id === item1?.id
      )
    );
    setSelectedButtons(accountRoom);
  }, [roomAddMember]);

  useLayoutEffect(() => {
    handleSearch(query);
  }, [query]);
  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 bg-[#b5b3b354] m-auto rounded-sm ${
        modalVisible ? "block" : "hidden"
      }`}
    >
      <div className="flex h-screen my-2" style={{ alignItems: "center" }}>
        <div className=" bg-white w-11/12 lg:w-5/12 m-auto p-4 rounded-md">
          <div className="title text-md font-bold pt-1.5 pb-3.5 flex justify-between">
            <span>Thêm thành viên</span>
            <button
              className="text-end mx-3"
              onClick={() => {
                setSelectedButtons([]);
                setModalVisible(false);
              }}
            >
              <FontAwesomeIcon icon={faX} className="text-xs" />
            </button>
          </div>
          <hr></hr>

          <hr />
          <SearchComponent
            handleSearch={(e) => setQuery(e.target.value)}
            SearchingAnimate={<SearchAni />}
            searchingState={searching}
            state={query}
            placeholder="Nhập tên, số điện thoại , Email"
          />

          <div className="group">
            <div className="title-group py-2">
              <span className="text-sm font-bold ">Danh sách người dùng</span>
              <div className="flex">
                <div className="w-full sm:w-7/12 py-1.5 scroll mr-1">
                  <div
                    className="scroll-item"
                    style={{ minHeight: "50vh", maxHeight: "55vh" }}
                  >
                    {allContact?.map((item) => {
                      const me =
                        user?.id == item?.owner.id ? item?.relate : item?.owner;
                      return (
                        <button
                          className={`w-full py-1 hover:bg-gray-100 rounded px-2 flex gap-2`}
                          onClick={() => handleRadioClick(me)}
                        >
                          <input
                            type="radio"
                            checked={selectedButtons?.some(
                              (props) => props?.id === me?.id
                            )}
                            onChange={() => {}}
                            onClick={() => handleRadioClick(me)}
                            className="my-auto w-4 h-4"
                          />
                          <UserItem
                            img={me?.avatar}
                            name={me?.fullName}
                            email={me?.email}
                            widthContent="max-w-full"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="w-5/12 border py-1.5 hidden sm:block">
                  <div className="px-2">
                    <span className="text-sm font-bold">Đã chọn</span>
                  </div>
                  <div className="w-full scroll">
                    <div
                      className="scroll-item"
                      style={{ minHeight: "50vh", maxHeight: "55vh" }}
                    >
                      {selectedButtons?.map((item) => (
                        <div
                          onClick={() => handleRemoveSelectUser(item)}
                          className={`w-11/12 my-2 mx-auto flex py-1 px-1 cursor-pointer justify-between rounded bg-gray-100`}
                        >
                          <UserItem
                            img={item?.avatar}
                            name={item?.fullName}
                            widthContent="max-w-30"
                          />
                          <button onClick={() => handleRemoveClick(item)}>
                            <FontAwesomeIcon icon={faX} className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/* <div className="group-btn flex justify-end my-2">
            <ButtonComponent
              textButton={"Hủy"}
              style={
                "btn bg-slate-300 px-3 py-1.5 mx-2 font-medium rounded-sm text-black"
              }
              type={"button"}
            />
            <ButtonComponent
              handleClick={handleCreateRoom}
              textButton={isLoading ? <Spinner /> : "Tạo nhóm"}
              style={
                "btn bg-blue-500 px-3 py-1.5 text-white font-medium rounded-sm"
              }
              type={"button"}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AddMember;
