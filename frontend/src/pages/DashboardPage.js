import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import { Truck, AlertTriangle, Activity, Package, TrendingUp, Users } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Active Fleet',
      value: stats?.active_fleet || 0,
      subtitle: `${stats?.total_vehicles || 0} total vehicles`,
      icon: Truck,
      color: 'bg-blue-50 text-blue-600',
      testId: 'active-fleet-card'
    },
    {
      title: 'Maintenance Alerts',
      value: stats?.maintenance_alerts || 0,
      subtitle: 'Vehicles in shop',
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600',
      testId: 'maintenance-alerts-card'
    },
    {
      title: 'Utilization Rate',
      value: `${stats?.utilization_rate || 0}%`,
      subtitle: 'Fleet efficiency',
      icon: Activity,
      color: 'bg-emerald-50 text-emerald-600',
      testId: 'utilization-rate-card'
    },
    {
      title: 'Pending Cargo',
      value: stats?.pending_cargo || 0,
      subtitle: 'Awaiting dispatch',
      icon: Package,
      color: 'bg-indigo-50 text-indigo-600',
      testId: 'pending-cargo-card'
    },
    {
      title: 'Active Trips',
      value: stats?.active_trips || 0,
      subtitle: 'In progress',
      icon: TrendingUp,
      color: 'bg-primary/10 text-primary',
      testId: 'active-trips-card'
    },
    {
      title: 'Active Drivers',
      value: stats?.active_drivers || 0,
      subtitle: 'On duty',
      icon: Users,
      color: 'bg-slate-50 text-slate-600',
      testId: 'active-drivers-card'
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Loading command center...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div data-testid="dashboard-page" className="p-6 md:p-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading tracking-tight">
            Command Center
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 uppercase tracking-widest font-semibold opacity-70">
            Real-time fleet overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              data-testid={stat.testId}
              className="bg-card border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 font-heading mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">{stat.subtitle}</p>
                </div>
                <div className={`${stat.color.split(' ')[0]} p-3 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.split(' ')[1]}`} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 font-heading mb-4">Fleet Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Ready Vehicles</span>
                <span className="text-sm font-semibold text-slate-900">{stats?.ready_vehicles || 0}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">On Trip</span>
                <span className="text-sm font-semibold text-slate-900">{stats?.active_fleet || 0}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">In Maintenance</span>
                <span className="text-sm font-semibold text-slate-900">{stats?.maintenance_alerts || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 font-heading mb-4">Trip Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Completed Trips</span>
                <span className="text-sm font-semibold text-slate-900">{stats?.completed_trips || 0}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Active Trips</span>
                <span className="text-sm font-semibold text-slate-900">{stats?.active_trips || 0}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Pending</span>
                <span className="text-sm font-semibold text-slate-900">{stats?.pending_cargo || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;