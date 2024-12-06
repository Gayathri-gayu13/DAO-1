import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  IconButton,
} from '@mui/material';
import TokenBalance from './TokenBalance';
import VotingPower from './VotingPower';
import { Contract } from 'ethers';
import {
  MyGovernorAddr,
  CertAddr,
} from "../contract-data/deployedAddresses.json";
import { abi as Govabi } from "../contract-data/MyGovernor.json";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RefreshIcon from '@mui/icons-material/Refresh';

const Dashboard = ({ proposals = [] }) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(100); // Mock balance
  const [votingPower, setVotingPower] = useState(75); // Mock voting power

  const handleVote = async (proposalId, support) => {
    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const Govinstance = new Contract(MyGovernorAddr, Govabi, signer);
      
      const voteTx = await Govinstance.castVote(proposalId, support);
      await voteTx.wait();
      
      // Refresh data after voting
      // Add your refresh logic here
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      bgcolor: '#111111',
      p: { xs: 2, md: 4 },
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DashboardIcon sx={{ color: '#ff0000', fontSize: 32 }} />
          <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 500 }}>
            DAO Dashboard
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { color: '#ff0000' }
            }}
            onClick={() => {/* Add refresh logic */}}
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Stats Section */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TokenBalance balance={balance} />
            </Grid>
            <Grid item xs={12} md={6}>
              <VotingPower power={votingPower} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: '#1a1a1a',
            borderRadius: 2,
            border: '1px solid rgba(255, 0, 0, 0.2)',
            height: '100%',
            minHeight: '200px'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <TrendingUpIcon sx={{ color: '#ff0000' }} />
              <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 500 }}>
                Governance Stats
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ 
                  p: 2, 
                  bgcolor: '#111111',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 0, 0, 0.1)'
                }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Total Proposals
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#ffffff' }}>
                    {proposals.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ 
                  p: 2, 
                  bgcolor: '#111111',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 0, 0, 0.1)'
                }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Active
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#ffffff' }}>
                    {proposals.filter(p => p.active).length}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Proposals List */}
        <Grid item xs={12}>
          <Paper sx={{ 
            bgcolor: '#1a1a1a',
            borderRadius: 2,
            border: '1px solid rgba(255, 0, 0, 0.2)',
          }}>
            <Box sx={{ 
              p: 3, 
              borderBottom: '1px solid rgba(255, 0, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <HowToVoteIcon sx={{ color: '#ff0000' }} />
              <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 500 }}>
                Active Proposals
              </Typography>
            </Box>

            <List>
              {proposals.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="No proposals found"
                    primaryTypographyProps={{ 
                      sx: { color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }
                    }}
                  />
                </ListItem>
              ) : (
                proposals.map((proposal, index) => (
                  <React.Fragment key={proposal.args ? proposal.args[0].toString() : index}>
                    <ListItem
                      sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        py: 3,
                        px: 3,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2, sm: 0 }, width: '100%' }}>
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'rgba(255, 0, 0, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ff0000',
                          border: '1px solid rgba(255, 0, 0, 0.2)',
                        }}>
                          #{index + 1}
                        </Box>
                        <ListItemText
                          primary={
                            <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
                              Proposal #{index + 1}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {proposal.args ? proposal.args[8] : proposal[1]}
                            </Typography>
                          }
                          sx={{ flex: 1 }}
                        />
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 2,
                        width: { xs: '100%', sm: 'auto' }
                      }}>
                        <Button
                          variant="contained"
                          onClick={() => handleVote(proposal.args ? proposal.args[0].toString() : proposal[0], 1)}
                          disabled={loading}
                          sx={{
                            bgcolor: '#ff0000',
                            '&:hover': { bgcolor: '#cc0000' },
                            flex: { xs: 1, sm: 'none' },
                            px: 4
                          }}
                        >
                          For
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleVote(proposal.args ? proposal.args[0].toString() : proposal[0], 0)}
                          disabled={loading}
                          sx={{
                            borderColor: '#ff0000',
                            color: '#ff0000',
                            '&:hover': { 
                              borderColor: '#cc0000',
                              color: '#cc0000',
                              bgcolor: 'rgba(255, 0, 0, 0.1)'
                            },
                            flex: { xs: 1, sm: 'none' },
                            px: 4
                          }}
                        >
                          Against
                        </Button>
                      </Box>
                    </ListItem>
                    {index < proposals.length - 1 && (
                      <Divider sx={{ borderColor: 'rgba(255, 0, 0, 0.1)' }} />
                    )}
                  </React.Fragment>
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
