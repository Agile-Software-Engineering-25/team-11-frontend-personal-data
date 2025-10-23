import {
  Autocomplete,
  Box,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
} from '@mui/joy';
import PersonalDataStudent from '@components/PersonalData/PersonalDataStudentComponent.tsx';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import countries from 'i18n-iso-countries';
import deLocale from 'i18n-iso-countries/langs/de.json';
countries.registerLocale(deLocale);
import enLocale from 'i18n-iso-countries/langs/en.json';
import PersonalDataLecturersComponent from '@components/PersonalData/PersonalDataLecturersComponent.tsx';
import PersonalDataEmployeeComponent from '@components/PersonalData/PersonalDataEmployee.tsx';
countries.registerLocale(enLocale);
const PersonalDataComponent = () => {
  const { t, i18n } = useTranslation();
  const countryOptions = useMemo(() => {
    return Object.values(
      countries.getNames(i18n.language === 'de' ? 'de' : 'en')
    );
  }, [i18n.language]);
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* Editierbares Feld */}
        <FormControl sx={{ width: 155, mb: 2 }}>
          <FormLabel>{t('pages.personalData.acardemicTitle')}</FormLabel>
          <Autocomplete
            placeholder="Titel*"
            options={['Prof.', 'Dr.', 'Prof. Dr.']}
            disableClearable
            slotProps={{
              input: { readOnly: true },
            }}
            sx={{ height: 45 }}
            readOnly
          />
        </FormControl>
        <FormControl sx={{ width: 155, mb: 2 }}>
          <FormLabel>{t('pages.personalData.salutation')}</FormLabel>
          <Autocomplete
            placeholder="Anrede*"
            options={['Herr', 'Frau', 'Divers']}
            disableClearable
            slotProps={{
              input: { readOnly: true },
            }}
            sx={{ height: 45 }}
            value="Herr"
            readOnly
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.firstName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Max"
            readOnly
            value="Max"
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.lastName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Mustermann"
            value="Mustermann"
            readOnly
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 325, mb: 2 }}>
          <FormLabel>{t('pages.personalData.nationality')}</FormLabel>
          <Autocomplete
            placeholder="Titel*"
            options={countryOptions}
            value={
              countries.getNames(i18n.language === 'de' ? 'de' : 'en')['DE']
            }
            disableClearable
            readOnly
            sx={{ height: 45 }}
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.birthday')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            type="date"
            readOnly
            value="0001-06-01"
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.telephone')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="+49 123 4567890"
            type="tel"
            readOnly
            value="+49 123 4567890"
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 325, mb: 2 }}>
          <FormLabel>{t('pages.personalData.email')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="max.mustermann@mustermail.de"
            value="max.mustermann@mustermail.de"
            type="email"
            readOnly
          />
        </FormControl>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 325, mb: 2 }}>
          <FormLabel>{t('pages.personalData.street')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Musterstraße"
            readOnly
            value="Musterstraße"
          />
        </FormControl>
        <FormControl sx={{ width: 127, mb: 2 }}>
          <FormLabel>{t('pages.personalData.houseNumber')}</FormLabel>
          <Input
            type="number"
            color="neutral"
            size="lg"
            placeholder="42"
            readOnly
            value="42"
          />
        </FormControl>
        <FormControl sx={{ width: 127, mb: 2 }}>
          <FormLabel>{t('pages.personalData.postalCode')}</FormLabel>
          <Input
            type="number"
            color="neutral"
            size="lg"
            placeholder="Entenhausen"
            readOnly
            value="12345"
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.city')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Entenhausen"
            readOnly
            value="Entenhausen"
          />
        </FormControl>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <PersonalDataEmployeeComponent></PersonalDataEmployeeComponent>
      <Box sx={{ mt: 3 }}>
        <PersonalDataStudent></PersonalDataStudent>
      </Box>
      <Box sx={{ mt: 3 }}>
        <PersonalDataLecturersComponent></PersonalDataLecturersComponent>
      </Box>
      <FormControl sx={{ width: 272, mt: 3 }}>
        <ButtonGroup>
          <Button sx={{ textTransform: 'none' }} color="danger">
            {t('common.back')}
          </Button>
          <Button sx={{ textTransform: 'none' }} color="success">
            {t('common.edit')}
          </Button>
        </ButtonGroup>
      </FormControl>
    </>
  );
};

export default PersonalDataComponent;
