import { Box, Button, IconButton, Modal, Sheet, Typography, Avatar } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import useUser from '@/hooks/useUser';
import useAxiosInstance from '@hooks/useAxiosInstance.ts';
import axios from 'axios';

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
  
  const [pendingAction, setPendingAction] = useState<'none' | 'delete' | 'upload'>('none');
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Reset state when modal closes or profilePictureUrl changes
  useEffect(() => {
    if (!isOpen) {
      setPendingAction('none');
      setPendingFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clean up previous preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    setPendingFile(file);
    setPendingAction('upload');
  };

  const handleDeleteClick = () => {
    setPendingAction('delete');
    setPreviewUrl(null);
    setPendingFile(null);
  };

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setPendingFile(null);
    setPendingAction('none');
  };

  const handleSave = async () => {
    const userId = user.getUserId();
    if (!userId) return;

    try {
      if (pendingAction === 'upload' && pendingFile) {
        const formData = new FormData();
        formData.append('file', pendingFile);

        await axiosInstance.post(`/api/v1/profile-picture/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${user.getAccessToken()}`,
          },
        });
        
        onProfilePictureChange(previewUrl);
      } else if (pendingAction === 'delete') {
        await axiosInstance.delete(`/api/v1/profile-picture/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.getAccessToken()}`,
          },
        });
        
        if (profilePictureUrl) {
          URL.revokeObjectURL(profilePictureUrl);
        }
        onProfilePictureChange(null);
      }

      setPendingAction('none');
      setPendingFile(null);
      setPreviewUrl(null);
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Operation failed:', {
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers,
        });
      } else {
        console.error('Operation failed:', err);
      }
      
      // Clean up on error
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setPendingFile(null);
      setPendingAction('none');
    }
  };

  const displayUrl = pendingAction === 'upload' ? previewUrl : 
                     pendingAction === 'delete' ? null : 
                     profilePictureUrl;

  const hasChanges = pendingAction !== 'none';

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
            src={displayUrl || undefined}
            alt="Profile Picture"
            sx={{ width: 130, height: 130, bgcolor: displayUrl ? undefined : 'neutral.300' }}
          >
            {!displayUrl && (
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
          onChange={handleFileSelect}
        />

        {!hasChanges ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button variant="soft" color="danger" onClick={handleDeleteClick}>
              {t('common.delete')}
            </Button>
            <label htmlFor="profile-upload">
              <Button component="span">{t('common.upload')}</Button>
            </label>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button variant="outlined" color="neutral" onClick={handleCancel}>
              {t('common.cancel')}
            </Button>
            <Button variant="solid" color="primary" onClick={handleSave}>
              {t('common.save')}
            </Button>
          </Box>
        )}
      </Sheet>
    </Modal>
  );
};

export default ProfilePictureModal;
