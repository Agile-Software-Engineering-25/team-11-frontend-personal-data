import { Typography, FormControl, Input, FormLabel, Box } from '@mui/joy';

const personalDataStudent = () => {
  return (
    <>
      <Typography level={'h3'}>Student</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <FormControl>
          <FormLabel>Studiengang</FormLabel>
          <Input placeholder="Informatik" readOnly value="Informatik" />
        </FormControl>
        <FormControl>
          <FormLabel>Semester</FormLabel>
          <Input placeholder="6" readOnly value="6" />
        </FormControl>
        <FormControl>
          <FormLabel>Matrikelnummer</FormLabel>
          <Input placeholder="123456" readOnly value="123456" />
        </FormControl>
      </Box>
    </>
  );
};

export default personalDataStudent;
