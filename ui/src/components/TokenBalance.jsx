import React from 'react';
import { Typography, Box, CircularProgress, Paper, Grid, Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const TokenBalance = ({ balance }) => {
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
            Token Balance
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Manage your DAO tokens and voting power
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<SwapHorizIcon />}
          sx={{
            bgcolor: '#ff0000',
            '&:hover': { bgcolor: '#cc0000' },
            px: 3,
            py: 1
          }}
        >
          Transfer Tokens
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Token Balance Card */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 4, 
            bgcolor: '#1a1a1a',
            borderRadius: 2,
            border: '1px solid rgba(255, 0, 0, 0.2)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AccountBalanceWalletIcon sx={{ fontSize: 48, color: '#ff0000', mb: 3 }} />
            
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
              <CircularProgress 
                variant="determinate" 
                value={100} 
                size={180}
                thickness={2}
                sx={{
                  color: '#ff0000',
                  opacity: 0.1
                }}
              />
              <CircularProgress 
                variant="determinate" 
                value={75} 
                size={180}
                thickness={2}
                sx={{
                  color: '#ff0000',
                  position: 'absolute',
                  left: 0,
                }}
              />
              <Box sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  {balance}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                  TOKENS
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
              Total tokens in your wallet
            </Typography>
          </Paper>
        </Grid>

        {/* Token Stats */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3, 
                bgcolor: '#1a1a1a',
                borderRadius: 2,
                border: '1px solid rgba(255, 0, 0, 0.2)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUpIcon sx={{ color: '#ff0000', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 0.5 }}>
                      Voting Power
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {balance} votes available
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
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                  Recent Activity
                </Typography>
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}>
                  {[
                    { type: 'Received', amount: '50', from: '0x1234...5678' },
                    { type: 'Sent', amount: '25', to: '0x8765...4321' }
                  ].map((activity, index) => (
                    <Box key={index} sx={{ 
                      p: 2, 
                      bgcolor: '#111111',
                      borderRadius: 1,
                      border: '1px solid rgba(255, 0, 0, 0.1)'
                    }}>
                      <Typography variant="body2" sx={{ color: '#ffffff' }}>
                        {activity.type} {activity.amount} tokens
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {activity.from ? `From: ${activity.from}` : `To: ${activity.to}`}
                      </Typography>
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

export default TokenBalance;
