
import {
  LayoutDashboard,
  Users,
  FileText,
  Pill,
  CalendarDays,
  Settings,
  LogOut,
  HeartPulse,
  Activity,
  ClipboardList,
  Clock
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-layout">

      <aside className="sidebar">

        <div className="sidebar-brand">
          <HeartPulse size={30} />
          <span>HealthCare+</span>
        </div>

        <p className="menu-heading">MAIN MENU</p>

        <nav>
          <Link to="/dashboard" className="sidebar-link active">
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link to="/patients" className="sidebar-link">
            <Users size={20} /> Patients
          </Link>

         <Link to="/medical-records" className="sidebar-link">
  <FileText size={20} /> Medical Records
</Link>

          <Link to="/prescriptions" className="sidebar-link">
            <Pill size={20} /> Prescriptions
          </Link>

          <Link to="/appointments" className="sidebar-link">
            <CalendarDays size={20} /> Appointments
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <Link to="/settings" className="sidebar-link">
            <Settings size={20} /> Settings
          </Link>

          <Link to="/login" className="sidebar-link">
            <LogOut size={20} /> Logout
          </Link>
        </div>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to your healthcare overview.</p>
          </div>

          <div className="profile">
            <div className="avatar">P</div>
            <div>
              <strong>Patient User</strong>
              <p>Patient</p>
            </div>
          </div>
        </header>

        <section className="welcome-banner">
          <div>
            <h1>Hello, Patient! 👋</h1>
            <p>Stay informed and take control of your health.</p>
          </div>

          <HeartPulse size={65} />
        </section>

        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">
              <FileText size={24} />
            </div>
            <p>Medical Records</p>
            <h2>08</h2>
            <span>Available records</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <Pill size={24} />
            </div>
            <p>Prescriptions</p>
            <h2>04</h2>
            <span>Total prescriptions</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <CalendarDays size={24} />
            </div>
            <p>Appointments</p>
            <h2>02</h2>
            <span>Upcoming appointments</span>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <Activity size={24} />
            </div>
            <p>Health Status</p>
            <h2>Good</h2>
            <span>Sample information</span>
          </div>

        </section>

        <section className="dashboard-grid">

          <div className="dashboard-panel">
            <h3>Recent Medical Records</h3>

            <div className="record-item">
              <ClipboardList size={22} />
              <div>
                <strong>Complete Blood Count</strong>
                <p>Laboratory Report · 15 Nov 2026</p>
              </div>
              <span className="status">Available</span>
            </div>

            <div className="record-item">
              <ClipboardList size={22} />
              <div>
                <strong>Blood Glucose Test</strong>
                <p>Laboratory Report · 10 Nov 2026</p>
              </div>
              <span className="status">Available</span>
            </div>

          </div>

          <div className="dashboard-panel">
            <h3>Upcoming Appointments</h3>

            <div className="appointment-item">
              <div className="appointment-icon">
                <CalendarDays size={23} />
              </div>
              <div>
                <strong>General Consultation</strong>
                <p>20 Nov 2026 · 10:30 AM</p>
              </div>
            </div>

            <div className="appointment-item">
              <div className="appointment-icon">
                <Clock size={23} />
              </div>
              <div>
                <strong>Health Checkup</strong>
                <p>25 Nov 2026 · 11:00 AM</p>
              </div>
            </div>

          </div>

        </section>

        <footer className="dashboard-footer">
          © 2026 HealthCare+ | Health Records Management System
        </footer>

      </main>
    </div>
  );
}

export default Dashboard;
