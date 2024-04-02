import {
  faChartPie,
  faListCheck,
  faUsers,
  faCalendar,
  faUserPen,
  faUsersGear,
  faComments,
  faPenToSquare,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons'
import { AdminSideNavItem } from '../interfaces/AdminSideNavItem'

const ADMIN_NAVBAR_ITEMS = [
  new AdminSideNavItem(1, '', faChartPie, 'Dashboards'),
  new AdminSideNavItem(2, '/quan-ly-tai-khoan', faUsers, 'Quản lý tài khoản'),
  new AdminSideNavItem(
    3,
    '/quan-ly-cong-viec',
    faListCheck,
    ' Quản lý công việc',
  ),
  new AdminSideNavItem(
    4,
    '/quan-ly-ke-hoach',
    faCalendar,
    'Quản lý lịch làm việc',
  ),
  new AdminSideNavItem(
    5,
    '/quan-ly-chuc-vu',
    faUserPen,
    ' Quản lý lịch chức vụ',
  ),
  new AdminSideNavItem(
    6,
    '/quan-ly-chuc-nang',
    faUsersGear,
    'Quản lý lịch chức năng',
  ),
  new AdminSideNavItem(7, '', faPenToSquare, ' Quản lý danh sách kpi'),
  new AdminSideNavItem(7, '', faCalendarCheck, ' Quản lý điểm danh cá nhân'),
  new AdminSideNavItem(8, '/chat', faComments, 'Tin nhắn'),
]
export const DEFAULT_AVATAR =
  'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg'

export { ADMIN_NAVBAR_ITEMS }
export const CONTACT_SEARCH_MODAL_TYPE = {
  SEARCH: 1,
  CONTACT: 2,
  REQUEST: 3,
  SENT_REQUEST: 4,
}
export const CONTACT_RESPONSE = {
  ACCEPT: 1,
  DENIED: 0,
}
export const CONTACT_NOTI_EVENT_TYPE = {
  NEW_REQUEST: 2,
  RESPONSE_REQUEST: 1,
}
export const getTimeDiff = (time) => {
  let now = new Date()
  let pastDate = new Date(time)
  let timeDifference = now - pastDate

  // Chuyển đổi khoảng thời gian từ millisecond sang ngày, giờ, phút, giây
  let millisecondsInADay = 1000 * 60 * 60 * 24
  let daysDifference = Math.floor(timeDifference / millisecondsInADay)
  timeDifference = timeDifference % millisecondsInADay

  let millisecondsInAnHour = 1000 * 60 * 60
  let hoursDifference = Math.floor(timeDifference / millisecondsInAnHour)
  timeDifference = timeDifference % millisecondsInAnHour

  let millisecondsInAMinute = 1000 * 60
  let minutesDifference = Math.floor(timeDifference / millisecondsInAMinute)
  timeDifference = timeDifference % millisecondsInAMinute

  let secondsDifference = Math.floor(timeDifference / 1000)

  return {
    days: daysDifference,
    hours: hoursDifference,
    minutes: minutesDifference,
    seconds: secondsDifference,
  }
}

export const getTimeDiffFrom = (timeStart, timeEnd) => {
  let timeDifference = timeEnd - timeStart

  // Chuyển đổi khoảng thời gian từ millisecond sang ngày, giờ, phút, giây
  let millisecondsInADay = 1000 * 60 * 60 * 24
  let daysDifference = Math.floor(timeDifference / millisecondsInADay)
  timeDifference = timeDifference % millisecondsInADay

  let millisecondsInAnHour = 1000 * 60 * 60
  let hoursDifference = Math.floor(timeDifference / millisecondsInAnHour)
  timeDifference = timeDifference % millisecondsInAnHour

  let millisecondsInAMinute = 1000 * 60
  let minutesDifference = Math.floor(timeDifference / millisecondsInAMinute)
  timeDifference = timeDifference % millisecondsInAMinute

  let secondsDifference = Math.floor(timeDifference / 1000)

  return {
    days: daysDifference,
    hours: hoursDifference,
    minutes: minutesDifference,
    seconds: secondsDifference,
  }
}
export function bytesToReadable(byte) {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB']
  let unitIndex = 0
  let size = byte

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size?.toFixed(2)} ${units[unitIndex]}`
}
