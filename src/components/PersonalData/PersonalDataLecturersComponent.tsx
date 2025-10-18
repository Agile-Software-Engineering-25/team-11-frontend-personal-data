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

const PersonalDataLecturersComponent = () => {
  const { t } = useTranslation();
  return (
    <Accordion>
      <AccordionSummary>
        <Typography level={'h3'}>
          {t('components.personalDataLecturers.Lecturer')}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <FormControl sx={{ width: 325, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataLecturers.department')}
            </FormLabel>
            <Input color="neutral" size="lg" readOnly value="Informatik" />
          </FormControl>
          <FormControl sx={{ width: 272, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataLecturers.position')}
            </FormLabel>
            <Input color="neutral" size="lg" readOnly value="Professor" />
          </FormControl>
          <FormControl sx={{ width: 272, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataLecturers.employeeID')}
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

export default PersonalDataLecturersComponent;
