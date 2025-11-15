import { Box, Button, IconButton, Modal, Sheet, Typography, Avatar } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import useUser from '@/hooks/useUser';
import useAxiosInstance from '@hooks/useAxiosInstance.ts';

interface ProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  profilePictureUrl: string | null;
  onProfilePictureChange: (url: string | null) => void;
}

const ProfilePictureModal = ({
  isOpen,
  onClose,
  profilePictureUrl,
  onProfilePictureChange,
}: ProfilePictureModalProps) => {
  const { t } = useTranslation();
  const user = useUser();
  const axiosInstance = useAxiosInstance('https://sau-portal.de/team-11-api');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const userId = user.getUserId();
    if (!userId) return;

    const previewUrl = URL.createObjectURL(file);
    onProfilePictureChange(previewUrl);

    try {
      const formData = new FormData();
      formData.append('file', file);
      await axiosInstance.post(`/api/v1/profile-picture/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.getAccessToken()}`,
        },
      });
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleDelete = async () => {
    const userId = user.getUserId();
    if (!userId) return;
    if (profilePictureUrl) URL.revokeObjectURL(profilePictureUrl);
    onProfilePictureChange(null);

    try {
      await axiosInstance.delete(`/api/v1/profile-picture/${userId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.getAccessToken()}`,
        },
      });
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Sheet variant="outlined" sx={{ width: 520, p: 3, borderRadius: 3, boxShadow: 'lg' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton variant="outlined" size="sm" onClick={onClose} aria-label="Close">
            ✕
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            src={profilePictureUrl || undefined}
            alt="Profile Picture"
            sx={{ width: 130, height: 130, bgcolor: profilePictureUrl ? undefined : 'neutral.300' }}
          >
            {!profilePictureUrl && (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" />
                <path d="M4 20c0-3.313 2.687-6 6-6h4c3.313 0 6 2.687 6 6v1H4v-1z" fill="currentColor" />
              </svg>
            )}
          </Avatar>
        </Box>

        <Typography sx={{ textAlign: 'center', mb: 2 }} level="h3">
          {t('pages.personalData.profile_picture')}
        </Typography>

        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleUpload}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button variant="soft" color="danger" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
          <label htmlFor="profile-upload">
            <Button component="span">{t('common.upload')}</Button>
          </label>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ProfilePictureModal;
