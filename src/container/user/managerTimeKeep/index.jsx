import { Link } from 'react-router-dom'
import { debounce } from '../../../app/debounce'
import { Checkout, checkout, getAllTimeKeep, newCheckIn } from '../../../thunks/TimeKeepsThunk'
import ButtonComponent from '../../component/ButtonComponent'
import SearchComponent from '../../component/SearchComponent'
import { Spinner } from '../../component/Spinner'
import TableComponent from '../../component/TableComponent'
import Layout from '../../layout'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

function ManagerTimeKeep() {
  const { allTimeKeep } = useSelector((state) => state.timeKeepsSlice)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (allTimeKeep?.length <= 0) {
      dispatch(getAllTimeKeep())
    }
  }, [])
  useLayoutEffect(() => {
    dispatch(getAllTimeKeep(0))
  }, [])


  const handleSearchContact = (e) => {
    // dispatch(searchPermissionAsync(e.target.value));
  }
  const [disabled, setDisabled] = useState(true)
  const { account } = useSelector((state) => state.authReducer);



  useEffect(() => {
    const now = new Date()
    const hours = now.getHours()

    if (hours < 6) {
      console.log('Checkin sẽ mở lúc 6h')
    } else if (hours < 12) {
      console.log('Checkin sẽ mở lúc 12h')
    } else if (hours < 15) {
      console.log('Checkin sẽ mở lúc 16h')
    } else {
      console.log('Checkin đã đóng')
    }

    if (hours >= 6 && hours < 7) {
      setDisabled(false)
    } else if (hours >= 12 && hours < 13) {
      setDisabled(false)
    } else if (hours >= 15 && hours < 16) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [])

  const handleCheckin = () => {
    const now = new Date()
    const hours = now.getHours()

    if (hours < 7) {
      dispatch(newCheckIn({userId: account?.user?.id, shift: "MORNING"}))
      console.log('MORNING')
    } else if (hours < 13) {
      dispatch(newCheckIn({userId: account?.user?.id, shift: "AFTERNOON"}))
      console.log('AFTERNOON')
    } else if (hours < 16) {
      dispatch(newCheckIn({userId: account?.user?.id, shift: "NIGHT"}))
      console.log('NIGHT')
    } else {
      console.log('Checkin đã đóng')
    }

    setDisabled(true)

    setTimeout(() => {
      setDisabled(false)
    }, 3600000) // 1 giờ
  }
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckout = () => {
    const now = new Date();
      const hour = now.getHours();

      if (hour < 13) {
        dispatch(Checkout({userId: account?.user?.id, shift: "MORNING"}))
      } else if (hour < 17) {
        dispatch(Checkout({userId: account?.user?.id, shift: "AFTERNOON"}))
      } else if (hour < 24) {
        dispatch(Checkout({userId: account?.user?.id, shift: "EVENING"}))
      } else {
        console.log('Quá giờ checkout');
      }

      setIsCheckedOut(true);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="title pt-3 pb-4">
          <span className="text-xl font-bold uppercase">
            Danh sách điểm danh
          </span>
        </div>
    
      
        <div className="table-manager">
          <TableComponent
            headTable={[
              'id',
              'Tên người dùng',
              'Giờ Checkin',
              'Trạng thái',
              'Ca',
              ''
            ]}
          >
            {allTimeKeep?.map((item, key) => (
              <tr className="hover:bg-gray-100" key={key}>
                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                  <div className="text-base font-semibold text-gray-900">
                    {item?.id}
                  </div>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                  <button
                    className="w-full"
                    // onClick={() => handleGetPermissionById(item?.id)}
                  >
                    {item?.userChecked?.fullName}
                  </button>
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                {moment(item?.checkInTime).format('HH:mm')}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                {item?.status}
                </td>
                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                {item?.shift}
                </td>
                <td className="p-4 space-x-2 whitespace-nowrap">
                  <ButtonComponent
                    type={'button'}
                    textButton={'Chỉnh sửa'}
                    // handleClick={() => handleHiddenUpdate(item)}
                  />
                </td>
              </tr>
            ))}{' '}
          </TableComponent>
        </div>
      </div>
    </Layout>
  )
}

export default ManagerTimeKeep
