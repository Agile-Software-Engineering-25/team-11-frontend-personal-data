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

const PersonalDataStudentComponent = () => {
  const { t } = useTranslation();
  return (
    <Accordion>
      <AccordionSummary>
        <Typography level={'h3'}>Student</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <FormControl sx={{ width: 325, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataStudent.courseofstudy')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="Informatik"
              readOnly
              value="BSc Informatik"
            />
          </FormControl>
          <FormControl sx={{ width: 272, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataStudent.semester')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="6"
              readOnly
              value="6"
            />
          </FormControl>
          <FormControl sx={{ width: 272, mb: 2 }}>
            <FormLabel>
              {t('components.personalDataStudent.studentID')}
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

export default PersonalDataStudentComponent;
