import React from 'react';
import SideNav from '../SideNavigation/index';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = ({ routes }) => {
  return (
    <div style={{ display: 'flex' }}>
      <SideNav routes={routes} />
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet context={{ routes }} />
      </main>
    </div>
  );
};

export default ProtectedLayout;
