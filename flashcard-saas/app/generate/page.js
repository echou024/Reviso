'use client'

import { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent,CircularProgress  } from '@mui/material';
import FlashCard from './flashcard';

export default function Generate() {
  console.log('GeneratePage component rendered');

  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }

    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      setFlashcards(data.flashcards);
      console.log('Flashcards set:', data.flashcards);

    } catch (error) {
      console.error('Error generating flashcards:', error);
      setError('An error occurred while generating flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log('Flashcards state updated:', flashcards);
  }, [flashcards]);
  
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{color:'pink'}}>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'pink',
              },
              '&:hover fieldset': {
                borderColor: 'pink',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'pink',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'pink',
              '&.Mui-focused': {
                color: 'pink',
              },
            },
            '& .MuiInputBase-input': {
              color: 'pink',
            },
          }}
          InputProps={{
            sx: {
              '&::placeholder': {
                color: 'pink',
              },
            },
          }}
          
        />
        <Button variant="outlined"
          onClick={handleSubmit}
          fullWidth
          disabled={loading}
          sx={{
            mt: 2,
            color: 'pink',
            borderColor: 'pink',
            '&:hover': {
              borderColor: 'pink',
              backgroundColor: 'rgba(255, 192, 203, 0.04)',
            },
            '&:disabled': {
              borderColor: 'rgba(255, 192, 203, 0.5)',
              color: 'rgba(255, 192, 203, 0.5)',
            },
          }} >
        {loading ? <CircularProgress size={24} /> : 'Generate Flashcards'}
        </Button>
      {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
         </Box>
         {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{color:'pink'}}>
          Generated Flashcards: 
        </Typography>
        <Grid container spacing={2}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FlashCard front={flashcard.front} back={flashcard.back} />
            </Grid>
          ))}
        </Grid>
      </Box>
      )}
    </Container>
  );
}
