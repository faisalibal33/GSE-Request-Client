import "./dashboardNavbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import avatar from "../../images/faisal.jpg";
import { useDispatch, useSelector } from "react-redux";
import { modeDark } from "../../redux/darkModeSlice";
import Navbar from "../navbar/Navbar";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const { request } = useSelector((state) => ({ ...state.request }));
  const notification = request.filter((data) =>
    data.progress.toLowerCase().includes("open")
  );

  return (
    <div className="dashboardNavbar">
      <div className="dbwrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <h1>GSE Excellent Request</h1>
        <div className="dbitems">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          <div className="dbitem">
            <DarkModeOutlinedIcon
              className="dbicon"
              onClick={() => dispatch(modeDark())}
            />
          </div>
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}
          <div className="dbitem">
            <NotificationsNoneOutlinedIcon className="dbicon" />
            {notification.length > 0 ? (
              <div className="dbcounter">{notification.length}</div>
            ) : (
              ""
            )}
          </div>
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          <div className="dbitem">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="dbitem">
            <img src={avatar} alt="" className="dbavatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
