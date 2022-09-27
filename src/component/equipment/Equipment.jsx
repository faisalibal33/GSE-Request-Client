import "./equipment.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipment } from "../../redux/EquipmentSlice";
import { Link } from "react-router-dom";
import { Skeleton, Tooltip } from "@mui/material";
import SkeletonEquipment from "../skeleton/SkeletonEquipment";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AgricultureIcon from "@mui/icons-material/Agriculture";

const Equipment = () => {
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  const { equipment, loading, error } = useSelector((state) => ({
    ...state.equipment,
  }));

  return (
    <>
      <h2 id="equipment" className="titleHome">
        <AgricultureIcon fontSize="large" />
        Support Equiment
      </h2>
      <div className={active ? "featured" : "featuredlist"}>
        {loading && (
          <>
            <SkeletonEquipment /> <SkeletonEquipment /> <SkeletonEquipment />
          </>
        )}
        {!loading && error ? <h2>Error: {error} </h2> : null}
        {!loading && equipment
          ? equipment.map((item) => (
              <Link to="/request" state={item}>
                <div className="featuredItem" key={item._id}>
                  <img
                    src={item.images}
                    alt=""
                    className="featuredImg"
                    style={{ display: "inline-block" }}
                  />
                  <div className="featuredTitles">
                    <p className="availableEquipment">{item.equipmentName}</p>
                    <p className="availableEquipment">
                      {item.quantity} Available
                    </p>
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>
      <a
        style={{ color: "inherit", textDecoration: "none" }}
        className="more"
        onClick={() => (active ? setActive(false) : setActive(true))}
      >
        {active ? (
          <Tooltip title="More Equipment">
            <KeyboardArrowDownIcon />
          </Tooltip>
        ) : (
          <Tooltip title="Less">
            <KeyboardArrowUpIcon />
          </Tooltip>
        )}
      </a>
    </>
  );
};

export default Equipment;
