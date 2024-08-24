'use client';

import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress, IconButton } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import FlashCard from './flashcard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Generate() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
  const { signOut } = useClerk();

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }

    setError('');
    setLoading(true);

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
      setFlashcards(data.flashcards);
      setCurrentIndex(0); // Reset index to the first card when new cards are generated
    } catch (error) {
      setError('An error occurred while generating flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  const handleChangeIndex = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: 0, overflow: 'hidden' }}>
      {/* Sidebar */}
      <Box sx={{ width: '20%', backgroundColor: '#79c9fa', p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <img src="/assets/rocket-logo.png" alt="Reviso Logo" style={{ height: 150 }} /> {/* Increased logo size */}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: '2rem' }}>
          {['Nervous system', 'Roman empire', 'DMV test prep', 'Spanish verbs'].map((item, index) => (
            <Typography 
              key={index} 
              sx={{ 
                color: index === 0 ? '#f974a6' : 'white', 
                fontWeight: 'bold', 
                fontSize: '1.25rem',
                textAlign: 'left', 
                paddingLeft: '1rem', 
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ width: '80%', backgroundColor: '#073B73', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', position: 'relative' }}>
        
        {/* Sign Out Button */}
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '8px',
            '&:hover': {
              backgroundColor: '#f974a6', 
            },
          }} 
          onClick={handleSignOut}
        >
          <img src="/assets/icon3.png" alt="Sign Out" style={{ width: 24, height: 24 }} />
        </IconButton>

        <Box sx={{ width: '100%', maxWidth: '800px', zIndex: 1000, backgroundColor: '#073B73', paddingBottom: '1rem', position: 'relative' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#f974a6', textAlign: 'left', letterSpacing: '0.3rem', mb: 3, fontWeight: 'bold' }}>
            NERVOUS SYSTEM
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, width: '100%' }}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
              fullWidth
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#f974a6',
                  fontWeight: 'bold', 
                },
              }}
              InputProps={{
                sx: {
                  fontSize: '1.25rem',
                  padding: '14px',
                  color: 'pink',
                  fontWeight: 'bold', 
                },
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
              <Box sx={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/icon1.png" alt="icon1" style={{ width: 24, height: 24 }} />
              </Box>
              <Box sx={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/icon2.png" alt="icon2" style={{ width: 24, height: 24 }} />
              </Box>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: '#79c9fa',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold', 
                  '&:hover': {
                    backgroundColor: '#61b0e8',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Flashcards'}
              </Button>
            </Box>
          </Box>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2, fontWeight: 'bold' }}>
            {error}
          </Typography>
        )}

        <Box sx={{ flex: 1, overflowY: 'auto', zIndex: 1, paddingTop: '1rem', width: '100%', maxWidth: '600px', position: 'relative', textAlign: 'center' }}>
          {flashcards.length > 0 && (
            <>
              <SwipeableViews index={currentIndex} onChangeIndex={handleChangeIndex}>
                {flashcards.map((flashcard, index) => (
                  <Box key={index} sx={{ padding: '0 1rem' }}>
                    <FlashCard 
                      front={flashcard.front} 
                      back={flashcard.back} 
                      color={index % 2 === 0 ? '#f974a6' : '#ffa5c6'} 
                    />
                  </Box>
                ))}
              </SwipeableViews>

              {/* Counter */}
              <Typography variant="body1" sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>
                {currentIndex + 1} / {flashcards.length}
              </Typography>
              
              <IconButton
                sx={{
                  position: 'absolute',
                  left: 'calc(50% - 100px)', 
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: '#f974a6',
                  },
                }}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ArrowBackIosIcon />
              </IconButton>

              <IconButton
                sx={{
                  position: 'absolute',
                  right: 'calc(50% - 100px)', 
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: '#f974a6',
                  },
                }}
                onClick={handleNext}
                disabled={currentIndex === flashcards.length - 1}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}





