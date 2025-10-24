import { Box, Typography, Sheet } from '@mui/joy';
import LanguageSelectorComponent from '@components/LanguageSelectorComponent/LanguageSelectorComponent.tsx';
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
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 15,
          bgcolor: 'background.level3',
          padding: 1.5,
        }}
      >
        <Box sx={{ width: 500, flexShrink: 0, minWidth: 0 }}>
          <Typography
            level="h1"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {t('pages.personalData.title')}
          </Typography>
        </Box>
        <Box sx={{ minHeight: 68, width: 175, flexShrink: 0 }}>
          <LanguageSelectorComponent />
        </Box>
      </Box>
      <br />
      <PersonalDataComponent />
    </Sheet>
  );
};

export default PersonalData;
