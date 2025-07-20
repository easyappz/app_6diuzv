import React, { useState, useEffect } from 'react';
import { instance } from './api/axios';
import ErrorBoundary from './ErrorBoundary';
import { TextField, Box, Typography, Container, Paper } from '@mui/material';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);

  // Load the latest input value from the database on component mount
  useEffect(() => {
    const fetchInputValue = async () => {
      try {
        const response = await instance.get('/api/input-value');
        if (response.data && response.data.value) {
          setInputValue(response.data.value);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInputValue();
  }, []);

  // Handle input change and save to database
  const handleInputChange = async (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    try {
      await instance.post('/api/input-value', { value: newValue });
      console.log('Значение успешно сохранено');
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="sm" style={{ marginTop: '50px' }}>
        <Paper elevation={3} style={{ padding: '30px', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Введите текст
          </Typography>
          <Box mt={3}>
            <TextField
              label="Ваше значение"
              value={inputValue}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              disabled={loading}
              placeholder="Начните ввод..."
            />
          </Box>
          {loading && (
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
              Загрузка данных...
            </Typography>
          )}
        </Paper>
      </Container>
    </ErrorBoundary>
  );
}

export default App;
