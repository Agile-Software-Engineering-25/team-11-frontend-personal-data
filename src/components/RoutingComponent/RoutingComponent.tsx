import { Route, Routes } from 'react-router';
import Home from '@pages/Home/Home.tsx';
import PersonalData from '@pages/personal-data/personalData.tsx';

const RoutingComponent = () => {
  return (
    // Define your routes here
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personal-data" element={<PersonalData />} />
    </Routes>
  );
};

export default RoutingComponent;
