import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Layout from '../components/Layout';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import { useGetStatistics } from '../api/resource';
import useAppState from '../state/useAppState';

function Dashboard() {
  const { user, token } = useAppState();
  const statistics = useGetStatistics();

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
        <DashboardCard01
          amount={statistics.data ? statistics.data.data.students : 0}
        />
        {/* Lecturers number */}
        <DashboardCard02
          amount={statistics.data ? statistics.data.data.users : 0}
        />
        {/* API Key stat */}
        <DashboardCard03
          amount={statistics.data ? statistics.data.data.keys : 0}
        />

        {/* Resource usage */}
        <DashboardCard06
          stat={
            statistics.data
              ? [
                  statistics.data.data.students,
                  statistics.data.data.users,
                  statistics.data.data.keys,
                ]
              : null
          }
        />
        {/* Table (Recently added students) */}
        <DashboardCard07 />
      </div>
    </Layout>
  );
}

export default Dashboard;
