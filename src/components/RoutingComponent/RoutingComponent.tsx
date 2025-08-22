import { Route, Routes } from 'react-router';
import Home from '@pages/Home/Home.tsx';

const RoutingComponent = () => {
  return (
    // Define your routes here
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default RoutingComponent;
