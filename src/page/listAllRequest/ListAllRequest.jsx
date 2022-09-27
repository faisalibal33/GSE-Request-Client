import "./listAllrequest.scss"
import Sidebar from "../../component/sidebar/Sidebar"
import AllRequest from "../../component/allRequest/AllRequest"
import DashboardNavbar from "../../component/dashboardNavbar/DashboardNavbar"

const ListAllRequest = () => {
  return (
    <div className="allRequestList">
      <Sidebar/>
      <div className="allRequestListContainer">
        <DashboardNavbar/>
        <AllRequest/>
      </div>
    </div>
  )
}

export default ListAllRequest;