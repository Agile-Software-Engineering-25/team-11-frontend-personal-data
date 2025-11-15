import { Box, Typography, Sheet } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import countries from 'i18n-iso-countries';
import deLocale from 'i18n-iso-countries/langs/de.json';
countries.registerLocale(deLocale);
import enLocale from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(enLocale);
import PersonalDataComponent from '@components/PersonalData/PersonalDataComponent.tsx';

const PersonalData = () => {
  const { t } = useTranslation();

  return (
    <Sheet sx={{ padding: 2, maxWidth: 900, mx: 'auto', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', bgcolor: 'background.level3', py: 1, px: 2, borderRadius: 15 }}>
          <Typography level="h2" sx={{ textAlign: 'center', width: '100%' }}>
            {t('pages.personalData.title')}
          </Typography>
        </Box>
      </Box>
      <br />
      <PersonalDataComponent />
    </Sheet>
  );
};

export default PersonalData;
