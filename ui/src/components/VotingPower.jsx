import React from 'react';
import { Typography, Box, LinearProgress, Paper, Grid, Button } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';

const VotingPower = ({ power }) => {
  const votingHistory = [
    { proposal: 'Proposal #1', vote: 'For', power: 25 },
    { proposal: 'Proposal #2', vote: 'Against', power: 30 },
    { proposal: 'Proposal #3', vote: 'For', power: 20 }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
      bgcolor: '#111111',
      p: { xs: 2, md: 4 },
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{ 
        mb: 6,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 2
      }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>
            Voting Power
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Monitor and manage your DAO voting capabilities
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<HowToVoteIcon />}
          sx={{
            bgcolor: '#ff0000',
            '&:hover': { bgcolor: '#cc0000' },
            px: 3,
            py: 1
          }}
        >
          Delegate Votes
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Voting Power Overview */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ 
            p: 4, 
            bgcolor: '#1a1a1a',
            borderRadius: 2,
            border: '1px solid rgba(255, 0, 0, 0.2)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <TrendingUpIcon sx={{ color: '#ff0000', fontSize: 40 }} />
              <Box>
                <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 500 }}>
                  Current Voting Power
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Based on your token holdings and delegations
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  {power}%
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', ml: 2 }}>
                  of total voting power
                </Typography>
              </Box>
              
              <Box sx={{ width: '100%', mb: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={power} 
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: 'rgba(255, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 6,
                      bgcolor: '#ff0000',
                    },
                  }}
                />
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper sx={{ 
                  p: 2, 
                  bgcolor: '#111111',
                  borderRadius: 2,
                  border: '1px solid rgba(255, 0, 0, 0.1)'
                }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                    Total Votes Cast
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>
                    {power * 10}
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
                    Proposals Participated
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>
                    {Math.floor(power / 10)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Voting History & Stats */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3, 
                bgcolor: '#1a1a1a',
                borderRadius: 2,
                border: '1px solid rgba(255, 0, 0, 0.2)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <GroupIcon sx={{ color: '#ff0000', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 0.5 }}>
                      Delegation Status
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {power > 50 ? 'You are a top delegate' : 'Standard voting power'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3, 
                bgcolor: '#1a1a1a',
                borderRadius: 2,
                border: '1px solid rgba(255, 0, 0, 0.2)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <HistoryIcon sx={{ color: '#ff0000', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>
                    Recent Voting History
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {votingHistory.map((vote, index) => (
                    <Box key={index} sx={{ 
                      p: 2, 
                      bgcolor: '#111111',
                      borderRadius: 1,
                      border: '1px solid rgba(255, 0, 0, 0.1)'
                    }}>
                      <Typography variant="body2" sx={{ color: '#ffffff', mb: 0.5 }}>
                        {vote.proposal}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: vote.vote === 'For' ? '#00ff00' : '#ff0000',
                            fontWeight: 500
                          }}
                        >
                          {vote.vote}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          Power Used: {vote.power}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VotingPower;
