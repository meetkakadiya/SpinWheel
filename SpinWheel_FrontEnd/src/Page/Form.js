import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);


  // Function to generate a random light hex color code
const generateRandomLightColor = () => {
  let letters = 'BCDEF'; // Use only light color range
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

// Function to get a unique random light color
const getUniqueRandomLightColor = (existingColors) => {
  let newColor = generateRandomLightColor();
  // Ensure the color is unique
  while (existingColors.has(newColor)) {
    newColor = generateRandomLightColor();
  }
  existingColors.add(newColor);
  return newColor;
}

// Example usage
let existingColors = new Set();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const color = getUniqueRandomLightColor(existingColors);
      // Replace with your API endpoint
      await axios.post('http://localhost:5001/api/user/add', 
      { option: name, style: { backgroundColor: color.toString(), textColor: 'black' } });
      fetchData();
      setName('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const fetchData = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.get('http://localhost:5001/api/user/getdata');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/user/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Enter the Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.option}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default App;
