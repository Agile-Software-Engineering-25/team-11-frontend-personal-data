import {
  FormControl,
  Input,
  FormLabel,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/joy';
import { useTranslation } from 'react-i18next';

const PersonalDataEmployeeComponent = () => {
  const { t } = useTranslation();
  return (
    <Accordion>
      <AccordionSummary>
        <Typography level={'h3'}>
          {t('components.personalDataEmployee.Employee')}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <FormControl sx={{ width: 325, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataEmployee.department')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              readOnly
              value="Gebäudereinigung"
            />
          </FormControl>
          <FormControl sx={{ width: 272, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataEmployee.position')}
            </FormLabel>
            <Input color="neutral" size="lg" readOnly value="Putzkraft" />
          </FormControl>
          <FormControl sx={{ width: 272, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataEmployee.employeeID')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="123456"
              readOnly
              value="123456"
            />
          </FormControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PersonalDataEmployeeComponent;
