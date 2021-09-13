import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Layout from '../components/Layout';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import Banner from '../partials/Banner';
import useAppState from '../state/useAppState';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
