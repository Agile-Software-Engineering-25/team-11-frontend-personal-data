import { Typography, FormControl, FormLabel, Box } from '@mui/joy';
import Input from '../../../shared-components/src/components/Input/Input.tsx';
import { useTranslation } from 'react-i18next';

const PersonalDataEmployeeComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography level={'h3'}>
        {t('components.personalDataEmployee.Employee')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <FormControl>
          <FormLabel>
            {t('components.personalDataEmployee.department')}
          </FormLabel>
          <Input readOnly value="Gebäudereinigung" />
        </FormControl>
        <FormControl>
          <FormLabel>{t('components.personalDataEmployee.position')}</FormLabel>
          <Input readOnly value="Putzkraft" />
        </FormControl>
        <FormControl>
          <FormLabel>
            {t('components.personalDataEmployee.employeeID')}
          </FormLabel>
          <Input placeholder="123456" readOnly value="123456" />
        </FormControl>
      </Box>
    </>
  );
};

export default PersonalDataEmployeeComponent;
