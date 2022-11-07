import React from 'react';

const SideBar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">
                    SB Admin <sup>2</sup>
                </div>
            </a>
            <hr className="sidebar-divider my-0"></hr>
            <li className="nav-item active">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <hr className="sidebar-divider"></hr>
            <li className="nav-item">
                <a className="nav-link" href="/list-student">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Quản lý học sinh</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="/list-user">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Quản lý giảng viên</span>
                </a>
            </li>

            <hr className="sidebar-divider d-none d-md-block"></hr>

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    );
};

export default SideBar;
