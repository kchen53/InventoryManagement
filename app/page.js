'use client'
import{useState, useEffect} from 'react'
import { firestore } from '../firebase';
import {doc, setDoc, getDoc, querySnapshot, query, collection, onSnapshot, deleteField, deleteDoc, increment, updateDoc} from "firebase/firestore"
import { CssBaseline, Toolbar, Typography, AppBar, Container, Card, CardContent, CardActions, Button} from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Home() {

  const [inventory, setInventory] = useState([]);
  const [newInventory, setNewInventory] = useState({inventory: '', quantity: ''});
  let count = 0;

  //add inventory to database
  const addNewInventory = async (e) => {
    e.preventDefault();

    if (newInventory.inventory !== '' && newInventory.quantity !== ''){
      // setInventory([...inventory, newInventory]);
      await setDoc(doc(firestore, "inventory", newInventory.inventory), {
        inventory: newInventory.inventory.trim(),
        quantity: newInventory.quantity.trim()
      });
    }

    setNewInventory({inventory: '', quantity: ''});
  };

  //read inventory
  useEffect(() => {
    const read = query(collection(firestore, "inventory"));
      
    onSnapshot(read, (querySnapshot) => {
      let inventoryArr = [];

      querySnapshot.forEach((doc) => {
        inventoryArr.push({...doc.data(), id: doc.id});
      })
      setInventory(inventoryArr);
    });

  }, [])

  //remove inventory from database
  const removeInventory = async (item) => {

    let count = 0;
    count = item.quantity - 1;

    if(count === 0){
      await deleteDoc(doc(firestore, "inventory", item.inventory));
    }
    else{
      await setDoc(doc(firestore, "inventory", item.inventory), {
        inventory: item.inventory.trim(),
        quantity: count
      });
    }
  };


  //update database
  const addInventory = async (item) => {
      
      const itemDoc = doc(firestore, "inventory", item.inventory);
  
      await updateDoc(itemDoc, {
        inventory: item.inventory.trim(),
        quantity: increment(1)
      });
  };

  return (
    <>
      <CssBaseline/>
      <AppBar position="static" color='primary'>
      <Toolbar>
        <Typography variant='h4'>
          Inventory Manager
        </Typography>
      </Toolbar>
      </AppBar>

      <main>
        <Container align="center" style={{marginTop:'50px'}}>
          <TableContainer component={Paper} style={{marginBottom:'50px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Update Inventory List
                    </TableCell>
                  </TableRow>
                      
                  <TableCell>
                    <TextField
                    value={newInventory.inventory}
                    onChange={(e) => setNewInventory({...newInventory, inventory: e.target.value})}
                    id="outlined-basic" 
                    label="Inventory Name" 
                    variant="outlined" 
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <TextField
                    value={newInventory.quantity}
                    onChange={(e) => setNewInventory({...newInventory, quantity: e.target.value})}
                    id="outlined-basic" 
                    label="Quantity" 
                    variant="outlined" 
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={addNewInventory}>
                      Add
                    </Button>
                </TableCell>
              </TableHead>
              </Table>
          </TableContainer>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Inventory</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Update/Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow
                    key={item.inventory}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.inventory}
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        <Button onClick={() => addInventory(item)}>
                          <AddIcon/>
                        </Button>
                        <Button onClick={() => removeInventory(item)}>
                          <RemoveIcon/>
                        </Button>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>

    </>
  );
}
