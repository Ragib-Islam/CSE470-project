import {
  Inventory as InventoryIcon,
  Computer as ComputerIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Logout as LogoutIcon,
  Brightness4,
  Brightness7,
  Dashboard as DashboardIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  useTheme,
  Fade,
  Zoom
} from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    availableItems: 0,
    inUseItems: 0,
    maintenanceItems: 0
  });
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const { darkMode, toggleDarkMode } = useCustomTheme();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/items', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const items = response.data;
      
      setStats({
        totalItems: items.length,
        availableItems: items.filter(item => item.status === 'Available').length,
        inUseItems: items.filter(item => item.status === 'Assigned').length,
        maintenanceItems: items.filter(item => item.status === 'Under Repair').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked'); // Debug log
    logout();
    navigate('/login');
  };

  const handleToggleDarkMode = () => {
    console.log('Dark mode toggle clicked'); // Debug log
    toggleDarkMode();
  };

  const handleNavigateToInventory = () => {
    console.log('Navigate to inventory clicked'); // Debug log
    navigate('/inventory');
  };

  const StatCard = ({ title, value, icon, color, delay }) => (
    <Zoom in={!loading} style={{ transitionDelay: `${delay}ms` }}>
      <Card 
        sx={{ 
          height: '100%',
          background: darkMode
            ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          borderRadius: 3,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: darkMode 
              ? '0 20px 40px rgba(0,0,0,0.3)'
              : '0 20px 40px rgba(0,0,0,0.1)',
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography 
                color="textSecondary" 
                gutterBottom 
                variant="h6"
                sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
              >
                {title}
              </Typography>
              <Typography 
                variant="h2" 
                component="h2"
                sx={{ 
                  fontWeight: 'bold',
                  background: `linear-gradient(45deg, ${color} 30%, ${color}CC 90%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}
              </Typography>
            </Box>
            <Box 
              sx={{ 
                color: color,
                backgroundColor: `${color}20`,
                borderRadius: '50%',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: darkMode 
          ? 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'auto',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundImage: darkMode 
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23ffffff' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23ffffff' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0,
          pointerEvents: 'none', // This is the key fix!
        }
      }}
    >
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: darkMode 
            ? 'rgba(26, 26, 26, 0.9)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: darkMode 
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.1)',
          zIndex: 10, // Increased z-index
          position: 'relative', // Added position relative
        }}
      >
        <Toolbar>
          <DashboardIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              color: theme.palette.text.primary
            }}
          >
            ICT Inventory Dashboard
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={handleToggleDarkMode}
            sx={{ 
              mr: 2, 
              color: theme.palette.text.primary,
              zIndex: 11, // Ensure button is clickable
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button 
            color="inherit" 
            onClick={handleNavigateToInventory}
            sx={{ 
              mr: 2,
              color: theme.palette.text.primary,
              fontWeight: 'bold',
              zIndex: 11, // Ensure button is clickable
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
              }
            }}
            startIcon={<StorageIcon />}
          >
            Manage Inventory
          </Button>
          <IconButton 
            color="inherit" 
            onClick={handleLogout}
            sx={{ 
              color: theme.palette.text.primary,
              zIndex: 11, // Ensure button is clickable
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 5 }}>
        <Fade in={!loading} timeout={1000}>
          <Box>
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: darkMode ? '#ffffff' : '#ffffff',
                textAlign: 'center',
                mb: 4,
                textShadow: darkMode 
                  ? '2px 2px 4px rgba(0,0,0,0.5)'
                  : '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Welcome to ICT Inventory System
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Items"
                  value={stats.totalItems}
                  icon={<InventoryIcon sx={{ fontSize: 40 }} />}
                  color={theme.palette.primary.main}
                  delay={100}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Available"
                  value={stats.availableItems}
                  icon={<ComputerIcon sx={{ fontSize: 40 }} />}
                  color={theme.palette.success.main}
                  delay={200}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="In Use"
                  value={stats.inUseItems}
                  icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
                  color={theme.palette.info.main}
                  delay={300}
                />
              </Grid>              
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Maintenance"
                  value={stats.maintenanceItems}
                  icon={<WarningIcon sx={{ fontSize: 40 }} />}
                  color={theme.palette.warning.main}
                  delay={400}
                />
              </Grid>
            </Grid>

            <Zoom in={!loading} style={{ transitionDelay: '500ms' }}>
              <Paper 
                sx={{ 
                  p: 4,
                  textAlign: 'center',
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(45, 45, 45, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 3,
                  boxShadow: darkMode 
                    ? '0 10px 30px rgba(0,0,0,0.3)'
                    : '0 10px 30px rgba(0,0,0,0.1)',
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    mb: 2
                  }}
                >
                  System Overview
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    mb: 3,
                    fontSize: '1.1rem'
                  }}
                >
                  Manage your ICT inventory efficiently with real-time tracking and comprehensive reporting.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleNavigateToInventory}
                  startIcon={<StorageIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(33, 150, 243, 0.3)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  Go to Inventory
                </Button>
              </Paper>
            </Zoom>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard;