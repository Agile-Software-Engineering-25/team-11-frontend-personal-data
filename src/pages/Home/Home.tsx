import { Box, Typography, Button } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography level="h1">Hello World!</Typography>
      <Button onClick={() => navigate('/personal-data')}>
        {t('pages.home.personalDataButton')}
      </Button>
    </Box>
  );
};

export default Home;
