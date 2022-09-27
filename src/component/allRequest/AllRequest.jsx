import "./allRequest.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRequest, fetchRequestDate } from "../../redux/RequestSlice";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, TablePagination } from "@mui/material";

const AllRequest = ({ handleClick }) => {
  // const { request, loading, error } = useSelector((state) => ({
  //   ...state.request,
  // }));

  const [request, setRequest] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchRequestDate = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8800/api/request?min=${min || 0}&max=${max || 999}`
        );
        setRequest(res.data);
      } catch (error) {
        console.log("ERROR");
      }
      setLoading(false);
    };
    fetchRequestDate();
  }, [min, max]);

  const keys = ["aircraftReg", "unit", "requestBy", "equipment", "_id"];
  const allRequest = request.filter((item) =>
    keys.some((e) => item[e].toString().toLowerCase().includes(search))
  );
  const pickDateMin = (e) => {
    setMin(e.target.value);
  };
  const pickDateMax = (e) => {
    setMax(e.target.value);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#2C3333",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const TableRequest = ({ item }) => {
    let date = new Date(item?.createdAt);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    const hour = date.getHours().toLocaleString().padStart(2, "0");
    const minute = date.getMinutes().toLocaleString().padStart(2, "0");
    const sec = date.getSeconds().toLocaleString().padStart(2, "0");
    const viewDate =
      day + " " + month + " " + year + ", " + hour + ":" + minute + ":" + sec;
    let dateClose = new Date(item?.updatedAt);
    const dayClose = dateClose.toLocaleString("default", { day: "2-digit" });
    const monthClose = dateClose.toLocaleString("default", { month: "short" });
    const yearClose = dateClose.toLocaleString("default", { year: "numeric" });
    const hourClose = dateClose.getHours().toLocaleString().padStart(2, "0");
    const minuteClose = dateClose
      .getMinutes()
      .toLocaleString()
      .padStart(2, "0");
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
      <StyledTableRow hover role="checkbox" tabIndex={-1} key={item._id}>
        <StyledTableCell>
          {item.progress === "OPEN" ? (
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={handleClick}
            >
              OPEN
            </Button>
          ) : item.progress === "CLOSE" ? (
            <button className="closeButton" onClick={handleClick}>
              CLOSE
            </button>
          ) : (
            <button className="progressButton" onClick={handleClick}>
              PROGRESS
            </button>
          )}
        </StyledTableCell>
        <StyledTableCell>{String(item._id).padStart(6, "0")}</StyledTableCell>
        <StyledTableCell>
          <div className="cellWrapper">{item.aircraftReg}</div>
        </StyledTableCell>
        <StyledTableCell>
          {item.requestBy} / {item.idNumber}
        </StyledTableCell>
        <StyledTableCell>{item.unit}</StyledTableCell>
        <StyledTableCell>{viewDate}</StyledTableCell>
        {item.progress === "CLOSE" ? (
          <StyledTableCell>{viewDateClose}</StyledTableCell>
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}
        {item.progress === "CLOSE" ? (
          <StyledTableCell>{item.closeBy}</StyledTableCell>
        ) : (
          <StyledTableCell>-</StyledTableCell>
        )}

        <StyledTableCell>{item.equipment}</StyledTableCell>
        <StyledTableCell>{item.remark}</StyledTableCell>
      </StyledTableRow>
    );
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const All = 1000;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="allRequestdatatable">
      <div className="datatableTitleContainer">
        <div className="filterTableRequest">
          <h2>All Request</h2>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allRequest.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <input
            type="text"
            placeholder="Search"
            className="downloadXL"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <div className="inputDate">
            <input
              type="date"
              id="min"
              onChange={pickDateMin}
              className="datePicker"
            />
            <span className="dateBetween">to</span>
            <input
              type="date"
              id="max"
              onChange={pickDateMax}
              className="datePicker"
            />
          </div>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="downloadXL"
            table="table-to-xls"
            filename={min ? `All request from ${min} to ${max}` : `All Request`}
            sheet="All Request"
            buttonText="Download XL file"
          />
        </div>
      </div>
      <div className="containerTable">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{
              maxHeight: "75vh",
              width: "83vw",
              overflow: "scroll",
            }}
          >
            <Table stickyHeader aria-label="sticky table" id="table-to-xls">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "80px", maxWidth: "90px" }}>
                    WO Number
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "80px", maxWidth: "90px" }}>
                    Aircraft Reg
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "100px" }}>
                    Request by
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "60px", maxWidth: "90px" }}>
                    Unit
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "90px", maxWidth: "90px" }}>
                    Request Date
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "90px", maxWidth: "90px" }}>
                    Close Date
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "100px" }}>
                    Close By
                  </StyledTableCell>
                  <StyledTableCell>Equipment</StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "250px" }}>
                    Remark
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? "Loading"
                  : allRequest
                      ?.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item) => (
                        <TableRequest item={item} key={item._id} />
                      ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default AllRequest;
