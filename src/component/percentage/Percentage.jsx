import "./percentage.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useSelector } from "react-redux";

const Percentage = () => {
  const { request, loading, error } = useSelector((state) => ({
    ...state.request,
  }));

  const widgetValue = () => {
    const open = request.filter((datas) =>
      datas.progress.toLowerCase().includes("open")
    );
    const close = request.filter((datas) =>
      datas.progress.toLowerCase().includes("close")
    );
    const progress = request.filter((datas) =>
      datas.progress.toLowerCase().includes("progress")
    );

    return { open, close, progress };
  };
  const { open, close, progress } = widgetValue();
  let percent = (close.length / request.length) * 100;
  return (
    <div className="percentage">
      <div className="top">
        <h1 className="title">Progress Request Today</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="percentageChart">
          {loading ? (
            "Loading"
          ) : (
            <CircularProgressbar
              value={percent}
              text={`${percent.toFixed(2)}%`}
              strokeWidth={5}
            />
          )}
        </div>
        <p className="title">Total Request Close</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Open</div>
            <div className="itemResult negative">
              <WarningAmberOutlinedIcon fontSize="small" />
              {loading ? (
                <div className="resultAmount">Loading</div>
              ) : (
                <div className="resultAmount">{open.length} Request</div>
              )}
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Progress</div>
            <div className="itemResult progress">
              <CachedOutlinedIcon fontSize="small" />
              {loading ? (
                <div className="resultAmount">Loading</div>
              ) : (
                <div className="resultAmount">{progress.length} Request</div>
              )}
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Close</div>
            <div className="itemResult positive">
              <CheckCircleOutlineOutlinedIcon fontSize="small" />
              {loading ? (
                <div className="resultAmount">Loading</div>
              ) : (
                <div className="resultAmount">{close.length} Request</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Percentage;
