// App.jsx
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import QuotationTable from "./QuotationTable";
import data from "./data.json";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 300 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  useEffect(() => {
    setDataItems(data);
  }, []);

  const addItem = () => {
    const item = products.find((v) => itemRef.current.value === v.code);
    const newPpu = Number(ppuRef.current.value);
    const newQty = Number(qtyRef.current.value);
    const newDiscount = Number(discountRef.current.value) || 0;

    const index = dataItems.findIndex(
      (v) => v.item === item.name && Number(v.ppu) === newPpu
    );

    if (index !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[index].qty += newQty;
      updatedItems[index].discount += newDiscount;
      setDataItems(updatedItems);
    } else {
      const newItem = {
        item: item.name,
        ppu: newPpu,
        qty: newQty,
        discount: newDiscount,
      };
      setDataItems([...dataItems, newItem]);
    }
  };

  const deleteByIndex = (index) => {
    const updated = [...dataItems];
    updated.splice(index, 1);
    setDataItems(updated);
  };

  const clearAll = () => setDataItems([]);

  const productChange = () => {
    const item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Add Item
      </Typography>
      <Box sx={{ background: "#e4e4e4", p: 3, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>Item</InputLabel>
            <Select
              fullWidth
              inputRef={itemRef}
              defaultValue={products[0].code}
              onChange={productChange}
            >
              {products.map((p) => (
                <MenuItem key={p.code} value={p.code}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price Per Unit"
              inputRef={ppuRef}
              value={ppu}
              type="number"
              onChange={(e) => setPpu(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              inputRef={qtyRef}
              type="number"
              defaultValue={1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Discount (%)"
              inputRef={discountRef}
              type="number"
              defaultValue={0}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={addItem}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      <QuotationTable
        data={dataItems}
        deleteByIndex={deleteByIndex}
        clearAll={clearAll}
      />
    </Container>
  );
}

export default App;
