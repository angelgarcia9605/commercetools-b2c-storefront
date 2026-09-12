'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AccountTab {
  id: string;
  label: string;
}

const accountTabs: AccountTab[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'Orders' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'settings', label: 'Settings' },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      // Simulate login
      if (email && password) {
        setIsLoggedIn(true);
      }
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">Account</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary hover:bg-accent text-white font-bold py-2 rounded-lg transition"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-secondary hover:text-accent font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {accountTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-6 py-4 font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-secondary text-white'
                    : 'text-primary hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => setIsLoggedIn(false)}
              className="w-full text-left px-6 py-4 font-semibold text-red-600 hover:bg-red-50 transition border-t"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>

                  <button className="w-full bg-secondary hover:bg-accent text-white font-bold py-2 rounded-lg transition">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Order History</h2>
                <div className="text-center py-8">
                  <p className="text-gray-600">No orders yet</p>
                  <Link
                    href="/products"
                    className="inline-block mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Saved Addresses</h2>
                <div className="text-center py-8">
                  <p className="text-gray-600">No saved addresses</p>
                  <button className="inline-block mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition">
                    Add Address
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Password</h3>
                    <button className="px-6 py-2 border border-secondary text-secondary hover:bg-gray-50 font-semibold rounded-lg transition">
                      Change Password
                    </button>
                  </div>

                  <div className="border-b pb-6">
                    <h3 className="text-lg font-semibold text-primary mb-4">Email Preferences</h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-gray-700">Receive promotional emails</span>
                    </label>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-4">Account Deletion</h3>
                    <button className="px-6 py-2 border border-red-500 text-red-600 hover:bg-red-50 font-semibold rounded-lg transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
