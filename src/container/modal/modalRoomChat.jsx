import {
  faSearch,
  faX,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import UserItem from "../component/UserItem";
import SearchComponent from "../component/SearchComponent";
import { FormField } from "../component/FormField";
import ButtonComponent from "../component/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../component/Spinner";
import { setAlert } from "../../slices/AlertSlice";
import { TOAST_ERROR } from "../../constants/toast";
import { createNewRoom } from "../../thunks/RoomThunk";

function ModalRoomChat({ setModalVisible, modalVisible }) {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [room, setRoom] = useState("");
  const [searchContact, setSearchContact] = useState([]);

  const { roomTags, isLoading } = useSelector((state) => state.roomReducer);
  const { allContact } = useSelector((state) => state.contactReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const SearchAni = () => {
    return <Spinner width={4} height={4} />;
  };

  const handleSearch = (q) => {
    const temp = [];
    q = q.trim();
    if (q == "") {
      setSearchContact(allContact);
      return;
    }

    allContact.forEach((element) => {
      const me =
        user?.id == element?.owner.id ? element?.relate : element?.owner;
      if (
        me?.fullName?.includes(q) ||
        me?.email?.includes(q) ||
        me?.phone?.includes(q)
      ) {
        temp.push(element);
      }
    });

    setSearchContact(temp);
  };

  const handleRadioClick = (buttonId) => {
    if (selectedButtons.some((item) => item.id === buttonId.id)) {
      setSelectedButtons(
        selectedButtons.filter((item) => item.id !== buttonId.id)
      );
    } else {
      setSelectedButtons([...selectedButtons, buttonId]);
    }
  };

  console.log("selectedButtons", selectedButtons);

  const handleRemoveSelectUser = (item) => {
    setSelectedButtons(selectedButtons.filter((props) => item.id !== props.id));
  };

  const handleTagClick = (tagId) => {
    const sel = [...selectedTag];
    if (sel.includes(tagId)) {
      sel.splice(sel.indexOf(tagId), 1);
    } else {
      sel.push(tagId);
    }
    setSelectedTag(sel);
  };
  const handleCreateRoom = () => {
    if (selectedButtons.length == 0) {
      dispatch(
        setAlert({ type: TOAST_ERROR, content: "Hãy chọn một thành viên" })
      );
      return;
    }
    if (selectedTag.length == 0) {
      dispatch(setAlert({ type: TOAST_ERROR, content: "Hãy chọn một thẻ" }));
      return;
    }

    if (room["roomName"].trim().length == 0) {
      dispatch(setAlert({ type: TOAST_ERROR, content: "Hãy nhập tên nhóm" }));
      return;
    }
    const selectedMember = selectedButtons.map((btn) => btn.id);
    selectedMember.push(user?.id);

    const roomData = {
      roomName: room["roomName"],
      maxCountMember: 50,
      roomTagsId: selectedTag,
      initMember: selectedMember,
    };
    dispatch(createNewRoom(roomData)).then((resp) => {
      if (resp?.payload) {
        setModalVisible(false);
      }
    });
  };

  useLayoutEffect(() => {
    setSearchContact(allContact);
  }, [allContact]);
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
            <span>Tạo nhóm</span>
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
          <div className="new-name py-3">
            <FormField
              name={"roomName"}
              values={room}
              setValue={setRoom}
              placeholder={"Nhập tên nhóm"}
            />
          </div>
          <hr />
          <SearchComponent
            handleSearch={(e) => setQuery(e.target.value)}
            SearchingAnimate={<SearchAni />}
            searchingState={searching}
            state={query}
            placeholder="Nhập tên, số điện thoại , Email"
          />
          <div className="tags py-2 scrollX max-w-full">
            <ul className="flex scrollX-item  pb-2">
              {roomTags.map((item) => (
                <li
                  key={item.id}
                  className={`px-2 mx-1 my-0 rounded-md cursor-pointer ${
                    selectedTag.includes(item.id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-300"
                  }`}
                  onClick={() => handleTagClick(item.id)}
                >
                  <span className="text-xs">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div className="group">
            <div className="title-group py-2">
              <span className="text-sm font-bold ">Danh sách người dùng</span>
              <div className="flex">
                <div className="w-full sm:w-7/12 py-1.5 scroll mr-1">
                  <div
                    className="scroll-item"
                    style={{ minHeight: "50vh", maxHeight: "55vh" }}
                  >
                    {searchContact.map((item) => {
                      const me =
                        user?.id == item?.owner.id ? item?.relate : item?.owner;
                      return (
                        <button
                          className={`w-full py-1 hover:bg-gray-100 rounded px-2 flex gap-2`}
                          onClick={() => handleRadioClick(me)}
                        >
                          <input
                            type="radio"
                            checked={selectedButtons.some(
                              (props) => props.id === me.id
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
                      {selectedButtons.map((item) => (
                        <div
                          onClick={() => handleRemoveSelectUser(item)}
                          className={`w-11/12 my-2 mx-auto flex py-1 px-1 cursor-pointer justify-between rounded bg-gray-100`}
                        >
                          <UserItem
                            img={item?.avatar}
                            name={item?.fullName}
                            widthContent="max-w-24"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="group-btn flex justify-end my-2">
            <ButtonComponent
              textButton={"Hủy"}
              style={
                "btn bg-slate-300 px-3 py-1.5 mx-2 font-medium rounded-md text-black"
              }
              type={"button"}
            />
            <ButtonComponent
              handleClick={handleCreateRoom}
              textButton={isLoading ? <Spinner /> : "Tạo nhóm"}
              style={
                "btn bg-blue-500 px-3 py-1.5 text-white font-medium rounded-md"
              }
              type={"button"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalRoomChat;
