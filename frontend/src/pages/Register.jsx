import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
  LinearProgress,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';

import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  AdminPanelSettings as AdminIcon,
  Person2 as UserIcon,
  ManageAccounts as ManagerIcon
} from '@mui/icons-material';

const dark = {
  bg: '#0f0f1a',
  card: '#1e1e2f',
  input: '#111827',
  border: '#374151',
};

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const strengthConfig = [
  { label: '', color: '#2d2d4e', pct: 0 },
  { label: 'Weak', color: '#ef4444', pct: 25 },
  { label: 'Fair', color: '#f59e0b', pct: 50 },
  { label: 'Good', color: '#3b82f6', pct: 75 },
  { label: 'Strong', color: '#22c55e', pct: 100 },
];

const RoleOption = ({ value, selected, onSelect, icon, label, sub, accentColor }) => (
  <Box
    onClick={() => onSelect(value)}
    sx={{
      border: `1px solid ${selected ? accentColor : dark.border}`,
      borderRadius: 2,
      p: '10px 14px',
      cursor: 'pointer',
      bgcolor: selected ? `${accentColor}18` : 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: 1.2,
      transition: 'all .2s',
      '&:hover': { borderColor: accentColor },
    }}
  >
    <Box sx={{ color: accentColor }}>{icon}</Box>

    <Box>
      <Typography sx={{ color: '#f9fafb', fontSize: 13, fontWeight: 500 }}>
        {label}
      </Typography>

      <Typography sx={{ color: '#6b7280', fontSize: 11 }}>
        {sub}
      </Typography>
    </Box>
  </Box>
);

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [terms, setTerms] = useState(false);

  const strength = getStrength(formData.password);
  const sc = strengthConfig[strength];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!terms) {
      setError('Please accept the Terms of Service.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );

      if (formData.role === 'admin') navigate('/admin');
      else if (formData.role === 'manager') navigate('/manager');
      else navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: dark.input,
      borderRadius: 2,
      color: '#f9fafb',
      fontSize: 14,
      '& fieldset': { borderColor: dark.border },
      '&:hover fieldset': { borderColor: '#4b5563' },
      '&.Mui-focused fieldset': { borderColor: '#7c3aed' },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: dark.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '32px 16px'
      }}
    >
      <Card
        elevation={0}
        sx={{
          bgcolor: dark.card,
          border: '1px solid #2d2d4e',
          borderRadius: 4,
          width: '100%',
          maxWidth: 420
        }}
      >
        <CardContent sx={{ p: '36px 32px !important' }}>

         

          <Stack alignItems="center" mb={3}>
            <Box
              sx={{
                bgcolor: '#7c3aed',
                borderRadius: 2.5,
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5
              }}
            >
              <PersonIcon sx={{ color: '#fff', fontSize: 22 }} />
            </Box>

            <Typography sx={{ color: '#f9fafb', fontSize: 20, fontWeight: 700 }}>
              Create account
            </Typography>

            <Typography sx={{ color: '#6b7280', fontSize: 13, mt: 0.5 }}>
              Register with JWT Authentication
            </Typography>
          </Stack>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                bgcolor: '#2d1a1a',
                color: '#f87171',
                border: '1px solid #7f1d1d',
                fontSize: 13
              }}
            >
              {error}
            </Alert>
          )}

          <Stack component="form" onSubmit={handleSubmit} spacing={2}>

           

            <TextField
              label="Full name"
              name="name"
              required
              fullWidth
              size="small"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }
              }}
            />

           

            <TextField
              label="Email address"
              name="email"
              type="email"
              required
              fullWidth
              size="small"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              sx={inputSx}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }
              }}
            />

            

            <Box>
              <TextField
                label="Password"
                name="password"
                required
                fullWidth
                size="small"
                type={showPw ? 'text' : 'password'}
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                sx={inputSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowPw(!showPw)}
                        >
                          {showPw ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />

              {formData.password && (
                <Box mt={0.8}>
                  <LinearProgress
                    variant="determinate"
                    value={sc.pct}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: '#2d2d4e',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: sc.color
                      }
                    }}
                  />

                  <Typography
                    sx={{ fontSize: 11, color: sc.color, mt: 0.4 }}
                  >
                    {sc.label}
                  </Typography>
                </Box>
              )}
            </Box>

           

            <Box>
              <Typography
                sx={{
                  color: '#c4b5fd',
                  fontSize: 12,
                  fontWeight: 600,
                  mb: 1
                }}
              >
                Role
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1.2
                }}
              >
                <RoleOption
                  value="user"
                  selected={formData.role === 'user'}
                  onSelect={(v) => setFormData({ ...formData, role: v })}
                  icon={<UserIcon sx={{ fontSize: 18 }} />}
                  label="User"
                  sub="Standard access"
                  accentColor="#a78bfa"
                />

                <RoleOption
                  value="admin"
                  selected={formData.role === 'admin'}
                  onSelect={(v) => setFormData({ ...formData, role: v })}
                  icon={<AdminIcon sx={{ fontSize: 18 }} />}
                  label="Admin"
                  sub="Full access"
                  accentColor="#f59e0b"
                />

                <RoleOption
                  value="manager"
                  selected={formData.role === 'manager'}
                  onSelect={(v) => setFormData({ ...formData, role: v })}
                  icon={<ManagerIcon sx={{ fontSize: 20 }} />}
                  label="Manager"
                  sub="Manager access"
                  accentColor="#3b82f6"
                />
              </Box>
            </Box>

            

            <FormControlLabel
              control={
                <Checkbox
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  size="small"
                />
              }
              label={
                <Typography sx={{ color: '#9ca3af', fontSize: 12 }}>
                  I agree to the Terms of Service and Privacy Policy
                </Typography>
              }
            />

            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: '#7c3aed',
                borderRadius: 2,
                py: 1.3,
                fontSize: 15,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { bgcolor: '#6d28d9' }
              }}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>

            <Typography sx={{ textAlign: 'center', color: '#6b7280', fontSize: 13 }}>
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" sx={{ color: '#a78bfa' }}>
                Login here
              </Link>
            </Typography>

          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;