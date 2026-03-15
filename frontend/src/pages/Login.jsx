import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Divider, Stack, Alert, Checkbox, FormControlLabel,
  InputAdornment, IconButton, CircularProgress,
} from '@mui/material';
import {
  Login as LoginIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility, VisibilityOff,
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#111827',
    borderRadius: 2.5,
    fontSize: 14,
    color: '#f9fafb',
    '& fieldset': { borderColor: '#374151' },
    '&:hover fieldset': { borderColor: '#4b5563' },
    '&.Mui-focused fieldset': { borderColor: '#7c3aed', borderWidth: 1.5 },
  },
  '& .MuiInputLabel-root': { color: '#6b7280', fontSize: 14 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#a78bfa' },
  '& input': { color: '#f9fafb' },
  '& input::placeholder': { color: '#4b5563' },
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password); // ⬅️ get returned user
    
      if (loggedInUser.role === 'admin') navigate('/admin');
      else if (loggedInUser.role === 'manager') navigate('/manager');
      else navigate('/dashboard');
    }   catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f0f1a', display: 'flex',
      alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Card elevation={0} sx={{ bgcolor: '#1e1e2f', border: '1px solid #2d2d4e',
        borderRadius: 4, width: '100%', maxWidth: 420 }}>
        <CardContent sx={{ p: '40px 36px !important' }}>

          
          <Stack alignItems="center" mb={3.5}>
            <Box sx={{ width: 52, height: 52, bgcolor: '#3b1f6b', borderRadius: 3.5,
              display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <LoginIcon sx={{ color: '#c4b5fd', fontSize: 22 }} />
            </Box>
            <Typography sx={{ color: '#a78bfa', fontSize: 22, fontWeight: 700 }}>
              Welcome back
            </Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 13, mt: .5 }}>
              Sign in to your account
            </Typography>
          </Stack>

          
          {error && (
            <Alert
              severity="error"
              icon={<ErrorIcon sx={{ fontSize: 18 }} />}
              sx={{ mb: 2.5, bgcolor: '#2d1a1a', color: '#f87171',
                border: '1px solid #7f1d1d', borderRadius: 2, fontSize: 13,
                '& .MuiAlert-icon': { color: '#f87171' } }}
            >
              {error}
            </Alert>
          )}

          
          <Box component="form" onSubmit={handleSubmit}>
            <Stack gap={2} mb={2.5}>
              <TextField
                label="Email address"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                size="small"
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ fontSize: 17, color: '#4b5563' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                size="small"
                sx={inputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ fontSize: 17, color: '#4b5563' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end"
                        sx={{ color: '#6b7280', '&:hover': { color: '#a78bfa' } }}>
                        {showPassword
                          ? <VisibilityOff sx={{ fontSize: 18 }} />
                          : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            
            <Button type="submit" fullWidth variant="contained" disabled={loading}
              sx={{ py: 1.4, bgcolor: '#7c3aed', borderRadius: 2.5, fontSize: 15,
                fontWeight: 700, textTransform: 'none', letterSpacing: .3,
                '&:hover': { bgcolor: '#6d28d9' }, '&.Mui-disabled': { bgcolor: '#4c2a8a', color: '#9370db' },
                boxShadow: 'none' }}>
              {loading
                ? <Stack direction="row" gap={1} alignItems="center">
                    <CircularProgress size={16} sx={{ color: '#c4b5fd' }} />
                    <span>Signing in…</span>
                  </Stack>
                : 'Sign in'}
            </Button>
          </Box>

         
          <Divider sx={{ my: 2.5, borderColor: '#2d2d4e',
            '&::before, &::after': { borderColor: '#2d2d4e' },
            '& .MuiDivider-wrapper': { color: '#4b5563', fontSize: 12 } }}>
            or continue with
          </Divider>
      
          <Typography sx={{ textAlign: 'center', color: '#6b7280', fontSize: 13 }}>
            Don't have an account?{' '}
            <Typography component={Link} to="/register"
              sx={{ color: '#a78bfa', fontWeight: 500, textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' } }}>
              Create one here
            </Typography>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;