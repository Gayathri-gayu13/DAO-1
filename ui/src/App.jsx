import { useState, useEffect } from "react";
import * as React from "react";
import { id, Interface, Contract, BrowserProvider } from "ethers";

import {
  CertAddr,
  MyGovernorAddr,
} from "./contract-data/deployedAddresses.json";
import { abi as Govabi } from "./contract-data/MyGovernor.json";
import { abi as Certabi } from "./contract-data/Cert.json";

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Dashboard from './components/Dashboard';
import NewProposalDialog from './components/NewProposalDialog';
import Certificates from './components/Certificates';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import VerifiedIcon from '@mui/icons-material/Verified';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function App() {
  const [loginState, setLoginState] = useState("Connect");
  const [account, setAccount] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [proposalDialogOpen, setProposalDialogOpen] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const provider = new BrowserProvider(window.ethereum);

  useEffect(() => {
    getEvents();
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleProposalSubmit = async (proposalData) => {
    const signer = await provider.getSigner();
    const Govinstance = new Contract(MyGovernorAddr, Govabi, signer);
    const Certinstance = new Contract(CertAddr, Certabi, signer);

    try {
      const transferCalldata = Certinstance.interface.encodeFunctionData(
        proposalData.functionName,
        JSON.parse(proposalData.parameters)
      );

      const proposeTx = await Govinstance.propose(
        [proposalData.contractAddress],
        [0],
        [transferCalldata],
        proposalData.description
      );
      
      await proposeTx.wait();
      getEvents();
      handleViewChange('proposals');
    } catch (error) {
      console.error("Error proposing transaction:", error);
    }
  };

  async function connectMetaMask() {
    try {
      const signer = await provider.getSigner();
      setAccount(signer.address);
      setLoginState("Connected");
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  }

  const getEvents = async () => {
    try {
      const signer = await provider.getSigner();
      const Govinstance = new Contract(MyGovernorAddr, Govabi, signer);
      const filter = Govinstance.filters.ProposalCreated();
      const events = await Govinstance.queryFilter(filter);
      setProposals(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleBoxClick = (action) => {
    switch (action) {
      case 'create':
        setProposalDialogOpen(true);
        break;
      case 'vote':
        handleViewChange('proposals');
        break;
      case 'certificates':
        handleViewChange('certificates');
        break;
    }
  };

  const navigationItems = [
    { text: 'Home', icon: <HomeIcon />, view: 'home' },
    { text: 'Proposals', icon: <HowToVoteIcon />, view: 'proposals' },
    { text: 'Certificates', icon: <VerifiedIcon />, view: 'certificates' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        minWidth: '100vw',
        bgcolor: '#000000',
        overflow: 'hidden'
      }}>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(255, 0, 0, 0.1)'
          }}
        >
          <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 2 }}>
              <DashboardIcon sx={{ color: '#ff0000', fontSize: 28 }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                DAO Governance
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              onClick={connectMetaMask}
              startIcon={<AccountBalanceWalletIcon />}
              sx={{ 
                bgcolor: loginState === "Connected" ? 'rgba(255, 0, 0, 0.1)' : '#ff0000',
                color: loginState === "Connected" ? '#ff0000' : '#ffffff',
                border: loginState === "Connected" ? '1px solid #ff0000' : 'none',
                '&:hover': { 
                  bgcolor: loginState === "Connected" ? 'rgba(255, 0, 0, 0.2)' : '#cc0000'
                }
              }}
            >
              {loginState}
            </Button>
          </Toolbar>
        </AppBar>

        {/* Navigation Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 280,
              bgcolor: '#111111',
              borderRight: '1px solid rgba(255, 0, 0, 0.2)'
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              Navigation
            </Typography>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255, 0, 0, 0.1)' }} />
          <List>
            {navigationItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => {
                  handleViewChange(item.view);
                  setDrawerOpen(false);
                }}
                sx={{
                  color: currentView === item.view ? '#ff0000' : '#ffffff',
                  '&:hover': {
                    bgcolor: 'rgba(255, 0, 0, 0.1)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          bgcolor: '#111111',
          mt: '64px', // Height of AppBar
          minHeight: 'calc(100vh - 64px)',
        }}>
          {currentView === 'home' && (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 2, sm: 4, md: 6 },
              minHeight: '100%'
            }}>
              <Typography 
                variant="h1" 
                align="center" 
                sx={{ 
                  mb: 2, 
                  fontSize: { xs: '2.5rem', sm: '3.5rem' },
                  color: '#ffffff',
                  fontWeight: 500,
                  maxWidth: '800px'
                }}
              >
                Welcome to DAO Governance
              </Typography>
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ 
                  mb: 6, 
                  maxWidth: '600px',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                Participate in decentralized decision-making and shape the future of our organization
              </Typography>

              <Grid container spacing={4} sx={{ maxWidth: '1400px', mx: 'auto' }}>
                <Grid item xs={12} md={4}>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      bgcolor: '#1a1a1a',
                      border: '1px solid rgba(255, 0, 0, 0.2)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: '#ff0000',
                        boxShadow: '0 4px 20px rgba(255, 0, 0, 0.15)'
                      }
                    }}
                    onClick={() => handleBoxClick('create')}
                  >
                    <DashboardIcon sx={{ fontSize: 48, color: '#ff0000', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                      Create Proposals
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Submit new proposals for the community to vote on
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      bgcolor: '#1a1a1a',
                      border: '1px solid rgba(255, 0, 0, 0.2)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: '#ff0000',
                        boxShadow: '0 4px 20px rgba(255, 0, 0, 0.15)'
                      }
                    }}
                    onClick={() => handleBoxClick('vote')}
                  >
                    <HowToVoteIcon sx={{ fontSize: 48, color: '#ff0000', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                      Vote with Tokens
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Use your tokens to vote on active proposals
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper 
                    sx={{ 
                      p: 4, 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      bgcolor: '#1a1a1a',
                      border: '1px solid rgba(255, 0, 0, 0.2)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: '#ff0000',
                        boxShadow: '0 4px 20px rgba(255, 0, 0, 0.15)'
                      }
                    }}
                    onClick={() => handleBoxClick('certificates')}
                  >
                    <VerifiedIcon sx={{ fontSize: 48, color: '#ff0000', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                      Manage Certificates
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      View and manage your DAO certificates
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {currentView === 'proposals' && (
            <Box sx={{ flex: 1, width: '100%' }}>
              <Dashboard 
                proposals={proposals} 
                provider={provider}
                account={account}
                onProposalAction={getEvents}
              />
            </Box>
          )}

          {currentView === 'certificates' && (
            <Box sx={{ flex: 1, width: '100%' }}>
              <Certificates 
                certificates={certificates}
                provider={provider}
                account={account}
              />
            </Box>
          )}
        </Box>

        <NewProposalDialog
          open={proposalDialogOpen}
          onClose={() => setProposalDialogOpen(false)}
          onSubmit={handleProposalSubmit}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;