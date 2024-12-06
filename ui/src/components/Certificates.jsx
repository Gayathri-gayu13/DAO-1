import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Paper
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

const Certificate = ({ certificate }) => (
  <Card sx={{
    bgcolor: '#111111',
    borderRadius: 2,
    border: '1px solid rgba(255, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'visible'
  }}>
    <Box
      sx={{
        position: 'absolute',
        top: -20,
        right: -20,
        bgcolor: '#ff0000',
        borderRadius: '50%',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }}
    >
      <VerifiedIcon sx={{ color: '#ffffff' }} />
    </Box>
    <CardContent>
      <Typography variant="h6" sx={{ color: '#ffffff', mb: 2, fontWeight: 500 }}>
        Certificate #{certificate.id}
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
        Issued to: {certificate.recipient}
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
        Type: {certificate.type}
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
        Issue Date: {certificate.date}
      </Typography>
      <Chip 
        label={certificate.status || 'Valid'} 
        sx={{ 
          bgcolor: '#ff0000',
          color: '#ffffff',
          borderRadius: '8px',
          '&:hover': {
            bgcolor: '#cc0000'
          }
        }}
      />
    </CardContent>
  </Card>
);

const Certificates = ({ certificates = [] }) => (
  <Box>
    <Paper 
      sx={{
        p: 3,
        bgcolor: '#111111',
        borderRadius: 2,
        border: '1px solid rgba(255, 0, 0, 0.2)',
      }}
    >
      <Typography variant="h5" sx={{ color: '#ffffff', mb: 3, fontWeight: 500 }}>
        Issued Certificates
      </Typography>
      <Grid container spacing={4}>
        {certificates.map((cert, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Certificate certificate={cert} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Box>
);

export default Certificates;
