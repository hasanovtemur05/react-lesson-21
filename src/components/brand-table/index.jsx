import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function CategoryTable({ data, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">T/R</TableCell>
            <TableCell align="center">Brand Name</TableCell>
            <TableCell align="center">description</TableCell>
            <TableCell align="center">category_id</TableCell>
            <TableCell align="center">file</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.description}</TableCell>
              <TableCell align="center">{item.category_id}</TableCell>
              <TableCell align="center">{item.file}</TableCell>

              <TableCell align="center">
                <Button variant="contained" color="warning" sx={{ marginRight: "10px" }} onClick={() => onEdit(item)}>
                  <ModeEditIcon />
                </Button>
                <Button variant="contained" color="error" onClick={() => onDelete(item.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
