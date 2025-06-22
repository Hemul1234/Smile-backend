import { useEffect } from 'react';

const RedirectDashboard = () => {
  useEffect(() => {
    window.location.href = '/admin/resources/User';
  }, []);
  return null;
};

export default RedirectDashboard;