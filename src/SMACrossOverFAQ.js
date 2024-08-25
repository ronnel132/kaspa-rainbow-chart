import React from 'react';
import { Paper, Typography, Box, Grid, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import tangem_step1 from './assets/tangem-step1.png';
import tangem_step2 from './assets/tangem-step2.png';
import tangem_step3 from './assets/tangem-step3.png';

const SMACrossOverFAQ = ({ isMobile, handleTangemBuyNowClick, handleTangemAmazonBuyNowClick }) => {
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
        <strong>1) What is the Kaspa SMA Crossover Chart?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        The SMA Crossover Chart is based on the observation that whenever the 85 day Simple Moving Average (SMA) cross over the 66 day SMA, Kaspa price tends
        to surge up shortly after.
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>2) How was this discovered?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        The chart was discovered by 𝕏 user <a style={{ color: 'white' }} target="_blank" rel="noreferrer" href='https://x.com/xetur_xyz'>@xetur_xyz</a> (creator of this website).
      </Typography>
      <Typography
        variant="body2"
        component="p"
        style={{ marginTop: '10px', color: '#ccc' }}
      >
        The inspiration for this discovery was the <a style={{ color: 'white' }} target="_blank" rel="noreferrer" href="https://www.bitcoinmagazinepro.com/charts/pi-cycle-top-indicator/">Bitcoin Pi Cycle Top Indicator</a>,
        which uses a 350 day and 111 day Simple Moving Average crossover to accurately predict Bitcoin bull market cycle peaks. Given the power law similarities of Kaspa and Bitcoin, I
        hypothesized that similar moving average crossover patterns might exist. I began analyzing Kaspa's moving average windows with crossovers corresponding to parabolic price events. I then discovered the 85 and 66 day windows.
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>3) Why 66 and 85 day moving averages?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        It's difficult to know the exact reason why the 85 and 66 day SMAs correspond well to parabolic price events. These periods are long enough to filter out short-term noise but close enough together to react more
        quickly than longer-term averages like 50-day vs. 200-day crossovers. This intermediate sensitivity perhaps is more fitting for Kaspa, which experiences relatively frequent (every few months) price moves up.
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>4) How can I use this chart?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        This chart should be used to predict when Kaspa is nearing a parabolic price move. Although Kaspa is relatively early in its life, and past cannot always predict future, the SMA Crossover Chart
        displays emerging proper
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>5) How reliable is this?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
        Kaspa is still a relatively new project, so it's unclear if this pattern will always hold, but so far, it has correctly predicted all 5 of the last major price increases. The pattern may change
        over time, and I'll keep an eye on future crossover events to see how it develops.
      </Typography>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
        <strong>6) Where can I learn more about Kaspa?</strong>
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
        I prefer Tangem for its ease of use, cold storage (keep your Kaspa off exchanges!) and backup cards.
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
        { isMobile ? (
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

export default SMACrossOverFAQ;
