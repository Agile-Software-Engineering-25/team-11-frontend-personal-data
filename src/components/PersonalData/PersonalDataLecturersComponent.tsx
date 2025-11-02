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
import type { UserData } from '@/@types/UserData.tsx';

interface Props {
  userData: UserData | null;
}

const PersonalDataLecturersComponent = ({ userData }: Props) => {
  const { t } = useTranslation();
  return (
    <Accordion>
      <AccordionSummary>
        <Typography level={'h3'}>
          {t('components.personalDataLecturers.Lecturer')}
        </Typography>
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
              {t('components.personalDataLecturers.field_chair')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="Informatik"
              readOnly
              value={userData?.fieldChair}
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <FormLabel>{t('pages.personalData.academicTitle')}</FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="Prof. Dr."
              readOnly
              value={userData?.title}
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <FormLabel>
              {t('components.personalDataLecturers.employment_status')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="Vollzeit"
              readOnly
              value={t(
                `components.personalDataLecturers.employment_status_options.${userData?.employmentStatus}`
              )}
            />
          </FormControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PersonalDataLecturersComponent;
