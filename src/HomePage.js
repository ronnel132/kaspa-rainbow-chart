import React, { useRef, useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LOG_ACTION, GET_KAS_PRICE, GET_POWER_LAW } from './constants/urls';
import PriceChart from './Chart';
import SMAChart from './CrossoverChart';
import SMACrossOverFAQ from './SMACrossOverFAQ';
import PowerLawFAQ from './PowerLawFAQ';
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

function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|tablet|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
}

function logAction(eventType) {
  const deviceType = getDeviceType();
  const params = new URLSearchParams({
    click_type: eventType,
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

function getChartParam() {
  const params = new URLSearchParams(window.location.search);
  const chartParam = params.get('chart');

  if (chartParam === 'sma') {
    return 'sma';
  } else {
    return 'powerLaw';
  }
}

function HomePage() {
  document.title = "Kaspa Rainbow Chart";

  const hasLoggedVisit = useRef(false);
  const [priceData, setPriceData] = useState({});
  const [selectedChart, setSelectedChart] = useState(getChartParam()); // State for toggling charts
  const [kasPrice, setKasPrice] = useState(null);
  const [powerLawData, setPowerLawData] = useState(null);

  useEffect(() => {
    if (!hasLoggedVisit.current) {
      logAction('site_visit_rainbow_chart');
      hasLoggedVisit.current = true;
    }
  }, []);

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

    // Fetch KAS price
    fetch(GET_KAS_PRICE)
      .then(response => response.json())
      .then(data => {
        setKasPrice(data.price);
      })
      .catch(error => console.error('Error fetching KAS price:', error));

    // Fetch Power Law data
    fetch(GET_POWER_LAW)
      .then(response => response.json())
      .then(data => {
        setPowerLawData(data);
      })
      .catch(error => console.error('Error fetching Power Law data:', error));
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
        { selectedChart === "powerLaw" ? 'Kaspa Rainbow Chart' : 'Kaspa SMA Crossover Chart' }
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button
          variant={selectedChart === 'powerLaw' ? 'contained' : 'outlined'}
          sx={{
            marginRight: 2,
            color: selectedChart === 'powerLaw' ? '#fff' : '#d64242',
            backgroundColor: selectedChart === 'powerLaw' ? '#d64242' : 'transparent',
            borderColor: '#d64242',
            '&:hover': {
              backgroundColor: selectedChart === 'powerLaw' ? '#d64242' : 'rgba(214, 66, 66, 0.04)',
              borderColor: '#d64242',
            },
          }}
          onClick={() => setSelectedChart('powerLaw')}
        >
          Power Law Chart
        </Button>
        <Button
          variant={selectedChart === 'sma' ? 'contained' : 'outlined'}
          sx={{
            color: selectedChart === 'sma' ? '#fff' : '#d64242',
            backgroundColor: selectedChart === 'sma' ? '#d64242' : 'transparent',
            borderColor: '#d64242',
            '&:hover': {
              backgroundColor: selectedChart === 'sma' ? '#d64242' : 'rgba(214, 66, 66, 0.04)',
              borderColor: '#d64242',
            },
          }}
          onClick={() => setSelectedChart('sma')}
        >
          SMA Chart
        </Button>
      </Box>
      {selectedChart === 'powerLaw' ? (
        <>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            align="center"
            style={{ color: '#ccc', marginBottom: '15px' }}
          >
            Price according to the power law
          </Typography>
          <PriceChart priceData={priceData} kasPrice={kasPrice} powerLawData={powerLawData} isMobile={isMobileDeviceWithTouch()} />
        </>
      ) : (
        <>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            align="center"
            style={{ color: '#ccc', marginBottom: '15px' }}
          >
            Crossover of the 85 and 66 day simple moving average.
          </Typography>
          <SMAChart priceData={priceData} isMobile={isMobileDeviceWithTouch()} />
        </>
      )}
      <Typography
        component="h4"
        gutterBottom
        align="center"
        style={{ color: '#ccc', marginBottom: '15px' }}
      >
        {isMobileDeviceWithTouch()
          ? 'Pinch to zoom. Double click to reset.'
          : 'Click and drag a region to zoom in. Double click to reset.'}
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
      {selectedChart === 'powerLaw' ? (
        <PowerLawFAQ
          isMobile ={isMobileDeviceWithTouch()}
          handleTangemBuyNowClick={handleTangemBuyNowClick}
          handleTangemAmazonBuyNowClick={handleTangemAmazonBuyNowClick}
        />
      ) : (
        <SMACrossOverFAQ
          isMobile ={isMobileDeviceWithTouch()}
          handleTangemBuyNowClick={handleTangemBuyNowClick}
          handleTangemAmazonBuyNowClick={handleTangemAmazonBuyNowClick}
        />
      )}
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20, textAlign: 'center' }}>
        <strong>Follow me on 𝕏</strong>
      </Typography>
      <FollowMeOnX />
      <Typography variant="body1" component="p" style={{ color: 'grey', marginTop: 20, textAlign: 'center' }}>
        <a style={{ color: 'white' }} href="/terms">Terms of Service</a>
      </Typography>
    </Container>
  );
}

export default HomePage;
