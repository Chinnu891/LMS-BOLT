import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Download, 
  Filter,
  Calendar,
  Eye,
  RefreshCw,
  DollarSign
} from 'lucide-react';

export default function AdminPaymentsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [statusFilter, setStatusFilter] = useState('all');

  const paymentStats = {
    totalRevenue: 2845000,
    totalTransactions: 1247,
    avgTransactionValue: 2280,
    refunds: 12,
    pendingPayments: 8,
    successRate: 96.8
  };

  const recentPayments = [
    {
      id: 'pay_001',
      orderId: 'order_M1N2O3P4Q5',
      paymentId: 'pay_M1N2O3P4Q5R6',
      student: 'Priya Sharma',
      course: 'Complete Web Development Bootcamp',
      amount: 2999,
      status: 'success',
      method: 'UPI',
      timestamp: '2024-02-15 14:30:25',
      razorpaySignature: 'verified'
    },
    {
      id: 'pay_002',
      orderId: 'order_A1B2C3D4E5',
      paymentId: 'pay_A1B2C3D4E5F6',
      student: 'Arjun Kumar',
      course: 'Python for Data Science',
      amount: 3499,
      status: 'success',
      method: 'Card',
      timestamp: '2024-02-15 12:15:10',
      razorpaySignature: 'verified'
    },
    {
      id: 'pay_003',
      orderId: 'order_X1Y2Z3A4B5',
      paymentId: null,
      student: 'Sneha Reddy',
      course: 'React Native Development',
      amount: 4999,
      status: 'failed',
      method: 'NetBanking',
      timestamp: '2024-02-15 10:45:33',
      razorpaySignature: null
    },
    {
      id: 'pay_004',
      orderId: 'order_P1Q2R3S4T5',
      paymentId: 'pay_P1Q2R3S4T5U6',
      student: 'Rahul Gupta',
      course: 'DevOps with Docker',
      amount: 5999,
      status: 'pending',
      method: 'UPI',
      timestamp: '2024-02-15 09:20:15',
      razorpaySignature: 'pending'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Success</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'failed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Failed</span>;
      case 'refunded':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Refunded</span>;
      default:
        return null;
    }
  };

  const exportData = () => {
    alert('Exporting payment data...');
  };

  const filteredPayments = recentPayments.filter(payment => {
    if (statusFilter === 'all') return true;
    return payment.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
            <p className="text-gray-600">Monitor transactions and revenue analytics</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportData}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Sync Razorpay</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₹{(paymentStats.totalRevenue / 100000).toFixed(1)}L</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">{paymentStats.totalTransactions}</div>
            <div className="text-sm text-gray-600">Transactions</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">₹{paymentStats.avgTransactionValue}</div>
            <div className="text-sm text-gray-600">Avg Order</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-green-600">{paymentStats.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-orange-600">{paymentStats.refunds}</div>
            <div className="text-sm text-gray-600">Refunds</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-2xl font-bold text-yellow-600">{paymentStats.pendingPayments}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 3 Months</option>
              <option value="365">Last Year</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>

            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <span className="text-sm text-gray-600">Showing {filteredPayments.length} transactions</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.orderId}</div>
                        {payment.paymentId && (
                          <div className="text-xs text-gray-500 font-mono">{payment.paymentId}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.student}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{payment.course}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{payment.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.timestamp.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500">{payment.timestamp.split(' ')[1]}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-700" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        {payment.status === 'success' && (
                          <button className="p-1 text-orange-600 hover:text-orange-700" title="Refund">
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Last {selectedPeriod} days</span>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Revenue trends and analytics</p>
              <p className="text-sm text-gray-500">Chart.js integration recommended</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}