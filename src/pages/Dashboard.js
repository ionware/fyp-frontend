import React from 'react';
import { Redirect } from 'react-router';
import Layout from '../components/Layout';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import useAppState from '../state/useAppState';

function Dashboard() {
  const { user, token } = useAppState();

  /**
   * Ensure that user is authenticated.
   */
  if (!token && !user) return <Redirect to='/' />;

  return (
    <Layout>
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Cards */}
      <div className='grid grid-cols-12 gap-6'>
        {/* Student number */}
        <DashboardCard01 />
        {/* Lecturers number */}
        <DashboardCard02 />
        {/* API Key stat */}
        <DashboardCard03 />

        {/* Resource usage */}
        <DashboardCard06 />
        {/* Table (Recently added students) */}
        <DashboardCard07 />
      </div>
    </Layout>
  );
}

export default Dashboard;
