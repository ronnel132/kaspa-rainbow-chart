import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Grid, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LOG_ACTION } from './constants/urls';
import PriceChart from './Chart';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  TelegramShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
  RedditIcon,
  TelegramIcon,
} from 'react-share';
import FollowMeOnX from './FollowMeOnX';
import tangem_step1 from './assets/tangem-step1.png';
import tangem_step2 from './assets/tangem-step2.png';
import tangem_step3 from './assets/tangem-step3.png';

function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|tablet|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

function logAction(clickType) {
  const deviceType = getDeviceType();
  const params = new URLSearchParams({
    click_type: clickType,
    device_type: deviceType,
    timestamp: new Date().toISOString()
  }).toString();

  fetch(`${LOG_ACTION}?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Log success:', data);
  })
  .catch((error) => {
    console.error('Log error:', error);
  });
}

function HomePage() {
  document.title = "Kaspa Rainbow Chart";

  const [priceData, setPriceData] = useState({});

  useEffect(() => {
    fetch('/prices.json')
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((item) => {
          return {
            date: item.date,
            price: parseFloat(parseFloat(item.price.replace('$', '')).toFixed(7)),
          };
        });
        setPriceData(transformedData);
      })
      .catch((error) => console.error('Error fetching the prices data:', error));
  }, []);

  const isMobileDeviceWithTouch = () => {
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    return hasTouchScreen && isMobile;
  };

  const shareUrl = "https://kasparainbowchart.com";
  const shareTitle = "Check out the Kaspa Rainbow Chart!";

  const handleTangemBuyNowClick = () => {
    logAction('rc_get_a_tangem');
  };

  const handleTangemAmazonBuyNowClick = () => {
    logAction('rc_amazon_get_a_tangem');
  }

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: '#292828',
        padding: '20px',
        borderRadius: '10px',
        color: '#fff',
        marginTop: '20px',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        style={{ color: '#fff', fontWeight: 'bolder' }}
      >
        Kaspa Rainbow Chart
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        align="center"
        style={{ color: '#ccc', marginBottom: '15px' }}
      >
        Price according to the power law
      </Typography>
      <PriceChart priceData={priceData} isMobile={isMobileDeviceWithTouch()}/>
      <Typography
        component="h4"
        gutterBottom
        align="center"
        style={{ color: '#ccc', marginBottom: '15px' }}
      >
        { isMobileDeviceWithTouch() ?
          'Pinch to zoom. Double click to reset.' :
          'Click and drag a region to zoom in. Double click to reset.'
        }
      </Typography>
      <Typography
        component="h4"
        gutterBottom
        align="center"
        style={{ color: '#ccc', marginTop: '35px', marginBottom: '15px', fontWeight: 'bolder' }}
      >
        Share this website:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <XIcon size={32} round />
            </TwitterShareButton>
          </Grid>
          <Grid item>
            <FacebookShareButton url={shareUrl} quote={shareTitle}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </Grid>
          <Grid item>
            <LinkedinShareButton url={shareUrl} title={shareTitle}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Grid>
          <Grid item>
            <WhatsappShareButton url={shareUrl} title={shareTitle}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </Grid>
          <Grid item>
            <RedditShareButton url={shareUrl} title={shareTitle}>
              <RedditIcon size={32} round />
            </RedditShareButton>
          </Grid>
          <Grid item>
            <TelegramShareButton url={shareUrl} title={shareTitle}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </Grid>
        </Grid>
      </Box>
      <Typography
        component="h4"
        gutterBottom
        align="center"
        style={{ color: '#ccc', marginTop: '35px', marginBottom: '15px' }}
      >
        Also check out <a style={{ color: "white" }} href="https://kaspapowerlaw.com">KaspaPowerLaw.com</a> for the Kaspa Fair Price Calculator.
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom="20px"
      >
      </Box>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        align="center"
        style={{ marginTop: '20px', color: 'white', fontWeight: 'bolder' }}
      >
        FAQ
      </Typography>
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
          {isMobileDeviceWithTouch() ? (
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
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20, textAlign: 'center' }}>
        <strong>Follow me on 𝕏</strong>
      </Typography>
      <FollowMeOnX/>
      <Typography variant="body1" component="p" style={{ color: 'grey', marginTop: 20, textAlign: 'center' }}>
        <a style={{ color: 'white' }} href="/terms">Terms of Service</a>
      </Typography>
    </Container>
  );
}

export default HomePage;
