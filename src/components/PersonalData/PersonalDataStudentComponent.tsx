import { Typography, FormControl, FormLabel, Box } from '@mui/joy';
import Input from '../../../shared-components/src/components/Input/Input.tsx';
import { useTranslation } from 'react-i18next';

const PersonalDataStudentComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography level={'h3'}>Student</Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <FormControl>
          <FormLabel>
            {t('components.personalDataStudent.courseofstudy')}
          </FormLabel>
          {/*TODO: Den Inputfeld bilingual machen*/}
          {/*Studiengang wird als Input widergegeben, da der Student dies ohne
          hin nicht wechseln kann*/}
          <Input placeholder="Informatik" readOnly value="BSc Informatik" />
        </FormControl>
        <FormControl>
          <FormLabel>{t('components.personalDataStudent.semester')}</FormLabel>
          <Input placeholder="6" readOnly value="6" />
        </FormControl>
        <FormControl>
          <FormLabel>{t('components.personalDataStudent.studentID')}</FormLabel>
          <Input placeholder="123456" readOnly value="123456" />
        </FormControl>
      </Box>
    </>
  );
};

export default PersonalDataStudentComponent;
