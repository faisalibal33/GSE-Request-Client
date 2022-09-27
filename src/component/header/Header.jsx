import CottageIcon from "@mui/icons-material/Cottage";
import "./header.css";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";

const Header = ({ type }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [activeNav, setActiveNav] = useState("#");
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  // const [dates, setDates] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  // const handleSearch = () => {
  //   dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
  //   navigate("/hotels", { state: { destination, dates, options } });
  // };
  return (
    <div className="header">
      <div className="backgroundHeader"></div>
      <div className="headerContainer">
        <div className="headerList">
          <Link
            to="/"
            style={{ color: "inherit", textDecoration: "none" }}
            className="navHeaderMobile"
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
              className={path === "" ? "active" : ""}
            >
              <CottageIcon fontSize="small" />
              <span>Beranda</span>
            </div>
          </Link>
          <Link
            to="/request"
            style={{ color: "inherit", textDecoration: "none" }}
            state="request"
            className="navHeaderMobile"
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
              className={path === "request" ? "active" : ""}
            >
              <FlightLandOutlinedIcon sx={{ color: "white" }} />
              <span>Request</span>
            </div>
          </Link>
          <Link
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
            state="request"
            className="navHeaderMobile"
          >
            <div
              className={path === "dashboard" ? "active" : ""}
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
            >
              <DashboardOutlinedIcon color="white" fontSize="small" />
              <span>Dashboard</span>
            </div>
          </Link>
          {/* <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div> */}
        </div>

        <div className="headerMobile">
          <h1 className="headerTitle">Excellent GSE Request</h1>
          <p className="headerDesc">
            began to change to digital requests. Effective and Efficient with
            GSE Online Request
          </p>
          {!user && <button className="headerBtn">Sign in / Register</button>}
        </div>
      </div>
    </div>
  );
};

export default Header;
