import {
  Container,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, deleteByIndex, clearAll }) {
  if (!data || data.length === 0) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>Quotation</Typography>
        <Typography variant="body1" color="textSecondary">
          <CiShoppingCart /> No items
        </Typography>
      </Container>
    );
  }

  const total = data.reduce(
    (acc, v) => acc + v.qty * v.ppu * (1 - (v.discount || 0) / 100),
    0
  );

  const totalDiscount = data.reduce(
    (acc, v) => acc + v.qty * v.ppu * ((v.discount || 0) / 100),
    0
  );

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Quotation</Typography>
      <Button
        variant="outlined"
        color="error"
        startIcon={<MdClear />}
        onClick={clearAll}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>

      <Paper elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount %</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const discount = v.discount || 0;
              const amount = v.qty * v.ppu * (1 - discount / 100);
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <IconButton onClick={() => deleteByIndex(i)}>
                      <BsFillTrashFill />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell align="center">{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{discount}</TableCell>
                  <TableCell align="center">{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total Discount</strong>
              </TableCell>
              <TableCell align="right">{totalDiscount.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">{total.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Container>
  );
}

export default QuotationTable;
