import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between h-screen fixed"> 
        {/* Top Section */}
        <div>
          <h1 className="text-2xl font-bold mb-6">CRM</h1>

          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/leads"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Leads
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="w-full bg-red-500 p-2 rounded hover:bg-red-600 transition hover:scale-105"
          >
            Logout
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 ml-64 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}

export default Layout;