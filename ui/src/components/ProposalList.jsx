import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Box
} from '@mui/material';

const ProposalList = ({ proposals = [] }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'primary',
      pending: 'warning',
      succeeded: 'success',
      failed: 'error',
      queued: 'info',
      executed: 'secondary'
    };
    return colors[status] || 'default';
  };

  return (
    <Grid container spacing={3}>
      {proposals.map((proposal, index) => (
        <Grid item xs={12} md={6} key={proposal.id || index}>
          <Card sx={{
            background: 'linear-gradient(45deg, #111111 30%, #222222 90%)',
            boxShadow: '0 3px 5px 2px rgba(0, 162, 255, .3)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#00a2ff' }}>
                  {proposal.title || `Proposal #${index + 1}`}
                </Typography>
                <Chip 
                  label={proposal.status || 'Active'} 
                  color={getStatusColor(proposal.status)}
                  sx={{ borderRadius: '16px' }}
                />
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2, color: '#ffffff' }}>
                {proposal.description || 'No description provided'}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#00a2ff' }}>
                    Votes For: {proposal.votesFor || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ ml: 2, color: '#00a2ff' }}>
                    Votes Against: {proposal.votesAgainst || 0}
                  </Typography>
                </Box>
                <Box>
                  <Button size="small" sx={{ mr: 1 }}>
                    Vote
                  </Button>
                  {proposal.status === 'queued' && (
                    <Button size="small">
                      Execute
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProposalList;
