import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Autocomplete,
} from '@mui/joy';
import PersonalDataStudent from '@components/PersonalData/PersonalDataStudentComponent.tsx';
import PersonalDataLecturersComponent from '@components/PersonalData/PersonalDataLecturersComponent.tsx';
import PersonalDataEmployeeComponent from '@components/PersonalData/PersonalDataEmployee.tsx';
import useUser from '@/hooks/useUser';
import { useTranslation } from 'react-i18next';
import {
  type UserData,
  Student,
  Lecturer,
  Employee,
  User,
} from '/Users/sanojananandarajah/Projekte/Agile/team-11-frontend-personal-data/src/@types/UserData.tsx';
import useAxiosInstance from '@hooks/useAxiosInstance.ts';

const PersonalDataComponent = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { t } = useTranslation();
  const user = useUser();

  const axiosInstance = useAxiosInstance('https://sau-portal.de/team-11-api');

  console.log('User ID:', user.getUserId());
  console.log('Full user object:', user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = user.getUserId();
        if (!userId) return;

        const response = await axiosInstance.get(`/api/v1/users/${userId}`);
        console.log('API Response:', response.data);

        switch (user.getRole()?.toLowerCase()) {
          case 'student': {
            const student = new Student(response.data);
            setUserData(student);
            break;
          }

          case 'lecturer': {
            const lecturer = new Lecturer(response.data);
            setUserData(lecturer);
            break;
          }

          case 'employee': {
            const employee = new Employee(response.data);
            setUserData(employee);
            break;
          }

          default: {
            const defaultUser = new User(response.data);
            setUserData(defaultUser);
            break;
          }
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user.getRole());

  return (
    <>
      {/* 1st Box with AcademicTitle, Salutation,  */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 155, mb: 2 }}>
          <FormLabel>{t('pages.personalData.academicTitle')}</FormLabel>
          <Autocomplete
            placeholder={userData?.title || 'Titel*'}
            options={['Prof.', 'Dr.', 'Prof. Dr.']}
            disableClearable
            slotProps={{
              input: { readOnly: true },
            }}
            sx={{ height: 45 }}
            value={userData?.title || ''}
            readOnly
          />
        </FormControl>
        <FormControl sx={{ width: 155, mb: 2 }}>
          <FormLabel>{t('pages.personalData.salutation')}</FormLabel>
          <Autocomplete
            placeholder="Anrede*"
            options={['Herr', 'Frau', 'Divers']}
            disableClearable
            slotProps={{
              input: { readOnly: true },
            }}
            sx={{ height: 45 }}
            value="Herr"
            readOnly
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.firstName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Max"
            readOnly
            value={userData?.firstName}
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.lastName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Mustermann"
            value={userData?.lastName}
            readOnly
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 325, mb: 2 }}>
          <FormLabel>{t('pages.personalData.email')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="max.mustermann@mustermail.de"
            value={user.getEmail()}
            type="email"
            readOnly
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.birthday')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            type="date"
            readOnly
            value={
              userData?.dateOfBirth
                ? typeof userData.dateOfBirth === 'string'
                  ? userData.dateOfBirth
                  : userData.dateOfBirth.toISOString().split('T')[0]
                : ''
            }
          />
        </FormControl>
        <FormControl sx={{ width: 272, mb: 2 }}>
          <FormLabel>{t('pages.personalData.telephone')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="+49 123 4567890"
            type="tel"
            readOnly
            value={userData?.phoneNumber}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}></Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 325, mb: 2 }}>
          <FormLabel>{t('pages.personalData.street')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Musterstraße"
            readOnly
            value={userData?.address}
          />
        </FormControl>
        <FormControl sx={{ width: 127, mb: 2 }}>
          <FormLabel>{t('pages.personalData.houseNumber')}</FormLabel>
          <Input
            type="number"
            color="neutral"
            size="lg"
            placeholder="42"
            readOnly
            value={userData?.houseNumber}
          />
        </FormControl>
        <>
          <FormControl sx={{ width: 127, mb: 2 }}>
            <FormLabel>{t('pages.personalData.postalCode')}</FormLabel>
            <Input
              type="number"
              color="neutral"
              size="lg"
              placeholder="123456"
              readOnly
              value={userData?.postalCode}
            />
          </FormControl>
          <FormControl sx={{ width: 272, mb: 2 }}>
            <FormLabel>{t('pages.personalData.city')}</FormLabel>
            <Input
              color="neutral"
              size="lg"
              placeholder="Entenhausen"
              readOnly
              value={userData?.city}
            />
          </FormControl>
        </>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      {user.getRole() === 'employee' && (
        <PersonalDataEmployeeComponent userData={userData} />
      )}
      <Box sx={{ mt: 3 }}>
        {user.getRole() === 'student' && (
          <PersonalDataStudent userData={userData} />
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        {user.getRole() === 'lecturer' && (
          <PersonalDataLecturersComponent userData={userData} />
        )}
      </Box>
      <FormControl sx={{ width: 272, mt: 3 }}>
        <ButtonGroup>
          <Button sx={{ textTransform: 'none' }} color="danger">
            {t('common.back')}
          </Button>
          <Button sx={{ textTransform: 'none' }} color="success">
            {t('common.edit')}
          </Button>
        </ButtonGroup>
      </FormControl>
    </>
  );
};

export default PersonalDataComponent;
