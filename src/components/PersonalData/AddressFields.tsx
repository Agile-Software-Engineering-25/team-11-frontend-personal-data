import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { useTranslation } from 'react-i18next';

interface AddressFieldsProps {
  address: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  isEditing: boolean;
  onChange: (field: string, value: string) => void;
}

const AddressFields = ({
  address,
  houseNumber,
  postalCode,
  city,
  isEditing,
  onChange,
}: AddressFieldsProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl sx={{ width: 326, mb: 2 }}>
        <FormLabel>{t('pages.personalData.street')}</FormLabel>
        <Input
          variant={isEditing ? 'soft' : 'outlined'}
          color={isEditing ? 'primary' : 'neutral'}
          size="lg"
          placeholder="Musterstraße"
          readOnly={!isEditing}
          value={address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ width: 119.5, mb: 2 }}>
        <FormLabel>{t('pages.personalData.houseNumber')}</FormLabel>
        <Input
          variant={isEditing ? 'soft' : 'outlined'}
          color={isEditing ? 'primary' : 'neutral'}
          size="lg"
          placeholder="42"
          readOnly={!isEditing}
          value={houseNumber}
          onChange={(e) => onChange('houseNumber', e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ width: 119.5, mb: 2 }}>
        <FormLabel>{t('pages.personalData.postalCode')}</FormLabel>
        <Input
          variant={isEditing ? 'soft' : 'outlined'}
          color={isEditing ? 'primary' : 'neutral'}
          size="lg"
          placeholder="12345"
          readOnly={!isEditing}
          value={postalCode}
          onChange={(e) => onChange('postalCode', e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ width: 255, mb: 2 }}>
        <FormLabel>{t('pages.personalData.city')}</FormLabel>
        <Input
          variant={isEditing ? 'soft' : 'outlined'}
          color={isEditing ? 'primary' : 'neutral'}
          size="lg"
          placeholder="Entenhausen"
          readOnly={!isEditing}
          value={city}
          onChange={(e) => onChange('city', e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default AddressFields;
