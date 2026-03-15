import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from '../utils/axiosConfig';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Avatar,
  Divider, LinearProgress, Stack, CircularProgress, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import {
  Groups as TeamIcon, FolderOpen as ProjectIcon,
  TaskAlt as TaskIcon, RateReview as ReviewIcon,
  ManageAccounts as ManagerBadgeIcon, Lock as LockIcon,
} from '@mui/icons-material';

const light = {
  bg: '#f5f6fa',
  card: '#ffffff',
  cardAlt: '#ffffff',
  border: '#e5e7eb',
  borderBlue: '#bfdbfe',
  borderAmber: '#fde68a',
  code: '#f8fafc',
  teal: '#e0f2fe',
  tealBorder: '#bae6fd',
};


const StatCard = ({ label, value, sub, subColor = '#6b7280', barColor, barPct, icon }) => (
  <Card elevation={0} sx={{ bgcolor: light.cardAlt, border: `1px solid ${light.border}`, borderRadius: 3, flex: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
    <CardContent sx={{ p: '16px 18px !important' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography sx={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .5 }}>
          {label}
        </Typography>
        <Box sx={{ color: barColor, opacity: .8 }}>{icon}</Box>
      </Stack>
      <Typography sx={{ fontSize: 26, fontWeight: 700, color: barColor, my: .4 }}>{value}</Typography>
      <Typography sx={{ fontSize: 11, color: subColor }}>{sub}</Typography>
      <LinearProgress variant="determinate" value={barPct}
        sx={{ mt: 1, height: 5, borderRadius: 3, bgcolor: '#f3f4f6',
          '& .MuiLinearProgress-bar': { bgcolor: barColor, borderRadius: 3 } }} />
    </CardContent>
  </Card>
);


const StatusChip = ({ status }) => {
  const map = {
    Online:  { bg: '#f0fdf4', color: '#16a34a' },
    Away:    { bg: '#fffbeb', color: '#d97706' },
    Offline: { bg: '#fff1f2', color: '#dc2626' },
  };
  const s = map[status] || map.Offline;
  return <Chip label={status} size="small" sx={{ bgcolor: s.bg, color: s.color, fontSize: 11, height: 22, fontWeight: 600 }} />;
};


const TaskChip = ({ label, bg, color }) => (
  <Chip label={label} size="small" sx={{ bgcolor: bg, color, fontSize: 11, height: 22, fontWeight: 600, borderRadius: 1.5 }} />
);


const ManagerDashboard = () => {
  const { user } = useAuth();
  const [serverMessage, setServerMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const teamMembers = [
    { name: 'Sara Rafi',  email: 'sara@corp.io',  role: 'Dev',    status: 'Online',  initials: 'SR', avatarBg: '#dcfce7', avatarColor: '#16a34a' },
    { name: 'Tom Mills',  email: 'tom@corp.io',   role: 'Design', status: 'Online',  initials: 'TM', avatarBg: '#dbeafe', avatarColor: '#2563eb' },
    { name: 'Nina Park',  email: 'nina@corp.io',  role: 'Dev',    status: 'Away',    initials: 'NP', avatarBg: '#fff1f2', avatarColor: '#dc2626' },
    { name: 'Raj Patel',  email: 'raj@corp.io',   role: 'QA',     status: 'Offline', initials: 'RP', avatarBg: '#f0fdf4', avatarColor: '#16a34a' },
  ];

  const projects = [
    { name: 'Auth Module',   pct: 92, color: '#22c55e' },
    { name: 'Dashboard UI',  pct: 67, color: '#0ea5e9' },
    { name: 'API Gateway',   pct: 45, color: '#f59e0b' },
    { name: 'Mobile App',    pct: 18, color: '#ef4444' },
  ];

  const tasks = [
    { dot: '#ef4444', title: 'Review PR #42 — Auth middleware refactor', meta: 'Assigned to Tom · Due yesterday',  chipLabel: 'Overdue',     chipBg: '#fff1f2', chipColor: '#dc2626' },
    { dot: '#f59e0b', title: 'Approve sprint plan for Q2',               meta: 'Due today · High priority',        chipLabel: 'Urgent',      chipBg: '#fffbeb', chipColor: '#d97706' },
    { dot: '#0ea5e9', title: '1-on-1 with Sara Rafi',                    meta: 'Tomorrow at 10:00 AM',             chipLabel: 'Scheduled',   chipBg: '#e0f2fe', chipColor: '#0284c7' },
    { dot: '#22c55e', title: 'Submit monthly performance report',         meta: 'Due Jan 31 · In progress',         chipLabel: 'In progress', chipBg: '#f0fdf4', chipColor: '#16a34a' },
  ];

  const roleBadgeMap = {
    Dev:    { bg: '#dbeafe', color: '#2563eb' },
    Design: { bg: '#f3e8ff', color: '#7c3aed' },
    QA:     { bg: '#dcfce7', color: '#16a34a' },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/manager');
        setServerMessage(data.message);
      } catch {
        setServerMessage('Access denied or server error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: light.bg, p: { xs: '24px 16px', sm: '32px 28px' } }}>

        
        <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
          <Box sx={{ bgcolor: '#0ea5e9', borderRadius: 2.5, width: 42, height: 42,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TeamIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ color: '#111827', fontWeight: 700, fontSize: 18 }}>Manager Dashboard</Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 12 }}>
              Welcome back, {user?.name} · Team overview &amp; project management
            </Typography>
          </Box>
          <Chip label="MANAGER" sx={{ ml: 'auto', bgcolor: '#e0f2fe', color: '#0284c7',
            border: `1px solid #bae6fd`, fontWeight: 700, fontSize: 11 }} />
        </Stack>

        
        <Stack direction="row" gap={1.8} flexWrap="wrap" mb={2.5}>
          <StatCard label="Team members"    value="12"  sub="+2 this month"    subColor="#16a34a" barColor="#0ea5e9" barPct={60} icon={<TeamIcon sx={{ fontSize: 18 }} />} />
          <StatCard label="Active projects" value="5"   sub="2 due this week"  barColor="#7c3aed" barPct={45} icon={<ProjectIcon sx={{ fontSize: 18 }} />} />
          <StatCard label="Tasks done"      value="84%" sub="↑ 6% vs last week" subColor="#16a34a" barColor="#22c55e" barPct={84} icon={<TaskIcon sx={{ fontSize: 18 }} />} />
          <StatCard label="Pending reviews" value="7"   sub="3 overdue"        subColor="#dc2626" barColor="#f59e0b" barPct={35} icon={<ReviewIcon sx={{ fontSize: 18 }} />} />
        </Stack>

        
        <Grid container spacing={2} mb={2.5}>

          
          <Grid item xs={12} md={7}>
            <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid ${light.border}`, borderRadius: 3, height: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <CardContent sx={{ p: '22px 24px !important' }}>
                <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14, mb: 2 }}>Team members</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {['Member', 'Role', 'Status'].map(h => (
                          <TableCell key={h} sx={{ color: '#9ca3af', fontSize: 11, textTransform: 'uppercase',
                            letterSpacing: .5, borderColor: light.border, py: 1 }}>{h}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teamMembers.map((m) => {
                        const rb = roleBadgeMap[m.role] || { bg: '#dbeafe', color: '#2563eb' };
                        return (
                          <TableRow key={m.email} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                            <TableCell sx={{ borderColor: light.border, py: 1.2 }}>
                              <Stack direction="row" alignItems="center" gap={1.2}>
                                <Avatar sx={{ width: 34, height: 34, fontSize: 12, fontWeight: 700,
                                  bgcolor: m.avatarBg, color: m.avatarColor }}>{m.initials}</Avatar>
                                <Box>
                                  <Typography sx={{ color: '#111827', fontSize: 13, fontWeight: 500 }}>{m.name}</Typography>
                                  <Typography sx={{ color: '#9ca3af', fontSize: 11 }}>{m.email}</Typography>
                                </Box>
                              </Stack>
                            </TableCell>
                            <TableCell sx={{ borderColor: light.border }}>
                              <Chip label={m.role} size="small"
                                sx={{ bgcolor: rb.bg, color: rb.color, fontSize: 11, height: 22, fontWeight: 600 }} />
                            </TableCell>
                            <TableCell sx={{ borderColor: light.border }}>
                              <StatusChip status={m.status} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack gap={2}>

              
              <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid ${light.border}`, borderRadius: 3, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <CardContent sx={{ p: '22px 24px !important' }}>
                  <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14, mb: 2 }}>Project progress</Typography>
                  <Stack gap={1.8}>
                    {projects.map((p) => (
                      <Box key={p.name}>
                        <Stack direction="row" justifyContent="space-between" mb={.6}>
                          <Typography sx={{ color: '#374151', fontSize: 13 }}>{p.name}</Typography>
                          <Typography sx={{ color: p.color, fontSize: 12, fontWeight: 600 }}>{p.pct}%</Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={p.pct}
                          sx={{ height: 5, borderRadius: 3, bgcolor: '#f3f4f6',
                            '& .MuiLinearProgress-bar': { bgcolor: p.color, borderRadius: 3 } }} />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              
              <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid ${light.border}`, borderRadius: 3, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <CardContent sx={{ p: '20px 22px !important' }}>
                  <Stack direction="row" alignItems="center" gap={1} mb={1.8}>
                    <ManagerBadgeIcon sx={{ color: '#0ea5e9', fontSize: 16 }} />
                    <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14 }}>Manager profile</Typography>
                  </Stack>
                  <Stack direction="row" gap={1.2} alignItems="center" mb={1.5} pb={1.5}
                    sx={{ borderBottom: `1px solid ${light.border}` }}>
                    <Avatar sx={{ width: 42, height: 42, fontSize: 14, fontWeight: 700,
                      bgcolor: '#e0f2fe', color: '#0284c7' }}>
                      {user?.name?.slice(0, 2).toUpperCase() || 'MG'}
                    </Avatar>
                    <Box>
                      <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14 }}>{user?.name}</Typography>
                      <Typography sx={{ color: '#9ca3af', fontSize: 12 }}>{user?.email}</Typography>
                    </Box>
                  </Stack>
                  {[
                    { label: 'Department', value: 'Engineering' },
                    { label: 'Reports to', value: 'CTO' },
                    { label: 'Access',     value: 'Team + Projects', color: '#0284c7' },
                  ].map(({ label, value, color }) => (
                    <Stack key={label} direction="row" justifyContent="space-between" py={.7}
                      sx={{ borderBottom: `1px solid ${light.border}`, '&:last-child': { borderBottom: 0 } }}>
                      <Typography sx={{ color: '#6b7280', fontSize: 13 }}>{label}</Typography>
                      <Typography sx={{ color: color || '#111827', fontSize: 13 }}>{value}</Typography>
                    </Stack>
                  ))}
                </CardContent>
              </Card>

            </Stack>
          </Grid>
        </Grid>

        
        <Card elevation={0} sx={{ bgcolor: light.card, border: `1px solid ${light.border}`, borderRadius: 3, mb: 2.5, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <CardContent sx={{ p: '22px 24px !important' }}>
            <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: 14, mb: 1.5 }}>Pending tasks</Typography>
            <Stack>
              {tasks.map((t, i) => (
                <Stack key={i} direction="row" alignItems="flex-start" gap={1.5} py={1.2}
                  sx={{ borderBottom: `1px solid ${light.border}`, '&:last-child': { borderBottom: 0 } }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: t.dot, mt: .6, flexShrink: 0 }} />
                  <Box flex={1}>
                    <Typography sx={{ color: '#111827', fontSize: 13, fontWeight: 500 }}>{t.title}</Typography>
                    <Typography sx={{ color: '#9ca3af', fontSize: 11 }}>{t.meta}</Typography>
                  </Box>
                  <TaskChip label={t.chipLabel} bg={t.chipBg} color={t.chipColor} />
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

      </Box>
    </>
  );
};

export default ManagerDashboard;