import React from 'react';
import { Paper, Typography, Box, Grid, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import tangem_step1 from './assets/tangem-step1.png';
import tangem_step2 from './assets/tangem-step2.png';
import tangem_step3 from './assets/tangem-step3.png';

const PowerLawFAQ = ({ isMobile, handleTangemBuyNowClick, handleTangemAmazonBuyNowClick }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        backgroundColor: '#444',
        borderRadius: '15px',
      }}
    >
      <Typography variant="body1" component="p" style={{ color: '#fff' }}>
        <strong>1) What is Kaspa's Power Law?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        The Kaspa power law is a mathematical relationship between Kaspa's price and time, that allows us to forecast Kaspa's potential future price action based on historical data.
        The power law is demonstrated by plotting Kaspa's price vs time in a log-log chart, where it appears as a straight line.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        The only other asset which behaves this way is Bitcoin.
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>2) How accurate is it?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        The R² of the linear regression in log-log is <b>0.95</b>. Meaning the power law accounts for 95% of the variance in log-prices. For comparison, the R² of Bitcoin is 0.96.
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>3) How is this calculated?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        Support price is calculated as 10^-13.41344198 * (ΔGB)^4.218461.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        Resistance price is calculated as 10^-13.10611888 * (ΔGB)^4.218461.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        Fair price is calculated as 10^-13.25978043 * (ΔGB)^4.218461.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        Where <b>ΔGB</b> is days since the Kaspa Genesis Block, the 7th of November, 2021.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc', fontStyle: 'italic' }}
      >
        [Power Law Equations Updated 2024-07-22]
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>4) Where can I learn more about Kaspa?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        Visit the Kaspa project's website: <a style={{ color: 'white' }} href="https://kaspa.org/">https://kaspa.org</a>.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        Check out streamlit's Kaspa rainbow chart: <a style={{ color: 'white' }} href="https://kasping.streamlit.app/">https://kasping.streamlit.app/</a>.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        Marvel at the growth of Kaspa's hash rate: <a style={{ color: 'white' }} href="https://2miners.com/kas-network-hashrate">https://2miners.com/kas-network-hashrate</a>.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        See Kaspa block-DAG processed in real time: <a style={{ color: 'white' }} href="https://kgi.kaspad.net/">https://kgi.kaspad.net/</a>.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        Check out the Kaspa Industrial Initiative: <a style={{ color: 'white' }} href="https://kaspa-kii.org/">https://kaspa-kii.org/</a>.
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>5) How can I buy Kaspa?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        I use the Tangem wallet (<a style={{ color: 'white' }} href="https://tangem.com/en/?promocode=KE8DCR">https://tangem.com</a>) to exchange BTC to KAS through the integrated swap.
        I prefer Tangem for its ease of use, cold storage (keep your Kaspa off exchanges!) and backup cards. The affiliate links below give me a small percentage which I use to support
        this website. If you like my work, and need a cold storage solution, consider getting a Tangem wallet through the links below.
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc', marginTop: '30px' }}>
        <b style={{ color: '#d64242' }}>Step 1)</b> Transfer Bitcoin to your Tangem wallet address.
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        <b style={{ color: '#d64242' }}>Step 2)</b> Click "Swap" and select the amount to transfer. Changelly and Changenow exchanges will work fine.
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        <b style={{ color: '#d64242' }}>Step 3)</b> Wait for the transfer, usually 30 minutes. Don't panic if you don't see it right away, it will go through.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Button
          href="https://tangem.com/en/?promocode=KE8DCR"
          target="_blank"
          variant="contained"
          sx={{
            backgroundColor: '#d64242',
            color: '#fff',
            '&:hover': { backgroundColor: '#bf3a3a' },
            textTransform: 'none',
          }}
          onClick={handleTangemBuyNowClick}
        >
          Get a Tangem Wallet (10% off)
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 8 }}>
          <strong>Or</strong>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
        <Button
          href="https://amzn.to/3WvjmiY"
          target="_blank"
          variant="contained"
          sx={{
            backgroundColor: '#d64242',
            color: '#fff',
            '&:hover': { backgroundColor: '#bf3a3a' },
            textTransform: 'none',
          }}
          onClick={handleTangemAmazonBuyNowClick}
        >
          Buy on Amazon
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 2 }}>
        {isMobile ? (
          <>
            <Typography variant="body2" align="center" style={{ color: '#d64242', marginBottom: '10px' }}>
              Swipe left or right to view more images
            </Typography>
            <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows>
              <div><img src={tangem_step1} alt="Kaspa Screenshot 1" style={{ width: '100%', height: 'auto' }} /></div>
              <div><img src={tangem_step2} alt="Kaspa Screenshot 2" style={{ width: '100%', height: 'auto' }} /></div>
              <div><img src={tangem_step3} alt="Kaspa Screenshot 3" style={{ width: '100%', height: 'auto' }} /></div>
            </Carousel>
          </>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img src={tangem_step1} alt="Kaspa Screenshot 1" style={{ width: '100%', height: 'auto' }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img src={tangem_step2} alt="Kaspa Screenshot 2" style={{ width: '100%', height: 'auto' }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img src={tangem_step3} alt="Kaspa Screenshot 3" style={{ width: '100%', height: 'auto' }} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default PowerLawFAQ;
