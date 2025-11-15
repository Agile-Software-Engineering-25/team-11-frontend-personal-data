import { Box, Avatar } from '@mui/joy';

interface ProfilePictureAvatarProps {
  profilePictureUrl: string | null;
  onClick: () => void;
}

const ProfilePictureAvatar = ({ profilePictureUrl, onClick }: ProfilePictureAvatarProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, py: 3 }}>
      <Box
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          cursor: 'pointer',
          '&:hover .edit-hover': { opacity: 1 },
        }}
        onClick={onClick}
      >
        <Avatar
          src={profilePictureUrl || undefined}
          alt="Profile Picture"
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: profilePictureUrl ? undefined : 'neutral.200',
            color: 'neutral.700',
          }}
        >
          {!profilePictureUrl && (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="currentColor" />
              <path d="M4 20c0-3.313 2.687-6 6-6h4c3.313 0 6 2.687 6 6v1H4v-1z" fill="currentColor" />
            </svg>
          )}
        </Avatar>
        <Box
          className="edit-hover"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            color: 'white',
            fontSize: 32,
            pointerEvents: 'none',
          }}
        >
          ✎
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePictureAvatar;
