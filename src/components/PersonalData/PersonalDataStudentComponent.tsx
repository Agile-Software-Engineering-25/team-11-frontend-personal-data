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
import { type UserData } from '@/@types/UserData';

interface Props {
  userData: UserData | null;
}

const PersonalDataStudentComponent = ({ userData }: Props) => {
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
            <FormLabel>
              {t('components.personalDataStudent.study_status')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="ENROLLED"
              readOnly
              value={userData?.studyStatus}
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
              value={userData?.semester}
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <FormLabel>
              {t('components.personalDataStudent.matriculation_number')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="123456"
              readOnly
              value={userData?.matriculationNumber}
            />
          </FormControl>

          <FormControl
            sx={{
              width: '100%',
              gridColumn: { xs: '1', sm: '1', md: '1 / span 2' },
            }}
          >
            <FormLabel>
              {t('components.personalDataStudent.degree_program')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="Informatik"
              readOnly
              value={userData?.degreeProgram}
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
              value={userData?.cohort}
            />
          </FormControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PersonalDataStudentComponent;
