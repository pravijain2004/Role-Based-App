import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  AppBar, Toolbar, Typography, Button, Box,
  Chip, Tooltip, Avatar, Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminIcon,
  ManageAccounts as ManagerIcon,
  Logout as LogoutIcon,
  FiberManualRecord as DotIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(30, 27, 60, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(167, 139, 250, 0.18)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>

        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 34, height: 34, borderRadius: 2,
              background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Avatar sx={{ width: 18, height: 18, bgcolor: 'transparent', fontSize: 10 }}>
              ⬡
            </Avatar>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: '#a78bfa', letterSpacing: '-0.3px', fontSize: '1.05rem' }}
          >
            JWT Auth App
          </Typography>
        </Box>

        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {user ? (
            <>
              
              <Chip
                icon={<DotIcon sx={{ fontSize: '10px !important', color: '#86efac !important' }} />}
                label={
                  <span>
                    Hello, {user.name}{' '}
                    <span style={{ color: 'rgba(134,239,172,0.6)', fontSize: '12px' }}>
                      ({user.role})
                    </span>
                  </span>
                }
                size="small"
                sx={{
                  mr: 1,
                  color: '#86efac',
                  bgcolor: 'rgba(134, 239, 172, 0.1)',
                  border: '1px solid rgba(134, 239, 172, 0.2)',
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1.2 },
                }}
              />

              <Tooltip title="Dashboard">
                <Button
                  component={Link}
                  to="/dashboard"
                  startIcon={<DashboardIcon sx={{ fontSize: '16px !important' }} />}
                  sx={navLinkStyle}
                >
                  Dashboard
                </Button>
              </Tooltip>

              {user.role === 'admin' && (
                <Tooltip title="Admin Panel">
                  <Button
                    component={Link}
                    to="/admin"
                    startIcon={<AdminIcon sx={{ fontSize: '16px !important' }} />}
                    sx={navLinkStyle}
                  >
                    Admin Panel
                  </Button>
                </Tooltip>
              )}

              {user.role === 'admin'|| 'manager' && (
                <Tooltip title="Manager Dashboard">
                  <Button
                    component={Link}
                    to="/manager"
                    startIcon={<ManagerIcon sx={{ fontSize: '16px !important' }} />}
                    sx={navLinkStyle}
                  >
                    Manager Dashboard
                  </Button>
                </Tooltip>
              )}

              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 1, borderColor: 'rgba(167,139,250,0.2)' }}
              />

              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon sx={{ fontSize: '16px !important' }} />}
                variant="contained"
                size="small"
                sx={{
                  bgcolor: '#ef4444',
                  color: '#fff',
                  fontWeight: 500,
                  borderRadius: 2,
                  px: 2,
                  textTransform: 'none',
                  fontSize: '14px',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#dc2626', boxShadow: 'none' },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
                sx={{
                  color: '#c4b5fd',
                  borderColor: 'rgba(167,139,250,0.3)',
                  borderRadius: 2,
                  px: 2.5,
                  textTransform: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    borderColor: '#a78bfa',
                    bgcolor: 'rgba(167,139,250,0.08)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                sx={{
                  bgcolor: '#7c3aed',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 2.5,
                  textTransform: 'none',
                  fontSize: '14px',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#6d28d9', boxShadow: 'none' },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
const navLinkStyle = {
  color: '#c4b5fd',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 400,
  borderRadius: 2,
  px: 1.5,
  border: '1px solid transparent',
  '&:hover': {
    bgcolor: 'rgba(167, 139, 250, 0.1)',
    borderColor: 'rgba(167, 139, 250, 0.2)',
  },
};

export default Navbar;