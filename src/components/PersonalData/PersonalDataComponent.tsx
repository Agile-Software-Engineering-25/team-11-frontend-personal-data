import {
  Autocomplete,
  Box,
  ButtonGroup,
  FormControl,
  FormLabel,
  Divider,
} from '@mui/joy';
import Button from '../../../shared-components/src/components/Button/Button.tsx';
import Input from '../../../shared-components/src/components/Input/Input.tsx';
import PersonalDataStudent from '@components/PersonalData/PersonalDataStudentComponent.tsx';
import { useTranslation } from 'react-i18next';
import { useMemo, useState, useCallback } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const onToggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);
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
              input: { readOnly: !isEditing },
            }}
            sx={{ height: 45 }}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl sx={{ width: 155, mb: 2 }}>
          <FormLabel>{t('pages.personalData.salutation')}</FormLabel>
          <Autocomplete
            placeholder="Anrede*"
            options={['Herr', 'Frau', 'Divers']}
            disableClearable
            slotProps={{
              input: { readOnly: !isEditing },
            }}
            sx={{ height: 45 }}
            defaultValue="Herr"
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.firstName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Max"
            readOnly={!isEditing}
            defaultValue="Max"
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.lastName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Mustermann"
            defaultValue="Mustermann"
            readOnly={!isEditing}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 325, mb: 2 }}>
          <FormLabel>{t('pages.personalData.nationality')}</FormLabel>
          <Autocomplete
            placeholder="Titel*"
            options={countryOptions}
            defaultValue={
              countries.getNames(i18n.language === 'de' ? 'de' : 'en')['DE']
            }
            disableClearable
            readOnly={!isEditing}
            sx={{ height: 45 }}
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.birthday')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            type="date"
            readOnly={!isEditing}
            defaultValue="0001-06-01"
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.telephone')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="+49 123 4567890"
            type="tel"
            readOnly={!isEditing}
            defaultValue="+49 123 4567890"
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
            defaultValue="max.mustermann@mustermail.de"
            type="email"
            readOnly={!isEditing}
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
            readOnly={!isEditing}
            defaultValue="Musterstraße"
          />
        </FormControl>
        <FormControl sx={{ width: 127, mb: 2 }}>
          <FormLabel>{t('pages.personalData.houseNumber')}</FormLabel>
          <Input
            type="number"
            color="neutral"
            size="lg"
            placeholder="42"
            readOnly={!isEditing}
            defaultValue="42"
          />
        </FormControl>
        <FormControl sx={{ width: 127, mb: 2 }}>
          <FormLabel>{t('pages.personalData.postalCode')}</FormLabel>
          <Input
            type="number"
            color="neutral"
            size="lg"
            placeholder="Entenhausen"
            readOnly={!isEditing}
            defaultValue="12345"
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.city')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Entenhausen"
            readOnly={!isEditing}
            defaultValue="Entenhausen"
          />
        </FormControl>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <PersonalDataEmployeeComponent />
      <Box sx={{ mt: 3 }}>
        <PersonalDataStudent />
      </Box>
      <Box sx={{ mt: 3 }}>
        <PersonalDataLecturersComponent />
      </Box>
      <FormControl sx={{ width: 272, mt: 3 }}>
        <ButtonGroup>
          <Button
            sx={{ textTransform: 'none' }}
            color="danger"
            id={'back'}
            type="button"
            onClick={onBack}
          >
            {t('common.back')}
          </Button>
          <Button
            sx={{ textTransform: 'none' }}
            color="success"
            id={'edit'}
            type="button"
            onClick={onToggleEdit}
          >
            {isEditing ? t('common.save') : t('common.edit')}
          </Button>
        </ButtonGroup>
      </FormControl>
    </>
  );
};

export default PersonalDataComponent;
