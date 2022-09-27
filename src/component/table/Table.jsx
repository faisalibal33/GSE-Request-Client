import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import React from "react";

const List = ({ handleClick }) => {
  const { request, loading, error } = useSelector((state) => ({
    ...state.request,
  }));
  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">WO Number</TableCell>
              <TableCell className="tableCell">Aircraft Reg</TableCell>
              <TableCell className="tableCell">Request by</TableCell>
              <TableCell className="tableCell">Unit</TableCell>
              <TableCell className="tableCell">Request Date</TableCell>
              <TableCell className="tableCell">Equipment</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell>Loading</TableCell>
              </TableRow>
            )}
            {!loading && error ? (
              <TableRow>
                <TableCell>Error:{request.error}</TableCell>
              </TableRow>
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
                    <TableRow key={item._id}>
                      <TableCell className="tableCell">
                        {String(item._id).padStart(6, "0")}
                      </TableCell>
                      <TableCell className="tableCell">
                        {item.aircraftReg}
                      </TableCell>
                      <TableCell className="tableCell">
                        {item.requestBy}
                      </TableCell>
                      <TableCell className="tableCell">{item.unit}</TableCell>
                      <TableCell className="tableCell">
                        {item.requestDate}
                      </TableCell>
                      <TableCell className="tableCell">
                        {item.equipment}
                      </TableCell>
                      <TableCell className="tableCell">
                        {item.progress === "OPEN" ? (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => {
                              handleClick(item.progress, item._id);
                            }}
                          >
                            OPEN
                          </Button>
                        ) : item.progress === "CLOSE" ? (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => {
                              handleClick(item.progress, item._id);
                            }}
                          >
                            CLOSE
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            color="warning"
                            sx={{
                              maxWidth: "80px",
                              fontSize: "11px",
                              height: "32px",
                            }}
                            onClick={() => {
                              handleClick(item.progress, item._id);
                            }}
                          >
                            PROGRESS
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
