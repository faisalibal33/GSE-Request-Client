import "./cardRequest.css";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";

const CardRequest = ({ item, handleClick }) => {
  let number = item?._id;
  let wo = String(number).padStart(6, "0");
  let date = new Date(item?.createdAt);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  const hour = date.getHours().toLocaleString().padStart(2, "0");
  const min = date.getMinutes().toLocaleString().padStart(2, "0");
  const sec = date.getSeconds().toLocaleString().padStart(2, "0");
  const viewDate =
    day + " " + month + " " + year + ", " + hour + ":" + min + ":" + sec;

  let dateClose = new Date(item?.updatedAt);
  const dayClose = dateClose.toLocaleString("default", { day: "2-digit" });
  const monthClose = dateClose.toLocaleString("default", { month: "short" });
  const yearClose = dateClose.toLocaleString("default", { year: "numeric" });
  const hourClose = dateClose.getHours().toLocaleString().padStart(2, "0");
  const minuteClose = dateClose.getMinutes().toLocaleString().padStart(2, "0");
  const secClose = dateClose.getSeconds().toLocaleString().padStart(2, "0");
  const viewDateClose =
    dayClose +
    " " +
    monthClose +
    " " +
    yearClose +
    ", " +
    hourClose +
    ":" +
    minuteClose +
    ":" +
    secClose;

  return (
    <>
      <div className="cardRequest">
        <div className="cardImageClose">
          <img
            src={item?.photos}
            alt=""
            className="crImg"
            style={{ borderRadius: "5px" }}
          />
          {item?.progress === "CLOSE" ? (
            <div className="cardCloseDate">
              <span
                className="crReqdate"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  color: "green",
                }}
              >
                <CheckCircleOutlineIcon fontSize="small" /> {viewDateClose}
              </span>
              <span
                className="crReqdate"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  color: "green",
                }}
              >
                <PersonOutlineIcon fontSize="small" /> {item?.closeBy}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="crDesc">
          <h1 className="crTitle">{item?.equipment}</h1>
          <div className="orderNumber">
            <span className="crNumber">Order Number</span>
            <span className="crDistance" style={{ padding: "5px" }}>
              {wo}
            </span>
          </div>
          <span
            className="crRequestby"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px",
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            <RecordVoiceOverOutlinedIcon fontSize="small" />
            <div>
              <div>{item?.requestBy}</div>
              <small>
                {item?.idNumber} - {item?.unit}
              </small>
            </div>
          </span>
          <span className="crRemark">{item?.remark}</span>
          <span
            className="crReqdate"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              color: "rgb(78,78,78)",
            }}
          >
            <CalendarMonthOutlinedIcon
              fontSize="small"
              sx={{ color: "gray" }}
            />{" "}
            {viewDate}
          </span>
          {/* <div className="noteMobile"> */}
          {item?.progress === "OPEN" ? (
            <span className="openNote">Work order waiting for excecution</span>
          ) : item?.progress === "CLOSE" ? (
            <span className="closeNote">Work order has been finished</span>
          ) : (
            <span className="progressNote">
              Work order on progress execution
            </span>
          )}
          {/* </div> */}
        </div>
        <div className="crDetails">
          <div className="crReg">
            <h3>{item?.aircraftReg}</h3>
            {/* <button>100</button> */}
          </div>
          <div className="crButton">
            {item?.progress === "OPEN" ? (
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ maxWidth: "80px" }}
                onClick={() => handleClick(item.progress, item._id)}
              >
                OPEN
              </Button>
            ) : item?.progress === "CLOSE" ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{ maxWidth: "80px" }}
                  onClick={() => handleClick(item.progress, item._id)}
                >
                  CLOSE
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  sx={{ maxWidth: "60px", fontSize: "11px", height: "32px" }}
                  onClick={() => handleClick(item.progress, item._id)}
                >
                  PROGRESS
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRequest;
