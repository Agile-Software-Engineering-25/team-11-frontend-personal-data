import { Route, Routes } from 'react-router';
import PersonalData from '@pages/personal-data/personalData.tsx';

const RoutingComponent = () => {
  return (
    // Define your routes here
    <Routes>
      <Route path="/" element={<PersonalData />} />
    </Routes>
  );
};

export default RoutingComponent;
