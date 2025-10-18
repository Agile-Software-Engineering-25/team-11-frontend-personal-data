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
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            mt: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: 'repeat(3, minmax(200px, 1fr))',
            },
          }}
        >
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>{t('components.personalDataStudent.status')}</FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="ENROLLED"
              readOnly
              value="ENROLLED"
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
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

          <FormControl sx={{ width: '100%' }}>
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

          <FormControl
            sx={{
              width: '100%',
              gridColumn: { xs: '1', sm: '1', md: '1 / span 2' },
            }}
          >
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

          <FormControl
            sx={{ width: '100%', gridColumn: { xs: '1', sm: '2', md: '3' } }}
          >
            <FormLabel>{t('components.personalDataStudent.cohort')}</FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="2023"
              readOnly
              value="2023"
            />
          </FormControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PersonalDataStudentComponent;
