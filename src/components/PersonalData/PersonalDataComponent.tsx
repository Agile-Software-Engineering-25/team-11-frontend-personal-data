import { useState } from 'react';
import { Box, Button, ButtonGroup, Checkbox, Divider, FormControl, FormLabel, Input } from '@mui/joy';
import PersonalDataStudent from '@components/PersonalData/PersonalDataStudentComponent.tsx';
import PersonalDataLecturersComponent from '@components/PersonalData/PersonalDataLecturersComponent.tsx';
import PersonalDataEmployeeComponent from '@components/PersonalData/PersonalDataEmployeeComponent.tsx';
import useUser from '@/hooks/useUser';
import { useTranslation } from 'react-i18next';
import ProfilePictureAvatar from './ProfilePictureAvatar';
import ProfilePictureModal from './ProfilePictureModal';
import AddressFields from './AddressFields';
import { usePersonalData } from '@/hooks/usePersonalData';

const PersonalDataComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { t } = useTranslation();
  const user = useUser();

  const {
    userData,
    formData,
    setFormData,
    profilePictureUrl,
    setProfilePictureUrl,
    handleSave,
    resetFormData,
  } = usePersonalData();

  const handleCancel = () => {
    resetFormData();
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    const success = await handleSave();
    if (success || success === false) {
      setIsEditing(false);
    }
  };

  return (
    <>
      <ProfilePictureAvatar
        profilePictureUrl={profilePictureUrl}
        onClick={() => setIsProfileModalOpen(true)}
      />

      <ProfilePictureModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profilePictureUrl={profilePictureUrl}
        onProfilePictureChange={setProfilePictureUrl}
      />

      {/* First and Last Name */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 419, mb: 2 }}>
          <FormLabel>{t('pages.personalData.firstName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Max"
            readOnly={true}
            value={formData?.firstName ?? ''}
            onChange={(e) => setFormData((prev) => ({ ...prev!, firstName: e.target.value }))}
          />
        </FormControl>
        <FormControl sx={{ width: 419, mb: 2 }}>
          <FormLabel>{t('pages.personalData.lastName')}</FormLabel>
          <Input
            color="neutral"
            size="lg"
            placeholder="Mustermann"
            value={formData?.lastName ?? ''}
            onChange={(e) => setFormData((prev) => ({ ...prev!, lastName: e.target.value }))}
            readOnly={true}
          />
        </FormControl>
      </Box>

      {/* Email, Birthday, Phone */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl sx={{ width: 326, mb: 2 }}>
          <FormLabel>{t('pages.personalData.email')}</FormLabel>
          <Input color="neutral" size="lg" value={user.getEmail()} type="email" readOnly />
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
            onChange={(e) => setFormData((prev) => ({ ...prev!, dateOfBirth: e.target.value }))}
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
            onChange={(e) => setFormData((prev) => ({ ...prev!, phoneNumber: e.target.value }))}
          />
        </FormControl>
      </Box>

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* Address Fields */}
      <AddressFields
        address={formData?.address ?? ''}
        houseNumber={formData?.houseNumber ?? ''}
        postalCode={formData?.postalCode ?? ''}
        city={formData?.city ?? ''}
        isEditing={isEditing}
        onChange={(field, value) => setFormData((prev) => ({ ...prev!, [field]: value }))}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* Parking Checkbox */}
      <Checkbox
        label={t('pages.personalData.parking')}
        checked={!!formData?.drives_car}
        onChange={(e) => setFormData((prev) => ({ ...prev!, drives_car: e.target.checked }))}
        disabled={!isEditing}
        variant="soft"
        color="primary"
        size="lg"
        sx={{
          borderRadius: 1,
          px: 1,
          py: 0.75,
          transition: 'background-color 150ms, box-shadow 150ms, transform 150ms',
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
            opacity: 0.9,
            cursor: 'not-allowed',
            transform: 'none',
            boxShadow: 'none',
            borderRadius: 8,
            '& *': { color: 'neutral.950 !important' },
          },
        }}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      {/* Role-specific components */}
      {user.getRole() === 'employee' && <PersonalDataEmployeeComponent userData={userData} />}
      {user.getRole() === 'student' && (
        <Box sx={{ mt: 3 }}>
          <PersonalDataStudent userData={userData} />
        </Box>
      )}
      {user.getRole() === 'lecturer' && (
        <Box sx={{ mt: 3 }}>
          <PersonalDataLecturersComponent userData={userData} />
        </Box>
      )}

      {/* Action Buttons */}
      <ButtonGroup spacing={1} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        {isEditing && (
          <Button
            variant="soft"
            color="danger"
            onClick={handleCancel}
            sx={{ textTransform: 'none', px: 2, width: 120, minWidth: 120, flex: '0 0 120px', height: 40 }}
          >
            {t('common.cancel')}
          </Button>
        )}
        <Button
          color="primary"
          variant="solid"
          onClick={() => (isEditing ? handleSaveClick() : setIsEditing(true))}
          sx={{ textTransform: 'none', px: 2, width: 120, minWidth: 120, flex: '0 0 120px', height: 40 }}
        >
          {isEditing ? t('common.save') : t('common.edit')}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default PersonalDataComponent;
