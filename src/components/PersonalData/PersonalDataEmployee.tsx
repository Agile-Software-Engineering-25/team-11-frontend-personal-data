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

const PersonalDataEmployeeComponent = ({ userData }: Props) => {
  const { t } = useTranslation();
  return (
    <Accordion>
      <AccordionSummary>
        <Typography level={'h3'}>
          {t('components.personalDataEmployee.Employee')}
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
              md: 'repeat(4, minmax(200px, 1fr))',
            },
          }}
        >
          <FormControl sx={{ width: '100%' }}>
            <FormLabel>
              {t('components.personalDataEmployee.department')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="Reinigung"
              readOnly
              value={userData?.department}
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <FormLabel>
              {t('components.personalDataEmployee.office_number')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="B-123"
              readOnly
              value={userData?.officeNumber}
            />
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <FormLabel>
              {t('components.personalDataEmployee.employee_number')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="123456"
              readOnly
              value={userData?.employeeNumber}
            />
          </FormControl>
          <FormControl
            sx={{
              width: '100%',
            }}
          >
            <FormLabel>
              {t('components.personalDataEmployee.working_time_model')}
            </FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="Vollzeit"
              readOnly
              value={userData?.workingTimeModel}
            />
          </FormControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default PersonalDataEmployeeComponent;
