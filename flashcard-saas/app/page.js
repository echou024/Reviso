"use client"; // Add this directive at the top
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, AppBar, Toolbar, Grid, Divider } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import getStripe from '../utils/get-stripe';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const TextButton = styled(Button)({
    color: '#494646',
  });

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const checkoutSession = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { origin: 'http://localhost:3000' }, // Adjust based on your environment
      });

      const checkoutSessionJson = await checkoutSession.json();
      const stripe = await getStripe();

      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChooseFree = () => {
    setLoading(true);
    router.push('/generate');
  };


  

  return (
    <div>
      {/* Header and Navigation */}
      <AppBar position="static" sx={{backgroundColor:'pink'}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color:"#494646"}}>
            Reviso
          </Typography>
          <SignedOut>
            <TextButton color="inherit" component={Link} href="/sign-in">
              Log In
            </TextButton>
            <TextButton color="inherit" component={Link} href="/sign-up">
              Sign Up
            </TextButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', my: 6 , color:'pink'}}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Reviso 
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Learn Smarter.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2, mr: 2 , color:'pink', borderColor:'pink',
          '&:hover': {
            borderColor: 'pink',
            backgroundColor: 'rgba(255, 192, 203, 0.04)', // light pink background on hover
          },
          '&:disabled': {
            borderColor: 'rgba(255, 192, 203, 0.5)', // faded pink when disabled
            color: 'rgba(255, 192, 203, 0.5)',
          },}}
          component={Link} href="/sign-up"
        >
          Get started
        </Button>
      </Box>
      {/* Features Section */}
      <Box sx={{ my: 10,  textAlign: 'center' , color:'pink', 
        border: '1px solid pink',
        padding: 4, // Add some padding
        borderRadius: 2, // Rounded corners
        justifyContent: 'center',
        margin: '0 auto', // Center the box horizontally and add vertical margin
        maxWidth: '80%', // Limit the width of the box
        }}>
        <Typography variant="h4" component="h2" gutterBottom>
          About Reviso
        </Typography>
        <Grid container justifyContent="center">
          {/* Feature items */}
          <Grid item xs={12} md={8} lg={10} sx={{textAlign: 'center' , color:'pink'}}>
            <Typography variant="h6">Customizable Flashcard Generation</Typography>
            <Typography sx={{fontSize: '1.25rem', my:3 ,}}>Users can input their prompts or text, and the AI will generate flashcards with key questions and answers based on the content. </Typography>
          </Grid>
      
        </Grid>
      </Box>

      {/* Pricing Section */}
      {/* Pricing Section */}
<Box sx={{ my: 6, textAlign: 'center', color: 'pink' }}>
  <Typography variant="h4" component="h2" gutterBottom>
    Pricing
  </Typography>
  <Grid container spacing={0} justifyContent="center" alignItems="stretch" sx={{my:4}}>
    {/* Free Plan */}
    <Grid item xs={12} md={5} sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h6">Free Plan</Typography>
        <Typography variant="h5" sx={{ my: 2 }}>$0 / month</Typography>
        <Typography>Basic features for individual users.</Typography>
      </Box>
      <Button
        variant="outlined"
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
        }}
        onClick={handleChooseFree}
        disabled={loading}
      >
        {loading ? "One Moment..." : "Choose Free"}
      </Button>
    </Grid>

    {/* Vertical Divider */}
    <Divider orientation="vertical" flexItem sx={{ 
      display: { xs: 'none', md: 'block' },
      borderColor: 'pink',
      borderRightWidth: 1,
    }} />

    {/* Pro Plan */}
    <Grid item xs={12} md={5} sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h6">Pro Plan</Typography>
        <Typography variant="h5" sx={{ my: 2 }}>$10 / month</Typography>
        <Typography>Users are allowed to upload their documents and generate flashcards from the content of PDF and Word files.</Typography>
      </Box>
      <Button
        variant="outlined"
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
        }}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : "Choose Pro"}
      </Button>
    </Grid>
  </Grid>
</Box>
  </div>
  );
}

