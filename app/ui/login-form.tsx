'use client';

import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/action';
import { useSearchParams } from 'next/navigation';
import { TextField, Box, Typography, Button } from '@mui/material';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <Box
      component="form"
      action={formAction}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 4,
        bgcolor: '#f8f9fa',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          mb: 3,
          fontFamily: lusitana.className,
          fontWeight: 'bold',
          color: '#1e3a8a',
          textAlign: 'center',
        }}
      >
        Log in to PayUp
      </Typography>

      {/* Email Field */}
      <TextField
        fullWidth
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        required
        error={!!errorMessage} // Show error style if error exists
        helperText={errorMessage} // Display error below the field
        sx={{
          mb: 2,
          '& label.Mui-focused': { color: '#1e3a8a' },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#1e3a8a' },
            '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
          },
        }}
      />

      {/* Password Field */}
      <TextField
        fullWidth
        label="Password"
        type="password"
        name="password"
        placeholder="Enter password"
        required
        inputProps={{ minLength: 6 }}
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{
          mb: 2,
          '& label.Mui-focused': { color: '#1e3a8a' },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#1e3a8a' },
            '&.Mui-focused fieldset': { borderColor: '#1e3a8a' },
          },
        }}
      />

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      {/* Login Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: '#3B82F6',
          color: 'white',
          '&:hover': { bgcolor: '#2563EB' },
        }}
        disabled={isPending}
        endIcon={<ArrowRightIcon className="h-5 w-5 text-gray-50" />}
      >
        Log in
      </Button>
    </Box>
  );
}
