import "./worktodo.scss";
import { Link } from "react-router-dom";
import CardRequest from "../cardRequest/CardRequest";
import { useSelector } from "react-redux";

const Worktodo = () => {
  const { request, loading, error } = useSelector((state) => ({
    ...state.request,
  }));
  return (
    <div className="WorktoDodatatable">
      <div className="datatableTitle">
        <h3 style={{ borderBottom: "1px solid gray" }}>Work to Do</h3>
        <Link to={`/user/new`} className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        "loading"
      ) : (
        <div className="worktodolist">
          {[...request]
            ?.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
            .filter(
              (item) =>
                item.progress.toLowerCase().includes("open") ||
                item.progress.toLowerCase().includes("progress")
            )
            .map((item) => (
              <CardRequest
                item={item}
                key={
                  item._id
                } /*handleClick={() => {handleClick(); setIdfetch(item)}}8*/
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Worktodo;
