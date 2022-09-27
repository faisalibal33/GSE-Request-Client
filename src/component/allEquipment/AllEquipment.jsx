import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AllEquipment = ({ handleClick }) => {
  const { equipment, loading, error } = useSelector((state) => ({
    ...state.equipment,
  }));
  return (
    <div className="allRequestdatatable">
      <div
        className="datatableTitle"
        style={{ marginTop: "20px", marginLeft: "0px", padding: "0" }}
      >
        <h3 style={{ borderBottom: "1px solid gray", marginLeft: "10px" }}>
          All Equipment
        </h3>
        <Link to={`/user/new`} className="link">
          Add New
        </Link>
      </div>
      <TableContainer
        component={Paper}
        className="allTable"
        style={{ margin: "0", padding: "0" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Images</TableCell>
              <TableCell className="tableCell">Equipment</TableCell>
              <TableCell className="tableCell">Total</TableCell>
              <TableCell className="tableCell">Available</TableCell>
              <TableCell className="tableCell">Maintenance</TableCell>
              <TableCell className="tableCell">Last Maintenance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? "Loading"
              : [...equipment]?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="tableCell">
                      <img
                        src={item.images}
                        alt=""
                        height="100px"
                        width="100px"
                      />
                    </TableCell>
                    <TableCell className="tableCell">
                      <div className="cellWrapper">{item.equipmentName}</div>
                    </TableCell>
                    <TableCell className="tableCell">{item.quantity}</TableCell>
                    <TableCell className="tableCell">{item.quantity}</TableCell>
                    <TableCell className="tableCell">0</TableCell>
                    <TableCell className="tableCell">
                      {item.updatedAt}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllEquipment;
