import Sidebar from "../../component/sidebar/Sidebar";
import DashboardNavbar from "../../component/dashboardNavbar/DashboardNavbar";
import Percentage from "../../component/percentage/Percentage";
import CardRequest from "../../component/cardRequest/CardRequest";
import "./dashboard.css";
import Widget from "../../component/widget/Widget";
import Table from "../../component/table/Table";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { fetchRequest, updateRequest } from "../../redux/RequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { cycleFalse, cycleTrue } from "../../redux/cycle";
import SkeletonRequest from "../../component/skeleton/SkeletonRequest";
import Navbar from "../../component/navbar/Navbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { request, loading, error } = useSelector((state) => ({
    ...state.request,
  }));
  const [values, setValues] = useState({
    id: "",
    progress: "",
    closeBy: "",
    closeDate: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const today = new Date().toLocaleString();
  const [idfetch, setIdfetch] = useState();
  const items = JSON.parse(localStorage.getItem("user"));

  const handleClick = async (progres, idno) => {
    setIdfetch(progres);
    if (progres === "OPEN") {
      setValues({
        id: idno,
        progress: "PROGRESS",
        closeBy: items.name + " / " + items.idnumber,
        closeDate: today,
      });
    } else if (progres === "PROGRESS") {
      setValues({
        id: idno,
        progress: "CLOSE",
        closeBy: items.name + " / " + items.idnumber,
        closeDate: today,
      });
    }
    setModalOpen(true);
  };
  const handleProgress = () => {
    dispatch(updateRequest(values));
    dispatch(cycleTrue());
    setModalOpen(false);
  };

  const [windowWidthChange, setWindowWidthChange] = useState(
    window.innerWidth < 821 ? true : false
  );
  useEffect(() => {
    const changeBackground = () => {
      if (window.innerWidth < 821) {
        setWindowWidthChange(true);
      } else {
        setWindowWidthChange(false);
      }
    };

    window.addEventListener("resize", changeBackground);
    return () => window.removeEventListener("resize", changeBackground);
  }, []);
  return (
    <>
      {modalOpen && (
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
            {idfetch === "OPEN" ? (
              <div className="title">
                <h1>Execute this request</h1>
              </div>
            ) : idfetch === "PROGRESS" ? (
              <div className="title">
                <h1>Finish this request</h1>
              </div>
            ) : (
              <div className="title">
                <h1>Request has been finished</h1>
              </div>
            )}
            <div className="footer">
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
              {idfetch === "OPEN" ? (
                <button id="execute" onClick={handleProgress}>
                  Execute
                </button>
              ) : idfetch === "PROGRESS" ? (
                <button id="finish" onClick={handleProgress}>
                  Finish
                </button>
              ) : (
                <button id="execute" onClick={handleProgress}>
                  Execute
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="dashboard">
        {windowWidthChange ? null : <Sidebar />}
        <div className="dashboardContainer">
          {windowWidthChange ? <Navbar /> : <DashboardNavbar />}
          <div className="widgets">
            <Widget type="request" />
            <Widget type="open" className="openwork" />
            <Widget type="close" />
            <Widget type="progress" />
          </div>
          <div className="charts">
            <Percentage />
            <Swiper
              className="swiper"
              // install Swiper modules
              loop={true}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {loading && (
                <SwiperSlide className="slide">
                  <SkeletonRequest />
                </SwiperSlide>
              )}
              {!loading && error ? (
                <SwiperSlide className="slide">
                  Error: {request.error}
                </SwiperSlide>
              ) : null}
              {!loading && request ? (
                <>
                  {[...request]
                    ?.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                    .filter(
                      (item) =>
                        item.progress.toLowerCase().includes("open") ||
                        item.progress.toLowerCase().includes("progress")
                    )
                    .map((item) => (
                      <SwiperSlide key={item._id} className="slide">
                        <CardRequest
                          item={item}
                          key={item._id}
                          handleClick={handleClick}
                        />
                      </SwiperSlide>
                    ))}
                </>
              ) : null}
              ...
            </Swiper>
          </div>
          <div className="tblContainer">
            <div className="tblTitle">Work To DO</div>
            <Table handleClick={handleClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
