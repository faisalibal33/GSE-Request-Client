import "./listPersonil.scss"
import Sidebar from "../../component/sidebar/Sidebar"
import Personil from "../../component/personil/Personil"
import DashboardNavbar from "../../component/dashboardNavbar/DashboardNavbar"

const ListPersonil = () => {
  return (
    <div className="listPersonil">
      <Sidebar/>
      <div className="listPersonilContainer">
        <DashboardNavbar/>
        <Personil/>
      </div>
    </div>
  )
}

export default ListPersonil