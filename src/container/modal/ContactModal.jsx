import {
  faAddressBook,
  faArrowAltCircleDown,
  faArrowAltCircleRight,
  faCheck,
  faComment,
  faInbox,
  faMagnifyingGlass,
  faUserPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import UserItem from "../component/UserItem";
import SearchComponent from "../component/SearchComponent";
import ButtonComponent from "../component/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../app/debounce";
import { searchContactAsync } from "../../thunks/SearchThunk";
import {
  CONTACT_RESPONSE,
  CONTACT_SEARCH_MODAL_TYPE,
  DEFAULT_AVATAR,
} from "../../app/static";
import {
  setSearchContact,
  setSearchContent,
  setSearching,
} from "../../slices/SearchSlice";
import { Spinner } from "../component/Spinner";
import {
  destroyContactRequest,
  responseContact,
  sendAddContactRequest,
} from "../../thunks/ContactThunk";

function ContactModal({ setOpen }) {
  const [modalType, setModalType] = useState(CONTACT_SEARCH_MODAL_TYPE.SEARCH);
  const { searchContact, searchContent, searching } = useSelector(
    (state) => state.searchReducer
  );
  const { contactRequest, allContact, addContactLoadingId, addContactRequest } =
    useSelector((state) => state.contactReducer);
  const { user } = useSelector((state) => state.authReducer);

  const handleCloseModal = () => {
    // clear search data
    dispatch(setSearchContent(""));
    dispatch(setSearchContact([]));
    setOpen(false);
  };
  useLayoutEffect(() => {}, [addContactRequest, allContact, contactRequest]);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    console.log("data :: ", searchContact);
  }, [searchContact]);

  const handleSearchContact = (e) => {
    dispatch(setSearchContent(e.target.value || ""));
  };

  const handleResponseAddFriendRequest = (type, contactId) => {
    const data = {
      contactId: contactId,
      command: type,
    };
    dispatch(responseContact(data));
  };

  useLayoutEffect(() => {
    if (searchContent?.trim() !== "") {
      dispatch(searchContactAsync(searchContent));
    }
    dispatch(setSearchContact([]));
  }, [searchContent]);

  const SearchModalContent = ({ content }) => {
    return (
      <div
        className={`${
          modalType == CONTACT_SEARCH_MODAL_TYPE.SEARCH ? "block" : "hidden"
        }`}
      >
        <div className="title text-md font-bold pt-1.5 pb-3.5 flex justify-between">
          <span>Tìm kiếm</span>
        </div>
        <hr></hr>
        <div className="search-content ">
          <SearchComponent
            state={content}
            placeholder="Nhập tên"
            handleSearch={debounce(handleSearchContact, 1000)}
            SearchingAnimate={
              <Spinner width={"w-5"} height={"h-5"} color={"fill-gray-400"} />
            }
            searchingState={searching}
          />
          <div className="w-full py-1.5 scroll">
            <div
              className="scroll-item"
              style={{ minHeight: "50vh", maxHeight: "55vh" }}
            >
              {searchContact &&
                searchContact?.map((item, index) => (
                  <div
                    key={index.toString()}
                    className={`w-full flex py-2 justify-between`}
                  >
                    <UserItem
                      img={item?.avatar || DEFAULT_AVATAR}
                      name={item?.fullName}
                      widthContent="max-w-64"
                    />
                    <div className="requestBtn flex my-auto">
                      <button
                        onClick={() => {
                          handleSendContactRequest(item.id);
                        }}
                        className="text-sm  px-1 mx-1 py-1 text-gray-500"
                      >
                        {addContactLoadingId?.filter((v) => v == item?.id)
                          .length > 0 ? (
                          <Spinner color={"fill-gray-400"} />
                        ) : (
                          <FontAwesomeIcon icon={faUserPlus} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              {searchContact?.length === 0 && (
                <span className="text-gray-400 text-sm">Kết quả tìm kiếm</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const AddContactRequestModalContent = () => {
    return (
      <div
        className={`  ${
          modalType == CONTACT_SEARCH_MODAL_TYPE.REQUEST ? "block" : "hidden"
        }`}
      >
        <div className="title text-md font-bold pt-1.5 pb-3.5 flex justify-between">
          <span>Yêu cầu kết bạn</span>
        </div>
        <hr></hr>
        <div className="search-content">
          <div className="w-full py-1.5 scroll">
            <div
              className="scroll-item"
              style={{ minHeight: "50vh", maxHeight: "62vh" }}
            >
              {contactRequest.map((item) => (
                <div
                  key={item?.id.toString()}
                  className={`w-full flex py-2 justify-between`}
                >
                  <UserItem
                    img={item?.owner?.avatar || DEFAULT_AVATAR}
                    name={item?.owner?.fullName}
                    widthContent="max-w-40"
                  />
                  <div className="requestBtn flex my-auto">
                    <button
                      onClick={() => {
                        handleResponseAddFriendRequest(
                          CONTACT_RESPONSE.DENIED,
                          item?.id
                        );
                      }}
                      className="text-xs px-2 mx-1 rounded-sm bg-red-500 py-1 text-white"
                    >
                      <FontAwesomeIcon
                        icon={faX}
                        className="text-xs"
                        style={{ marginRight: "4px" }}
                      />
                      <span>Từ chối</span>
                    </button>

                    <button
                      onClick={() => {
                        handleResponseAddFriendRequest(
                          CONTACT_RESPONSE.ACCEPT,
                          item?.id
                        );
                      }}
                      className="text-xs px-2 mx-1 rounded-sm  bg-blue-500 py-1 text-white"
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-xs"
                        style={{ marginRight: "4px" }}
                      />
                      <span>Đồng ý</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const ListContactModalContent = () => {
    return (
      <div
        className={`  ${
          modalType == CONTACT_SEARCH_MODAL_TYPE.CONTACT ? "block" : "hidden"
        }`}
      >
        <div className="title text-md font-bold pt-1.5 pb-3.5 flex justify-between">
          <span>Danh sách bạn bè</span>
        </div>
        <hr></hr>
        <div className="search-content">
          <div className="w-full py-1.5 scroll">
            <div
              className="scroll-item"
              style={{ minHeight: "50vh", maxHeight: "62vh" }}
            >
              {allContact.map((item) => {
                const me =
                  user?.id == item?.owner.id ? item?.relate : item?.owner;
                return (
                  <div
                    key={item?.id.toString()}
                    className={`w-full flex py-2 justify-between`}
                  >
                    <UserItem
                      img={me?.avatar || DEFAULT_AVATAR}
                      name={me?.fullName}
                      widthContent="max-w-40"
                    />
                    <div className="requestBtn flex my-auto">
                      <button className="text-xs rounded-sm px-2  bg-slate-700 py-1 text-white">
                        <FontAwesomeIcon
                          icon={faArrowAltCircleRight}
                          className="text-xs"
                          style={{ marginRight: "4px" }}
                        />
                        <span>Nhắn tin</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const ListSentRequest = () => {
    const handleCancelRequest = (id) => {
      dispatch(destroyContactRequest(id));
    };
    return (
      <div
        className={`  ${
          modalType == CONTACT_SEARCH_MODAL_TYPE.SENT_REQUEST
            ? "block"
            : "hidden"
        }`}
      >
        <div className="title text-md font-bold pt-1.5 pb-3.5 flex justify-between">
          <span>Yêu cầu đã gửi đi</span>
        </div>
        <hr></hr>
        <div className="search-content">
          <div className="w-full py-1.5 scroll">
            <div
              className="scroll-item"
              style={{ minHeight: "50vh", maxHeight: "62vh" }}
            >
              {addContactRequest.map((item) => (
                <div
                  key={item?.id.toString()}
                  className={`w-full flex py-2 justify-between`}
                >
                  <UserItem
                    img={item?.avatar || DEFAULT_AVATAR}
                    name={item?.relate?.fullName}
                    widthContent="max-w-40"
                  />
                  <div className="requestBtn flex my-auto">
                    <button
                      onClick={() => {
                        handleCancelRequest(item?.id);
                      }}
                      className="text-xs px-2 rounded mx-1 bg-red-500 py-1 text-white"
                    >
                      <FontAwesomeIcon
                        icon={faX}
                        className="text-xs"
                        style={{ marginRight: "2px" }}
                      />
                      <span className="ps-1">Hủy yêu cầu</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleSendContactRequest = (toId) => {
    dispatch(
      sendAddContactRequest({
        from: user?.id,
        to: toId,
      })
    );
  };
  const ModalHeader = () => {
    return (
      <div className="icon-headerSearch flex">
        <button
          className="bg-white py-2 px-4 border rounded-tl-md "
          onClick={() => setModalType(CONTACT_SEARCH_MODAL_TYPE.SEARCH)}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-lg text-gray-400"
          />
        </button>
        <button
          className="bg-white py-2 px-4 border"
          onClick={() => setModalType(CONTACT_SEARCH_MODAL_TYPE.CONTACT)}
        >
          <FontAwesomeIcon
            icon={faAddressBook}
            className="text-lg text-gray-400"
          />
        </button>
        <button
          className="relative z-10 bg-white py-2 px-4 border"
          onClick={() => setModalType(CONTACT_SEARCH_MODAL_TYPE.REQUEST)}
        >
          {contactRequest?.length > 0 && (
            <div class="text-xs absolute inline-flex items-center justify-center w-5 h-5 font-bold text-white bg-red-500  border-white rounded-full -top-2 -end-2 border-0">
              <span style={{ fontSize: 10 }}>{contactRequest.length}</span>
            </div>
          )}
          <FontAwesomeIcon
            icon={faUserPlus}
            className="text-md text-gray-400 p-0"
          />
        </button>

        <button
          className="relative bg-white py-2 px-4 border rounded-tr-md"
          onClick={() => setModalType(CONTACT_SEARCH_MODAL_TYPE.SENT_REQUEST)}
        >
          {addContactRequest?.length > 0 && (
            <div class="text-xs absolute inline-flex items-center justify-center w-5 h-5 font-bold text-white bg-red-500  border-white rounded-full -top-2 -end-2 border-0">
              <span style={{ fontSize: 10 }}>{addContactRequest.length}</span>
            </div>
          )}

          <FontAwesomeIcon icon={faInbox} className="text-lg text-gray-400" />
        </button>
      </div>
    );
  };

  const ModalFooter = ({ handleClose }) => {
    return (
      <>
        <hr />
        <div className="group-btn flex justify-end my-2">
          <ButtonComponent
            handleClick={handleClose}
            textButton={"Đóng"}
            style={
              "btn bg-slate-700 px-3 py-2 font-medium rounded-sm text-sm text-black"
            }
            type={"button"}
          />
        </div>
      </>
    );
  };
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#b5b3b354] m-auto rounded-sm">
      <div className="flex h-screen  " style={{ alignItems: "center" }}>
        <div className=" w-11/12 lg:w-3/12 m-auto">
          <ModalHeader />
          <div className={`bg-white p-2 rounded-md rounded-s-none`}>
            <SearchModalContent content={searchContent} />
            <AddContactRequestModalContent />
            <ListContactModalContent />
            <ListSentRequest />
            <ModalFooter handleClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
