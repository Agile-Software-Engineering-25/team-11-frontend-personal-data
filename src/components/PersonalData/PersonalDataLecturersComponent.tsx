import { Typography, FormControl, FormLabel, Box } from '@mui/joy';
import Input from '../../../shared-components/src/components/Input/Input.tsx';
import { useTranslation } from 'react-i18next';

const PersonalDataLecturersComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography level={'h3'}>Student</Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <FormControl>
          <FormLabel>
            {t('components.personalDataLecturers.department')}
          </FormLabel>
          <Input readOnly value="Informatik" />
        </FormControl>
        <FormControl>
          <FormLabel>
            {t('components.personalDataLecturers.position')}
          </FormLabel>
          <Input readOnly value="Professor" />
        </FormControl>
        <FormControl>
          <FormLabel>
            {t('components.personalDataLecturers.employeeID')}
          </FormLabel>
          <Input placeholder="123456" readOnly value="123456" />
        </FormControl>
      </Box>
    </>
  );
};

export default PersonalDataLecturersComponent;
