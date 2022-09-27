import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import AddchartIcon from "@mui/icons-material/Addchart";
import ConstructionIcon from "@mui/icons-material/Construction";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { Link } from "react-router-dom";
import CottageIcon from "@mui/icons-material/Cottage";
import { useContext, useState } from "react";
import gmflogo from "../../images/GMFaeroasia.png";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const { darkMode } = useSelector((state) => state.darkMode);
  const Modal = () => {
    return (
      <div className="modalBackground">
        <div className="modalContainer" style={{ maxHeight: "150px" }}>
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Are you sure to logout</h1>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button id="execute" onClick={() => dispatch({ type: "LOGOUT" })}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {modalOpen && <Modal />}
      <div className="sidebar">
        {darkMode ? (
          <div className="sbtop">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={gmflogo} alt="GMF-Aeroasia" className="sbgmflogo" />
            </Link>
          </div>
        ) : (
          <div className="sbtop">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src="https://3.bp.blogspot.com/-Q19VtQTNMqg/XIyjxnXQ3rI/AAAAAAAASKY/xkUqkWsVcSEr5l_w2kYaoUS-WqrNUuR1ACLcBGAs/s280/GMF%2BAero%2BAsia.png"
                alt="GMF-Aeroasia"
                className="sbgmflogo"
              />
            </Link>
          </div>
        )}
        <hr />
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>
                <CottageIcon className="icon" />
                <span>Home</span>
              </li>
            </Link>
            <Link to="/request" style={{ textDecoration: "none" }}>
              <li>
                <FlightLandOutlinedIcon className="icon" />
                <span>Request</span>
              </li>
            </Link>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <p className="title">Database</p>
            <Link to="/personil" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Personil</span>
              </li>
            </Link>
            <Link to="/worktodo" style={{ textDecoration: "none" }}>
              <li>
                <ConstructionIcon className="icon" />
                <span>Work to do</span>
              </li>
            </Link>
            <Link to="/allrequest" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>All Request</span>
              </li>
            </Link>
            <p className="title">Equipment</p>
            <Link to="/equipment" style={{ textDecoration: "none" }}>
              <li>
                <AirportShuttleIcon className="icon" />
                <span>Manage Equipmentf</span>
              </li>
            </Link>
            <li>
              <AddchartIcon className="icon" />
              <span>Add Equipment</span>
            </li>
            <p className="title">USER</p>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
            <li onClick={() => setModalOpen(true)}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
