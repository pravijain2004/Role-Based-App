import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from '../utils/axiosConfig';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Avatar,
  Divider, LinearProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  ManageAccounts as ManagerIcon,
  WifiTethering as ActiveIcon,
  Shield as ShieldIcon,
  VerifiedUser as VerifiedIcon,
  LockPerson as LockIcon,
} from '@mui/icons-material';


const light = {
  bg: '#f5f6fa',
  card: '#ffffff',
  cardAlt: '#ffffff',
  border: '#e5e7eb',
  borderBlue: '#bfdbfe',
  borderAmber: '#fde68a',
  code: '#f8fafc',
};


const StatCard = ({ label, value, sub, subColor = '#16a34a', barColor, barPct, icon }) => (
  <Card elevation={0} sx={{ bgcolor: light.cardAlt, border: `1px solid ${light.border}`, borderRadius: 3, flex: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
    <CardContent sx={{ p: '18px 20px !important' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography sx={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .5 }}>
          {label}
        </Typography>
        <Box sx={{ color: barColor, opacity: .8 }}>{icon}</Box>
      </Stack>
      <Typography sx={{ fontSize: 28, fontWeight: 700, color: barColor, my: .5 }}>{value}</Typography>
      <Typography sx={{ fontSize: 12, color: subColor }}>{sub}</Typography>
      <LinearProgress
        variant="determinate"
        value={barPct}
        sx={{ mt: 1, height: 6, borderRadius: 3, bgcolor: '#f3f4f6',
          '& .MuiLinearProgress-bar': { bgcolor: barColor, borderRadius: 3 } }}
      />
    </CardContent>
  </Card>
);


const RoleChip = ({ role }) => {
  const map = {
    admin:   { bg: '#f3e8ff', color: '#7c3aed' },
    manager: { bg: '#dcfce7', color: '#16a34a' },
    user:    { bg: '#dbeafe', color: '#2563eb' },
  };
  const s = map[role] || map.user;
  return (
    <Chip label={role} size="small"
      sx={{ bgcolor: s.bg, color: s.color, fontWeight: 600, fontSize: 11, height: 22 }} />
  );
};

const StatusChip = ({ online }) => (
  <Chip
    size="small"
    icon={<Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: online ? '#22c55e' : '#f87171', ml: '8px !important' }} />}
    label={online ? 'online' : 'offline'}
    sx={{ bgcolor: online ? '#f0fdf4' : '#fff1f2', color: online ? '#16a34a' : '#dc2626', fontSize: 11, height: 22 }}
  />
);


const AdminDashboard = () => {
  const { user } = useAuth();
  const [serverMessage, setServerMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const recentUsers = [
    { name: 'Alex Kumar',  email: 'alex@corp.io',  role: 'admin',   online: true,  joined: 'Jan 5',  initials: 'AK', avatarBg: '#f3e8ff', avatarColor: '#7c3aed' },
    { name: 'Sara Rafi',   email: 'sara@corp.io',  role: 'manager', online: true,  joined: 'Jan 9',  initials: 'SR', avatarBg: '#dcfce7', avatarColor: '#16a34a' },
    { name: 'Tom Mills',   email: 'tom@corp.io',   role: 'user',    online: false, joined: 'Jan 12', initials: 'TM', avatarBg: '#dbeafe', avatarColor: '#2563eb' },
    { name: 'Nina Park',   email: 'nina@corp.io',  role: 'user',    online: true,  joined: 'Jan 14', initials: 'NP', avatarBg: '#dbeafe', avatarColor: '#2563eb' },
    { name: 'Raj Patel',   email: 'raj@corp.io',   role: 'manager', online: false, joined: 'Jan 15', initials: 'RP', avatarBg: '#dcfce7', avatarColor: '#16a34a' },
  ];

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data } = await axios.get('/api/admin');
        setServerMessage(data.message);
      } catch {
        setServerMessage('Access denied or server error');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: light.bg, p: { xs: '24px 16px', sm: '32px 28px' } }}>

        
        <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
          <Box sx={{ bgcolor: '#7c3aed', borderRadius: 2.5, width: 42, height: 42,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ color: '#111827', fontWeight: 700, fontSize: 18 }}>Admin Dashboard</Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 12 }}>
              Welcome back, {user?.name} · Last login: today at 09:42 AM
            </Typography>
          </Box>
          <Chip label="ADMIN" sx={{ ml: 'auto', bgcolor: '#7c3aed', color: '#fff', fontWeight: 700, fontSize: 11 }} />
        </Stack>

        
        <Stack direction="row" gap={1.8} flexWrap="wrap" mb={2.5}>
          <StatCard label="Total Users"  value="248" sub="+12 this week"  barColor="#7c3aed" barPct={72} icon={<PeopleIcon sx={{ fontSize: 18 }} />} />
          <StatCard label="Admins"       value="4"   sub="1.6% of total"  barColor="#f59e0b" barPct={16} subColor="#6b7280" icon={<AdminIcon sx={{ fontSize: 18 }} />} />
          <StatCard label="Managers"     value="18"  sub="7.2% of total"  barColor="#16a34a" barPct={32} subColor="#6b7280" icon={<ManagerIcon sx={{ fontSize: 18 }} />} />
          <StatCard label="Active Now"   value="31"  sub="Live sessions"  barColor="#2563eb" barPct={48} icon={<ActiveIcon sx={{ fontSize: 18 }} />} />
        </Stack>

        
        <Grid container spacing={2} mb={2.5}>

          
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid ${light.border}`, borderRadius: 3, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <CardContent sx={{ p: '22px 24px !important' }}>
                <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14, mb: 2 }}>Recent users</Typography>
                <TableContainer component={Box}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {['User', 'Role', 'Status', 'Joined'].map(h => (
                          <TableCell key={h} sx={{ color: '#9ca3af', fontSize: 11, textTransform: 'uppercase',
                            letterSpacing: .5, borderColor: light.border, py: 1 }}>{h}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentUsers.map((u) => (
                        <TableRow key={u.email} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                          <TableCell sx={{ borderColor: light.border, py: 1.2 }}>
                            <Stack direction="row" alignItems="center" gap={1.2}>
                              <Avatar sx={{ width: 34, height: 34, fontSize: 12, fontWeight: 700,
                                bgcolor: u.avatarBg, color: u.avatarColor }}>{u.initials}</Avatar>
                              <Box>
                                <Typography sx={{ color: '#111827', fontSize: 13, fontWeight: 500 }}>{u.name}</Typography>
                                <Typography sx={{ color: '#9ca3af', fontSize: 11 }}>{u.email}</Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ borderColor: light.border }}><RoleChip role={u.role} /></TableCell>
                          <TableCell sx={{ borderColor: light.border }}><StatusChip online={u.online} /></TableCell>
                          <TableCell sx={{ borderColor: light.border, color: '#9ca3af', fontSize: 12 }}>{u.joined}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          
          <Grid item xs={12} md={4}>
            <Stack gap={2}>

              
              <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid ${light.border}`, borderRadius: 3, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <CardContent sx={{ p: '22px 24px !important' }}>
                  <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14, mb: 2 }}>Admin profile</Typography>
                  <Stack direction="row" gap={1.5} alignItems="center" mb={2}>
                    <Avatar sx={{ width: 46, height: 46, fontSize: 15, fontWeight: 700, bgcolor: '#f3e8ff', color: '#7c3aed' }}>
                      {user?.name?.slice(0,2).toUpperCase() || 'AD'}
                    </Avatar>
                    <Box>
                      <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 15 }}>{user?.name}</Typography>
                      <Typography sx={{ color: '#9ca3af', fontSize: 12 }}>{user?.email}</Typography>
                    </Box>
                  </Stack>
                  <Divider sx={{ borderColor: light.border, mb: 1.5 }} />
                  {[
                    { label: 'Role',         value: <RoleChip role="admin" /> },
                    { label: 'User ID',      value: '#USR-0001' },
                    { label: 'Access level', value: 'Full', color: '#f59e0b' },
                    { label: '2FA',          value: 'Enabled', color: '#16a34a' },
                  ].map(({ label, value, color }) => (
                    <Stack key={label} direction="row" justifyContent="space-between" alignItems="center" py={.8}
                      sx={{ borderBottom: `1px solid ${light.border}`, '&:last-child': { borderBottom: 0 } }}>
                      <Typography sx={{ color: '#6b7280', fontSize: 13 }}>{label}</Typography>
                      {typeof value === 'string'
                        ? <Typography sx={{ color: color || '#111827', fontSize: 13 }}>{value}</Typography>
                        : value}
                    </Stack>
                  ))}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;