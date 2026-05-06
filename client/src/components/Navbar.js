import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar(){
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  const logout = ()=>{
    localStorage.removeItem("token");
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Leads", path: "/leads" }
  ];

  return(
    <div className="bg-[#0a192f] text-white px-6 flex justify-between items-center shadow-lg border-b border-gray-800 h-16">

      {/* Logo & Links */}
      <div className="flex items-center h-full gap-8">
        <div className="flex items-center gap-2">
          {/* If you want an image logo, replace this SVG with <img src="/logo.png" alt="Nexus CRM Logo" className="w-8 h-8" /> */}
          <div className="bg-blue-600 text-white p-1 rounded">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <h1 className="text-lg font-bold tracking-wide m-0">Nexus</h1>
            <h1 className="text-lg font-bold tracking-wide m-0">CRM</h1>
          </div>
        </div>

        {!isLoginPage && (
          <nav className="hidden md:flex h-full ml-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/dashboard' && location.pathname === '/');
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-sm font-medium px-4 flex items-center border-b-2 transition-colors h-full ${
                    isActive 
                      ? "border-blue-500 text-white" 
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Actions */}
      {!isLoginPage && (
        <div className="flex items-center gap-4 h-full">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-1.5 text-sm font-medium rounded hover:bg-red-700 transition duration-150"
          >
            Logout
          </button>
        </div>
      )}

    </div>
  );
}

export default Navbar;