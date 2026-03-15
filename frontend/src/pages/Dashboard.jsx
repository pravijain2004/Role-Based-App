import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from '../utils/axiosConfig';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Avatar,
  Divider, LinearProgress, Stack, CircularProgress,
} from '@mui/material';
import {
  GridView as GridIcon,
  Lock as LockIcon,
  Token as TokenIcon,
  CheckCircle as CheckIcon,
  Warning as WarnIcon,
  Api as ApiIcon,
  Autorenew as RefreshIcon,
} from '@mui/icons-material';

const light = {
  bg: '#f5f6fa',
  card: '#ffffff',
  alt: '#ffffff',
  border: '#e5e7eb',
  green: '#bbf7d0',
  amber: '#fde68a',
};

const StatCard = ({ label, value, sub, subColor = '#6b7280', barColor, barPct }) => (
  <Card elevation={0} sx={{ bgcolor: light.alt, border: `1px solid ${light.border}`, borderRadius: 3, flex: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
    <CardContent sx={{ p: '16px 18px !important' }}>
      <Typography sx={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .5 }}>{label}</Typography>
      <Typography sx={{ fontSize: 26, fontWeight: 700, color: barColor, my: .4 }}>{value}</Typography>
      <Typography sx={{ fontSize: 11, color: subColor }}>{sub}</Typography>
      <LinearProgress variant="determinate" value={barPct}
        sx={{ mt: 1, height: 5, borderRadius: 3, bgcolor: '#f3f4f6',
          '& .MuiLinearProgress-bar': { bgcolor: barColor, borderRadius: 3 } }} />
    </CardContent>
  </Card>
);

const ActivityRow = ({ dot, title, meta, badgeBg, badgeColor, badgeLabel }) => (
  <Stack direction="row" alignItems="flex-start" gap={1.5} py={1.2}
    sx={{ borderBottom: `1px solid ${light.border}`, '&:last-child': { borderBottom: 0 } }}>
    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: dot, mt: .5, flexShrink: 0 }} />
    <Box flex={1}>
      <Typography sx={{ color: '#111827', fontSize: 13, fontWeight: 500 }}>{title}</Typography>
      <Typography sx={{ color: '#9ca3af', fontSize: 11 }}>{meta}</Typography>
    </Box>
    <Chip label={badgeLabel} size="small"
      sx={{ bgcolor: badgeBg, color: badgeColor, fontSize: 11, height: 22, borderRadius: 1.5 }} />
  </Stack>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [serverMessage, setServerMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get('/api/dashboard');
        setServerMessage(data.message);
      } catch {
        setServerMessage('Failed to fetch from server');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase() || 'U';
  const token = localStorage.getItem('token');

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: light.bg, p: { xs: '24px 16px', sm: '32px 28px' } }}>

        <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
          <Box sx={{ bgcolor: '#7c3aed', borderRadius: 2.5, width: 42, height: 42,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GridIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ color: '#111827', fontWeight: 700, fontSize: 18 }}>Dashboard</Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 12 }}>You are logged in successfully</Typography>
          </Box>
          <Chip
            icon={<Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#22c55e', ml: '8px !important' }} />}
            label="Session active"
            size="small"
            sx={{ ml: 'auto', bgcolor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0',
              fontSize: 12, fontWeight: 500, '& .MuiChip-label': { pr: 1.5 } }}
          />
        </Stack>

        <Stack direction="row" gap={1.8} flexWrap="wrap" mb={2.5}>
          <StatCard label="Login streak" value="7"   sub="days in a row"  subColor="#7c3aed" barColor="#7c3aed" barPct={70} />
          <StatCard label="API calls"    value="142" sub="+18 today"      subColor="#16a34a" barColor="#22c55e" barPct={55} />
          <StatCard label="Role access"  value="3"   sub="routes allowed" barColor="#f59e0b" barPct={35} />
          <StatCard label="Token expiry" value="24h" sub="remaining"      barColor="#3b82f6" barPct={80} />
        </Stack>

        <Grid container spacing={2} mb={2.5}>

          <Grid item xs={12} md={7}>
            <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid ${light.border}`, borderRadius: 3, height: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <CardContent sx={{ p: '22px 24px !important' }}>
                <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14, mb: 2 }}>Your profile</Typography>
                <Stack direction="row" gap={1.5} alignItems="center" mb={2} pb={2}
                  sx={{ borderBottom: `1px solid ${light.border}` }}>
                  <Avatar sx={{ width: 52, height: 52, fontSize: 18, fontWeight: 700,
                    bgcolor: '#f3e8ff', color: '#7c3aed' }}>{initials}</Avatar>
                  <Box>
                    <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 15 }}>{user?.name}</Typography>
                    <Typography sx={{ color: '#9ca3af', fontSize: 12 }}>{user?.email}</Typography>
                    <Chip label={user?.role || 'user'} size="small" sx={{ mt: .5,
                      bgcolor: user?.role === 'admin' ? '#f3e8ff' : '#dcfce7',
                      color: user?.role === 'admin' ? '#7c3aed' : '#16a34a',
                      fontWeight: 600, fontSize: 11, height: 22 }} />
                  </Box>
                </Stack>
                {[
                  { label: 'User ID',         value: '#USR-0001', mono: true },
                  { label: 'Token stored in', value: 'localStorage ✓', color: '#16a34a' },
                  { label: '2FA',             value: 'Enabled', color: '#16a34a' },
                  { label: 'Member since',    value: 'Jan 5, 2025' },
                ].map(({ label, value, color, mono }) => (
                  <Stack key={label} direction="row" justifyContent="space-between" alignItems="center" py={.9}
                    sx={{ borderBottom: `1px solid ${light.border}`, '&:last-child': { borderBottom: 0 } }}>
                    <Typography sx={{ color: '#6b7280', fontSize: 13 }}>{label}</Typography>
                    <Typography sx={{ color: color || '#111827', fontSize: 13,
                      fontFamily: mono ? 'monospace' : 'inherit' }}>{value}</Typography>
                  </Stack>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack gap={2} height="100%">

              <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid #bbf7d0`, borderRadius: 3, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <CardContent sx={{ p: '20px 22px !important' }}>
                  <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
                    <LockIcon sx={{ color: '#16a34a', fontSize: 16 }} />
                    <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14 }}>Protected API</Typography>
                  </Stack>
                  <Box sx={{ bgcolor: '#f0fdf4', borderRadius: 2, p: 1.8, border: `1px solid #bbf7d0` }}>
                    {loading ? (
                      <Stack direction="row" gap={1} alignItems="center">
                        <CircularProgress size={13} sx={{ color: '#16a34a' }} />
                        <Typography sx={{ color: '#16a34a', fontFamily: 'monospace', fontSize: 12 }}>
                          Fetching /api/dashboard…
                        </Typography>
                      </Stack>
                    ) : (
                      <>
                        <Typography sx={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: 12 }}>GET /api/dashboard</Typography>
                        <Typography sx={{ color: '#16a34a', fontFamily: 'monospace', fontSize: 12 }}>200 OK</Typography>
                        <Typography sx={{ color: '#15803d', fontFamily: 'monospace', fontSize: 12 }}>
                          "{serverMessage}"
                        </Typography>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid ${light.border}`, borderRadius: 3, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <CardContent sx={{ p: '22px 24px !important' }}>
            <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14, mb: 1.5 }}>Recent activity</Typography>
            <ActivityRow dot="#22c55e" title="Logged in successfully"  meta="Today at 09:42 AM · IP 192.168.1.1"    badgeBg="#f0fdf4" badgeColor="#16a34a" badgeLabel="success" />
            <ActivityRow dot="#3b82f6" title="Accessed /api/dashboard" meta="Today at 09:42 AM · 200 OK"            badgeBg="#dbeafe" badgeColor="#2563eb" badgeLabel="API" />
            <ActivityRow dot="#7c3aed" title="JWT token refreshed"     meta="Yesterday at 11:15 PM · Auto-refresh"  badgeBg="#f3e8ff" badgeColor="#7c3aed" badgeLabel="token" />
            <ActivityRow dot="#ef4444" title="Failed login attempt"    meta="Yesterday at 06:30 PM · IP 10.0.0.55" badgeBg="#fff1f2" badgeColor="#dc2626" badgeLabel="warning" />
          </CardContent>
        </Card>

      </Box>
    </>
  );
};

export default Dashboard;