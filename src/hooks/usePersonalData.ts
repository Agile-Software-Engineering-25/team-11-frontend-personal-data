import { useState, useEffect } from 'react';
import { type UserData, Student, Lecturer, Employee, User } from '@/@types/UserData.tsx';
import useUser from '@/hooks/useUser';
import useAxiosInstance from '@hooks/useAxiosInstance.ts';

export const usePersonalData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<UserData | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const user = useUser();
  const axiosInstance = useAxiosInstance('https://sau-portal.de/team-11-api');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = user.getUserId();
        if (!userId) return;

        const response = await axiosInstance.get(`/api/v1/users/${userId}`);

        let userInstance: UserData;
        switch (user.getRole()?.toLowerCase()) {
          case 'student':
            userInstance = new Student(response.data);
            break;
          case 'lecturer':
            userInstance = new Lecturer(response.data);
            break;
          case 'employee':
            userInstance = new Employee(response.data);
            break;
          default:
            userInstance = new User(response.data);
            break;
        }
        setUserData(userInstance);
        setFormData(userInstance);
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
    const keys = new Set<string>([...Object.keys(oldObj), ...Object.keys(newObj)]);

    const addressChanged = addressKeys.some((k) => normalize(oldObj[k]) !== normalize(newObj[k]));

    if (addressChanged) {
      diff['address'] = addressKeys.map((k) => normalize(newObj[k])).join(',');
      addressKeys.forEach((k) => keys.delete(k));
    }

    keys.forEach((k) => {
      const oldVal = normalize(oldObj[k]);
      const newVal = normalize(newObj[k]);
      if (oldVal !== newVal) {
        diff[k] = newVal;
      }
    });

    if (Object.keys(diff).length === 0) return false;

    try {
      await axiosInstance.put(`/api/v1/users/${user.getUserId()}`, diff, {
        headers: { 'Content-Type': 'application/json' },
      });
      setUserData((prev) => ({ ...(prev as Record<string, unknown>), ...diff }));
      return true;
    } catch (error) {
      console.error('PUT request failed:', error);
      return false;
    }
  };

  return {
    userData,
    formData,
    setFormData,
    profilePictureUrl,
    setProfilePictureUrl,
    handleSave,
    resetFormData: () => setFormData(userData),
  };
};
