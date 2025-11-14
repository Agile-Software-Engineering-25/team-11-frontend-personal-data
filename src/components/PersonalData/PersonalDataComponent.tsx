import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Avatar,
} from '@mui/joy';
import PersonalDataStudent from '@components/PersonalData/PersonalDataStudentComponent.tsx';
import PersonalDataLecturersComponent from '@components/PersonalData/PersonalDataLecturersComponent.tsx';
import PersonalDataEmployeeComponent from '@components/PersonalData/PersonalDataEmployeeComponent.tsx';
import useUser from '@/hooks/useUser';
import { useTranslation } from 'react-i18next';
import {
  type UserData,
  Student,
  Lecturer,
  Employee,
  User,
} from '@/@types/UserData.tsx';
import useAxiosInstance from '@hooks/useAxiosInstance.ts';

const PersonalDataComponent = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
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
            setFormData(student);
            break;
          }

          case 'lecturer': {
            const lecturer = new Lecturer(response.data);
            setUserData(lecturer);
            setFormData(lecturer);
            break;
          }

          case 'employee': {
            const employee = new Employee(response.data);
            setUserData(employee);
            setFormData(employee);
            break;
          }

          default: {
            const defaultUser = new User(response.data);
            setUserData(defaultUser);
            setFormData(defaultUser);
            break;
          }
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    const fetchProfilePicture = async () => {
      try {
        const userId = user.getUserId();
        if (!userId) return;

        const response = await axiosInstance.get(`/api/v1/profile-picture/${userId}`, {
          responseType: 'blob',
        });

        const imageUrl = URL.createObjectURL(response.data);
        setProfilePictureUrl(imageUrl);
      } catch (error) {
        console.error('Failed to fetch profile picture:', error);
      }
    };

    fetchUserData();
    fetchProfilePicture();

    return () => {
      if (profilePictureUrl) {
        URL.revokeObjectURL(profilePictureUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user.getRole());

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!formData || !userData) return;

    const normalize = (v: unknown): string => {
      if (v instanceof Date) return v.toISOString();
      if (v === null || v === undefined) return '';
      if (typeof v === 'object') return JSON.stringify(v);
      return String(v);
    };

    const diff: Record<string, string> = {};
    const newObj = formData as Record<string, unknown>;
    const oldObj = userData as Record<string, unknown>;

    const addressKeys = ['address', 'houseNumber', 'postalCode', 'city'];
    const keys = new Set<string>([
      ...Object.keys(oldObj),
      ...Object.keys(newObj),
    ]);

    // Wenn eines der Adresse-Felder geändert wurde, setze diff['address'] mit allen 4 Werten (in fester Reihenfolge)
    const addressChanged = addressKeys.some((k) => {
      const oldVal = normalize(oldObj[k]);
      const newVal = normalize(newObj[k]);
      return oldVal !== newVal;
    });

    if (addressChanged) {
      diff['address'] = addressKeys.map((k) => normalize(newObj[k])).join(',');
      // Entferne die Einzel-Keys, damit sie nicht zusätzlich als separate Änderungen eingefügt werden
      addressKeys.forEach((k) => keys.delete(k));
    }

    keys.forEach((k) => {
      const oldVal = normalize(oldObj[k]);
      const newVal = normalize(newObj[k]);
      if (oldVal !== newVal) {
        diff[k] = newVal;
      }
    });
    const test: Record<string, unknown> = {};
    if ('phoneNumber' in diff) test.phone_number = diff['phoneNumber'];
    if ('dateOfBirth' in diff) test.date_of_birth = diff['dateOfBirth'];

    if ('address' in diff) test.address = diff['address'];

    if ('photoUrl' in diff) test.photo_url = diff['photoUrl'];
    if ('drives_car' in diff) test.drives_car = diff['drives_car'];
    console.log(test);
    console.log(diff);

    if (Object.keys(diff).length === 0) {
      setIsEditing(false);
      return;
    }
    try {
      await axiosInstance.put(`/api/v1/users/${user.getUserId()}`, test, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('PUT request failed:', error);
      return;
    }

    setUserData((prev) => ({ ...(prev as Record<string, unknown>), ...diff }));
    setIsEditing(false);
  };

  console.log(formData?.drives_car);
  return (
    <>
      {/* Profile Picture */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Avatar
          src={profilePictureUrl || undefined}
          alt="Profile Picture"
          sx={{ width: 120, height: 120 }}
        />
      </Box>

      {/* 1st Box with First and Last Name */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 419, mb: 2 }}>
          <FormLabel>{t('pages.personalData.firstName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Max"
            readOnly={true}
            value={formData?.firstName ?? ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev!, firstName: e.target.value }))
            }
          />
        </FormControl>
        <FormControl sx={{ width: 419, mb: 2 }}>
          <FormLabel>{t('pages.personalData.lastName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Mustermann"
            value={formData?.lastName ?? ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev!, lastName: e.target.value }))
            }
            readOnly={true}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 326, mb: 2 }}>
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
        <FormControl sx={{ width: 255, mb: 2 }}>
          <FormLabel>{t('pages.personalData.birthday')}</FormLabel>
          <Input
            variant={isEditing ? 'soft' : 'outlined'}
            color={isEditing ? 'primary' : 'neutral'}
            size="lg"
            type="date"
            readOnly={!isEditing}
            value={
              formData?.dateOfBirth
                ? typeof formData.dateOfBirth === 'string'
                  ? formData.dateOfBirth
                  : formData.dateOfBirth.toISOString().split('T')[0]
                : ''
            }
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev!,
                dateOfBirth: e.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl sx={{ width: 255, mb: 2 }}>
          <FormLabel>{t('pages.personalData.telephone')}</FormLabel>
          <Input
            variant={isEditing ? 'soft' : 'outlined'}
            color={isEditing ? 'primary' : 'neutral'}
            size="lg"
            placeholder="+49 123 4567890"
            type="tel"
            readOnly={!isEditing}
            value={formData?.phoneNumber ?? ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev!, phoneNumber: e.target.value }))
            }
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}></Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 326, mb: 2 }}>
          <FormLabel>{t('pages.personalData.street')}</FormLabel>
          <Input
            variant={isEditing ? 'soft' : 'outlined'}
            color={isEditing ? 'primary' : 'neutral'}
            size="lg"
            placeholder="Musterstraße"
            readOnly={!isEditing}
            value={formData?.address ?? ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev!, address: e.target.value }))
            }
          />
        </FormControl>
        <FormControl sx={{ width: 119.5, mb: 2 }}>
          <FormLabel>{t('pages.personalData.houseNumber')}</FormLabel>
          <Input
            variant={isEditing ? 'soft' : 'outlined'}
            color={isEditing ? 'primary' : 'neutral'}
            size="lg"
            placeholder="42"
            readOnly={!isEditing}
            value={formData?.houseNumber ?? ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev!, houseNumber: e.target.value }))
            }
          />
        </FormControl>
        <>
          <FormControl sx={{ width: 119.5, mb: 2 }}>
            <FormLabel>{t('pages.personalData.postalCode')}</FormLabel>
            <Input
              variant={isEditing ? 'soft' : 'outlined'}
              color={isEditing ? 'primary' : 'neutral'}
              size="lg"
              placeholder="12345"
              readOnly={!isEditing}
              value={formData?.postalCode ?? ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  postalCode: e.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl sx={{ width: 255, mb: 2 }}>
            <FormLabel>{t('pages.personalData.city')}</FormLabel>
            <Input
              variant={isEditing ? 'soft' : 'outlined'}
              color={isEditing ? 'primary' : 'neutral'}
              size="lg"
              placeholder="Entenhausen"
              readOnly={!isEditing}
              value={formData?.city ?? ''}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev!, city: e.target.value }))
              }
            />
          </FormControl>
        </>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Checkbox
        label="Nutzung eines Parkplatzes"
        checked={!!formData?.drives_car}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev!, drives_car: e.target.checked }))
        }
        disabled={!isEditing}
        variant="soft"
        color="primary"
        size="lg"
        sx={{
          borderRadius: 1,
          px: 1,
          py: 0.75,
          transition:
            'background-color 150ms, box-shadow 150ms, transform 150ms',

          '&[aria-checked="true"]': {
            backgroundColor: 'primary.600',
            color: 'neutral.100',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
          '&[aria-checked="false"]': {
            backgroundColor: 'neutral.050',
            color: 'neutral.800',
            border: '1px solid',
            borderColor: 'neutral.300',
          },

          '&.Mui-disabled, &[aria-disabled="true"]': {
            backgroundColor: 'neutral.300',
            color: 'primary.900',
            opacity: 0.9, // überschreibt das standardmäßige "ausgegraut"
            cursor: 'not-allowed',
            transform: 'none',
            boxShadow: 'none',
            borderRadius: 8,

            '& *': {
              color: 'neutral.950 !important',
            },
          },
        }}
      />
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
      <ButtonGroup
        spacing={1}
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {isEditing && (
          <Button
            variant="soft"
            color="danger"
            onClick={handleCancel}
            sx={{
              textTransform: 'none',
              px: 2,
              width: 120,
              minWidth: 120,
              flex: '0 0 120px',
              height: 40,
              lineHeight: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {t('common.cancel')}
          </Button>
        )}

        <Button
          color="primary"
          variant="solid"
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          sx={{
            textTransform: 'none',
            px: 2,
            width: 120,
            minWidth: 120,
            flex: '0 0 120px',
            height: 40,
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {isEditing ? t('common.save') : t('common.edit')}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default PersonalDataComponent;
