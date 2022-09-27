import "./personil.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Personil = ({ handleClick }) => {
  const { users, loading, error } = useSelector((state) => ({
    ...state.users,
  }));
  return (
    <div className="Personildatatable">
      <div className="datatableTitle">
        <h3 style={{ borderBottom: "1px solid gray" }}>Personil</h3>
        <Link to={`/user/new`} className="link">
          Add New
        </Link>
      </div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID Number</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Grade</TableCell>
              <TableCell className="tableCell">Unit</TableCell>
              <TableCell className="tableCell">email</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? "Loading"
              : [...users]?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="tableCell">{item.idnumber}</TableCell>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">{item.name}</div>
                    </TableCell>
                    <TableCell className="tableCell">{item.grade}</TableCell>
                    <TableCell className="tableCell">{item.unit}</TableCell>
                    <TableCell className="tableCell">{item.email}</TableCell>
                    <TableCell className="tableCell">
                      {item.isAdmin ? (
                        <button className="AdminButton" onClick={handleClick}>
                          Admin
                        </button>
                      ) : (
                        <button
                          className="operatorButton"
                          onClick={handleClick}
                        >
                          Operator
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Personil;
