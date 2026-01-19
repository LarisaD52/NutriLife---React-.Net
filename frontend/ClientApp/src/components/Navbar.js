import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); //pentru a sti in ce pagina suntem 

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    // Funcție pentru a evidenția butonul paginii active
    const activeStyle = (path) => 
        location.pathname === path 
        ? "btn btn-secondary shadow-sm mx-1 px-3 fw-bold" 
        : "btn btn-outline-light border-0 mx-1 px-3";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4 py-3">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <span className="me-2" style={{ fontSize: '1.5rem' }}>🌿</span> NutriLife Admin
                </Link>
                
                <div className="collapse navbar-collapse d-flex justify-content-between">
                    {/* Grupul de butoane principale */}
                    <div className="navbar-nav d-flex align-items-center ms-5 gap-2">
                        
                        <Link className={activeStyle("/")} to="/">
                            Dashboard
                        </Link>

                        <Link className={activeStyle("/members")} to="/members">
                            Pacienți
                        </Link>

                        {/* Butonul ADAUGĂ - Evidențiat special cu verde */}
                        <Link 
                            className="btn btn-success fw-bold px-3 ms-3 shadow-sm d-flex align-items-center" 
                            to="/members/add"
                            style={{ borderRadius: '8px', transition: '0.3s' }}
                        >
                           <span className="me-1" style={{ fontSize: '1.2rem' }}>+</span> Adaugă Pacient
                        </Link>
                    </div>
                    
                    {/* Butonul de Logout */}
                    <div className="navbar-nav">
                        <button 
                            className="btn btn-outline-danger btn-sm px-4 fw-bold" 
                            onClick={handleLogout}
                            style={{ borderRadius: '6px' }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;