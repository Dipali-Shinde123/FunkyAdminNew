import { useState, useEffect } from 'react';
import { Sun, Moon, TrendingUp, Users, Star, ShoppingBag } from 'lucide-react';
import LineChartOne from '../../components/charts/line/LineChartOne';

const DashboardPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
   
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
     
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5">
          <h5 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">Revenue (Stripe & PayPal)</h5>
          <LineChartOne />
        </div>

      
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex items-center">
          <Users className="text-blue-500 mr-4" size={36} />
          <div>
            <h6 className="text-gray-600 dark:text-gray-300 font-semibold">App Downloads</h6>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">50,234</h4>
          </div>
        </div>

        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex items-center">
          <TrendingUp className="text-green-500 mr-4" size={36} />
          <div>
            <h6 className="text-gray-600 dark:text-gray-300 font-semibold">Total Creators</h6>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">4,890</h4>
          </div>
        </div>

      
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex items-center">
          <Star className="text-yellow-500 mr-4" size={36} />
          <div>
            <h6 className="text-gray-600 dark:text-gray-300 font-semibold">Review Stats</h6>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">Good: 92% | Bad: 8%</h4>
          </div>
        </div>

      
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex items-center">
          <ShoppingBag className="text-indigo-500 mr-4" size={36} />
          <div>
            <h6 className="text-gray-600 dark:text-gray-300 font-semibold">Total Advertisers</h6>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">1,245</h4>
          </div>
        </div>

      
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5">
          <h5 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">Trending Hashtags</h5>
          <ul className="text-gray-700 dark:text-gray-300 space-y-2">
            <li className="font-semibold">#NewTrend <span className="text-gray-500 dark:text-gray-400">(30K Posts)</span></li>
            <li className="font-semibold">#ViralContent <span className="text-gray-500 dark:text-gray-400">(50K Posts)</span></li>
            <li className="font-semibold">#TopCreators <span className="text-gray-500 dark:text-gray-400">(20K Posts)</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
