import {
  Autocomplete,
  Box,
  ButtonGroup,
  FormControl,
  FormLabel,
} from '@mui/joy';
import Button from '../../../shared-components/src/components/Button/Button.tsx';
import Input from '../../../shared-components/src/components/Input/Input.tsx';
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
        <FormControl sx={{ width: 272, mb: 1 }}>
          <FormLabel>{t('pages.personalData.lastName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Mustermann"
            value="Mustermann"
            readOnly
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 1 }}>
          <FormLabel>{t('pages.personalData.firstName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Max"
            readOnly
            value="Max"
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 450, mb: 1 }}>
          <FormLabel>{t('pages.personalData.street')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Musterstraße"
            readOnly
            value="Bischöflich-Geistlicher-Rat-Josef-Zinnbauer-Straße"
          />
        </FormControl>
        <FormControl sx={{ width: 90, mb: 1 }}>
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
        <FormControl sx={{ width: 360, mb: 1 }}>
          <FormLabel>{t('pages.personalData.city')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Entenhausen"
            readOnly
            value="Hellschen-Heringsand-Unterschaar"
          />
        </FormControl>
        <FormControl sx={{ width: 110, mb: 1 }}>
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
      </Box>
      {/* Nicht editierbares Feld */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: '50%', mb: 2 }}>
          <FormLabel>E-Mail*</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="max.mustermann@mustermail.de"
            value="max.mustermann@mustermail.de"
            type="email"
            readOnly
          />
        </FormControl>
        <FormControl sx={{ width: 140, mb: 1 }}>
          <FormLabel>{t('pages.personalData.birthday')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            type="date"
            readOnly
            value="0001-06-01"
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ width: 272, mb: 1 }}>
            {t('pages.personalData.telephone')}
          </FormLabel>
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
      <FormControl>
        {/*Hier werden die jeweiligen Tätigkeiten angezeigt.
          Die Auswahl lässt sich vom Nutzer nicht ändern und wird aus der
          Datenbank übernommen.
          Todo: Datenbankanbindung
          Als vorläufiges Beispiel wird der Student eingetragen.*/}
      </FormControl>
      <FormControl sx={{ width: 272, mb: 2 }}>
        <FormLabel>{t('pages.personalData.nationality')}</FormLabel>
        <Autocomplete
          placeholder="Titel*"
          options={countryOptions}
          value={countries.getNames(i18n.language === 'de' ? 'de' : 'en')['DE']}
          disableClearable
          readOnly
          sx={{ height: 45 }}
        />
      </FormControl>
      <PersonalDataEmployeeComponent></PersonalDataEmployeeComponent>
      <PersonalDataStudent></PersonalDataStudent>
      <PersonalDataLecturersComponent></PersonalDataLecturersComponent>
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
