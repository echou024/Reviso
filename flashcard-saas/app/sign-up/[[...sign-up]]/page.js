"use client";

import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: 'pink' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#494646"}}>
            Reviso
          </Typography>
          <Button color="inherit">
            <Link href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sign-In Section */}
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: 'center', my: 4 }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{color:"pink"}}>
            Create An Account
          </Typography>
          <SignUp />
        </Box>
      </Container>
    </div>
  );
}
