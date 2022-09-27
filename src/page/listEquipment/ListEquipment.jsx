import "./listEquipment.scss";
import Sidebar from "../../component/sidebar/Sidebar";
import DashboardNavbar from "../../component/dashboardNavbar/DashboardNavbar";
import AllEquipment from "../../component/allEquipment/AllEquipment";

const ListEquipment = () => {
  return (
    <div className="allEquipment">
      <Sidebar />
      <div className="allEquipmentContainer">
        <DashboardNavbar />
        <AllEquipment />
      </div>
    </div>
  );
};

export default ListEquipment;
