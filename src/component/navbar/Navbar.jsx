import "./navbar.css";
import gmflogo from "../../images/GMFaeroasia.png";
import gmflogo2 from "../../images/GMF-Aeroasia.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import profileImage from "../../images/faisal.jpg";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import CottageIcon from "@mui/icons-material/Cottage";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Divider, Drawer } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from "@mui/icons-material/Logout";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { user } = useContext(AuthContext);
  const [navbar, setNavbar] = useState(window.scrollY >= 80 ? true : false);
  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setNavbar(true);
        if (window.innerWidth < 700) {
          setNavbar(false);
        }
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  const [menu, setMenu] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMenu(open);
  };

  return (
    <div className={navbar ? "hmnavbar hmactive" : "hmnavbar"}>
      <div className="navContainer">
        <div className="menuIcon">
          <Button
            onClick={toggleDrawer(true)}
            style={{
              position: "absolute",
              top: "10px",
              zIndex: "100",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "gray",
            }}
          >
            <MenuIcon fontSize="large" />
            <h3>{path === "" ? "HOME" : path}</h3>
          </Button>
        </div>

        <Drawer anchor={"left"} open={menu} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: "250px" }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div style={{ height: "65px" }}>
              <h3 style={{ padding: "20px 25px", color: "gray" }}>
                GSE Excellent Request
              </h3>
            </div>
            <Divider />
            <div>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <div
                  style={{ marginTop: "5px" }}
                  className={
                    path === "" ? "slideStyle slideActive" : "slideStyle"
                  }
                >
                  <CottageIcon />

                  <p style={{ fontWeight: "600" }}>Home</p>
                </div>
              </Link>
              <Link
                to="/request"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <div
                  style={{ marginTop: "5px" }}
                  className={
                    path === "request" ? "slideStyle slideActive" : "slideStyle"
                  }
                >
                  <FlightLandOutlinedIcon />

                  <p style={{ fontWeight: "600" }}>Request</p>
                </div>
              </Link>
              <Link
                to="/dashboard"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <div
                  style={{ marginTop: "5px" }}
                  className={
                    path === "dashboard"
                      ? "slideStyle slideActive"
                      : "slideStyle"
                  }
                >
                  <DashboardOutlinedIcon />

                  <p style={{ fontWeight: "600" }}>Dashboard</p>
                </div>
              </Link>
            </div>
            <div>
              <Divider />

              <Link
                to="/dashboard"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <div
                  style={{ marginTop: "5px" }}
                  className={
                    path === "dashboard"
                      ? "slideStyle slideActive"
                      : "slideStyle"
                  }
                >
                  <img
                    src={profileImage}
                    alt="Profile Image"
                    className="profileimg"
                    style={{ marginLeft: "-3px" }}
                  />
                  <p style={{ fontWeight: "600" }}>{user.name}</p>
                </div>
              </Link>
              <Link
                to="/dashboard"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <div
                  className={
                    path === "dashboard"
                      ? "slideStyle slideActive"
                      : "slideStyle"
                  }
                >
                  <Logout />

                  <p style={{ fontWeight: "600" }}>Logout</p>
                </div>
              </Link>
            </div>
          </Box>
        </Drawer>

        <div className="logoGmf">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            {navbar && <img src={gmflogo2} alt="GMF-Aeroasia" height="35px" />}
            {!navbar && <img src={gmflogo} alt="GMF-Aeroasia" height="125px" />}
          </Link>
        </div>
        <div className={navbar ? "navbarLink" : "navbarLink navLinkNone"}>
          <Link
            to="/"
            style={{ color: "inherit", textDecoration: "none" }}
            className="linkNavbar"
          >
            <div
              className={path === "" ? "btactive" : ""}
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
            >
              <CottageIcon sx={{ color: "gray" }} />
              <span style={{ color: "gray", fontWeight: "500" }}>Beranda</span>
            </div>
          </Link>
          <Link
            to="/request"
            style={{ color: "inherit", textDecoration: "none" }}
            state="request"
            className="linkNavbar"
          >
            <div
              className={path === "request" ? "btactive" : ""}
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
            >
              <FlightLandOutlinedIcon sx={{ color: "gray" }} />
              <span style={{ color: "gray", fontWeight: "500" }}>Request</span>
            </div>
          </Link>
          <Link
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
            state="request"
            className="linkNavbar"
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "3px" }}
              className={path === "dashboard" ? "btactive" : ""}
            >
              <DashboardOutlinedIcon sx={{ color: "gray" }} fontSize="small" />
              <span style={{ color: "gray", fontWeight: "500" }}>
                Dashboard
              </span>
            </div>
          </Link>
        </div>
        {user ? (
          <div className="profile">
            {navbar ? (
              <p style={{ color: "gray", fontWeight: "600" }}>{user.name}</p>
            ) : (
              user.name
            )}

            <img
              src={profileImage}
              alt="Profile Image"
              className="profileimg"
            />
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
