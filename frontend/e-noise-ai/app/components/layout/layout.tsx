import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-3">
          <li className="text-gray-700 hover:text-black cursor-pointer">Home</li>
          <li className="text-gray-700 hover:text-black cursor-pointer">Monitoring</li>
          <li className="text-gray-700 hover:text-black cursor-pointer">Settings</li>
        </ul>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between">
          <h1 className="text-xl font-semibold">Welcome 👋</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
