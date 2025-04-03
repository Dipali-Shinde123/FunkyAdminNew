import { TrendingUp, Users, Star, ShoppingBag} from "lucide-react";
import LineChartOne from "../../components/charts/line/LineChartOne";

const DashboardPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue Graph */}
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h5 className="font-semibold text-lg mb-4">Revenue (Stripe & PayPal)</h5>
          <LineChartOne />
        </div>

        {/* App Downloads */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center">
          <Users className="text-blue-500 mr-4" size={36} />
          <div>
            <h6 className="text-gray-600 font-semibold">App Downloads</h6>
            <h4 className="text-xl font-bold">50,234</h4>
          </div>
        </div>

        {/* Total Creators */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center">
          <TrendingUp className="text-green-500 mr-4" size={36} />
          <div>
            <h6 className="text-gray-600 font-semibold">Total Creators</h6>
            <h4 className="text-xl font-bold">4,890</h4>
          </div>
        </div>

        {/* Review Statistics */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center">
          <Star className="text-yellow-500 mr-4" size={36} />
          <div>
            <h6 className="text-gray-600 font-semibold">Review Stats</h6>
            <h4 className="text-xl font-bold">Good: 92% | Bad: 8%</h4>
          </div>
        </div>

        {/* Advertisers Count */}
        <div className="bg-white shadow-lg rounded-xl p-5 flex items-center">
          <ShoppingBag className="text-indigo-500 mr-4" size={36} />
          <div>
            <h6 className="text-gray-600 font-semibold">Total Advertisers</h6>
            <h4 className="text-xl font-bold">1,245</h4>
          </div>
        </div>

        {/* Trending Hashtags */}
        <div className="bg-white shadow-lg rounded-xl p-5">
          <h5 className="font-semibold text-lg mb-3">Trending Hashtags</h5>
          <ul className="text-gray-700 space-y-2">
            <li className="font-semibold">#NewTrend <span className="text-gray-500">(30K Posts)</span></li>
            <li className="font-semibold">#ViralContent <span className="text-gray-500">(50K Posts)</span></li>
            <li className="font-semibold">#TopCreators <span className="text-gray-500">(20K Posts)</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
