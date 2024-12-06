import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Alert,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const NewProposalDialog = ({ open, onClose, onSubmit }) => {
  const [proposalData, setProposalData] = useState({
    functionName: '',
    contractAddress: '',
    description: '',
    parameters: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProposalData({
      ...proposalData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!proposalData.functionName) {
      newErrors.functionName = 'Function name is required';
    }
    if (!proposalData.contractAddress) {
      newErrors.contractAddress = 'Contract address is required';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(proposalData.contractAddress)) {
      newErrors.contractAddress = 'Invalid contract address format';
    }
    if (!proposalData.parameters) {
      newErrors.parameters = 'Parameters are required';
    } else {
      try {
        JSON.parse(proposalData.parameters);
      } catch (e) {
        newErrors.parameters = 'Invalid JSON format';
      }
    }
    if (!proposalData.description) {
      newErrors.description = 'Description is required';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSubmit(proposalData);
      onClose();
      // Reset form
      setProposalData({
        functionName: '',
        contractAddress: '',
        description: '',
        parameters: ''
      });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 0, 0, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 0, 0, 0.3)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff0000',
      },
      bgcolor: 'rgba(0, 0, 0, 0.2)',
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: '#ff0000',
      },
    },
    '& .MuiInputBase-input': {
      color: '#ffffff',
    },
    '& .MuiSelect-icon': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: '#111111',
          display: 'flex',
          flexDirection: 'column',
          m: 0,
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          color: '#ffffff', 
          borderBottom: '1px solid rgba(255, 0, 0, 0.2)', 
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4 },
          py: 2,
          bgcolor: '#0a0a0a'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DescriptionIcon sx={{ color: '#ff0000', fontSize: 28 }} />
          <Typography variant="h5" component="span" sx={{ fontWeight: 500 }}>
            Create New Proposal
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': { color: '#ff0000' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: { xs: 2, sm: 4 },
          bgcolor: '#111111',
        }}
      >
        <Box sx={{ 
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
        }}>
          <Grid container spacing={4}>
            {/* Left Column - Main Form */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ 
                p: { xs: 2, sm: 4 },
                bgcolor: '#1a1a1a',
                borderRadius: 2,
                border: '1px solid rgba(255, 0, 0, 0.2)',
                mb: 4
              }}>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CodeIcon sx={{ color: '#ff0000' }} />
                  Proposal Configuration
                </Typography>

                <FormControl fullWidth error={!!errors.functionName} sx={{ mb: 3 }}>
                  <InputLabel sx={{ color: errors.functionName ? '#ff0000' : 'inherit' }}>
                    Function to Execute
                  </InputLabel>
                  <Select
                    name="functionName"
                    value={proposalData.functionName}
                    onChange={handleChange}
                    sx={{
                      ...inputStyles,
                      color: '#ffffff',
                    }}
                  >
                    <MenuItem value="issue" sx={{ color: '#000000' }}>Issue Certificate</MenuItem>
                    <MenuItem value="mint" sx={{ color: '#000000' }}>Mint Tokens</MenuItem>
                    <MenuItem value="delegate" sx={{ color: '#000000' }}>Delegate Votes</MenuItem>
                  </Select>
                  {errors.functionName && (
                    <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                      {errors.functionName}
                    </Typography>
                  )}
                </FormControl>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#ffffff', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountBalanceWalletIcon sx={{ color: '#ff0000' }} />
                    Contract Details
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Contract Address"
                    name="contractAddress"
                    value={proposalData.contractAddress}
                    onChange={handleChange}
                    error={!!errors.contractAddress}
                    helperText={errors.contractAddress}
                    sx={{ ...inputStyles, mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Function Parameters (JSON format)"
                    name="parameters"
                    value={proposalData.parameters}
                    onChange={handleChange}
                    error={!!errors.parameters}
                    helperText={errors.parameters}
                    multiline
                    rows={4}
                    sx={inputStyles}
                    placeholder='e.g., ["0x123...", "100"]'
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Right Column - Description */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ 
                p: { xs: 2, sm: 4 },
                bgcolor: '#1a1a1a',
                borderRadius: 2,
                border: '1px solid rgba(255, 0, 0, 0.2)',
                position: 'sticky',
                top: 24,
              }}>
                <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                  Proposal Description
                </Typography>

                <TextField
                  fullWidth
                  label="Detailed Description"
                  name="description"
                  value={proposalData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  multiline
                  rows={12}
                  sx={inputStyles}
                  placeholder="Describe your proposal's purpose, implementation details, and expected impact on the DAO..."
                />

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                    Tips for a good proposal:
                  </Typography>
                  <ul style={{ color: 'rgba(255, 255, 255, 0.5)', paddingLeft: '20px' }}>
                    <li>Be clear about the intended outcome</li>
                    <li>Provide context and rationale</li>
                    <li>Consider potential impacts</li>
                    <li>Include relevant technical details</li>
                  </ul>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        p: { xs: 2, sm: 4 }, 
        borderTop: '1px solid rgba(255, 0, 0, 0.2)',
        bgcolor: '#0a0a0a',
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'stretch'
      }}>
        <Box sx={{ flex: 1 }}>
          <Alert severity="info" sx={{ 
            bgcolor: 'rgba(0, 0, 0, 0.2)', 
            color: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 0, 0, 0.2)',
            '& .MuiAlert-icon': { color: '#ff0000' }
          }}>
            All fields are required. Please ensure parameters are in valid JSON format.
          </Alert>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          minWidth: { sm: '300px' }
        }}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            fullWidth
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              borderColor: 'rgba(255, 0, 0, 0.5)',
              '&:hover': {
                color: '#ffffff',
                borderColor: '#ff0000',
                bgcolor: 'rgba(255, 0, 0, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            fullWidth
            sx={{ 
              bgcolor: '#ff0000',
              '&:hover': { 
                bgcolor: '#cc0000' 
              },
              '&:disabled': {
                bgcolor: 'rgba(255, 0, 0, 0.3)',
              }
            }}
          >
            Submit Proposal
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewProposalDialog;
