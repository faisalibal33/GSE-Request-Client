import { useSelector } from "react-redux";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import Navbar from "../../component/navbar/Navbar";
import CardRequest from "../../component/cardRequest/CardRequest";
import Equipment from "../../component/equipment/Equipment";
import "./home.css";
import SearchBox from "../../component/searchBox/SearchBox";
import SkeletonRequest from "../../component/skeleton/SkeletonRequest";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Home = () => {
  const { request, loading, error } = useSelector((state) => ({
    ...state.request,
  }));
  const { search, render } = SearchBox();
  const keys = ["aircraftReg", "unit", "requestBy", "equipment", "_id"];
  const allRequest = request.filter((item) =>
    keys.some((e) => item[e].toString().toLowerCase().includes(search))
  );

  return (
    <div className="containerHome">
      <Navbar />
      <Header />

      <div className="boxSearch">
        {render}
        <div className="spacing"></div>
      </div>
      <div className="homeContainer">
        <Equipment />
        <div className="progressWork">
          <h2 className="titleHome">
            <AccessTimeIcon fontSize="large" />
            Progress Work
          </h2>
          <div className="homework">
            {loading && (
              <>
                <SkeletonRequest /> <SkeletonRequest /> <SkeletonRequest />{" "}
                <SkeletonRequest />
              </>
            )}
            {!loading && error ? <h2>Error: {error} </h2> : null}
            {!loading && allRequest ? (
              <>
                {[...allRequest]
                  ?.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                  .map((item) => (
                    <CardRequest item={item} key={item._id} />
                  ))}
              </>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
