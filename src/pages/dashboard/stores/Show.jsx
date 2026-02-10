import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowRight, Store, Edit, Trash2, Globe, MapPin, Phone, Mail,
  Package, ShoppingBag, Users, TrendingUp, DollarSign, Calendar,
  CheckCircle, XCircle, Clock, AlertCircle, ChevronRight, ExternalLink,
  Copy, Check, BarChart3, Settings, QrCode, Share2, Download
} from 'lucide-react';

const Show = () => {
  const { t } = useTranslation('storeShow');
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchStoreData();
  }, [id]);

  const fetchStoreData = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/stores/${id}`);
      // const data = await response.json();
      
      // Simulated data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStore({
        id: id,
        name: 'متجر إيفرلين',
        domain: 'everlane-clone',
        location: 'Algiers',
        phone: '0555123456',
        email: 'contact@everlane.dz',
        address: '123 شارع الحرية، الجزائر العاصمة',
        description: 'متجر إلكتروني متخصص في الأزياء العصرية والمستدامة',
        logo: null,
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        niche: 'fashion',
        status: 'active',
        createdAt: '2024-01-15',
        stats: {
          totalOrders: 156,
          totalRevenue: 2450000,
          totalProducts: 48,
          totalCustomers: 89
        },
        recentOrders: [
          { id: 'ORD-001', customer: 'أحمد محمد', amount: 15000, status: 'completed', date: '2024-02-05' },
          { id: 'ORD-002', customer: 'فاطمة علي', amount: 8500, status: 'pending', date: '2024-02-04' },
          { id: 'ORD-003', customer: 'كريم بن علي', amount: 22000, status: 'processing', date: '2024-02-03' }
        ],
        settings: {
          currency: 'DZD',
          language: 'ar',
          cashOnDelivery: true,
          onlinePayment: false
        }
      });
    } catch (error) {
      console.error('Error fetching store:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${store.domain}.mdstore.dz`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard/stores');
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
      inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
      suspended: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'
    };
    
    const icons = {
      active: <CheckCircle size={14} />,
      inactive: <XCircle size={14} />,
      suspended: <AlertCircle size={14} />
    };

    return (
      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
        {icons[status]}
        {t(`status.${status}`)}
      </span>
    );
  };

  const getOrderStatusBadge = (status) => {
    const styles = {
      completed: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      processing: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-rose-100 text-rose-700'
    };

    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${styles[status]}`}>
        {t(`orderStatus.${status}`)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Store size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('notFound.title')}</h2>
          <p className="text-gray-500 mb-6">{t('notFound.subtitle')}</p>
          <button
            onClick={() => navigate('/dashboard/stores')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            {t('notFound.back')}
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: t('tabs.overview'), icon: BarChart3 },
    { id: 'orders', label: t('tabs.orders'), icon: ShoppingBag },
    { id: 'products', label: t('tabs.products'), icon: Package },
    { id: 'settings', label: t('tabs.settings'), icon: Settings }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 px-4">
      
      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-rose-600" />
            </div>
            <h3 className="text-xl font-black text-center mb-2">{t('deleteModal.title')}</h3>
            <p className="text-gray-500 text-center mb-6">{t('deleteModal.subtitle')}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-zinc-800 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                {t('deleteModal.cancel')}
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 transition-colors"
              >
                {t('deleteModal.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/stores')}
            className="p-2.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl hover:scale-105 transition-all shadow-sm"
          >
            <ArrowRight className={document.dir === 'rtl' ? '' : 'rotate-180'} size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">{store.name}</h1>
              {getStatusBadge(store.status)}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Globe size={14} />
              <span className="font-mono">{store.domain}.mdstore.dz</span>
              <button
                onClick={handleCopyUrl}
                className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://${store.domain}.mdstore.dz`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl font-bold text-sm hover:scale-105 transition-all"
          >
            <ExternalLink size={16} />
            {t('actions.visit')}
          </a>
          <Link
            to={`/dashboard/stores/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all hover:scale-105"
          >
            <Edit size={16} />
            {t('actions.edit')}
          </Link>
          <button
            onClick={() => setDeleteModal(true)}
            className="p-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
              <ShoppingBag size={20} className="text-indigo-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase">{t('stats.orders')}</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">{store.stats.totalOrders}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
              <DollarSign size={20} className="text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase">{t('stats.revenue')}</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">
            {store.stats.totalRevenue.toLocaleString()} {t('currency')}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
              <Package size={20} className="text-amber-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase">{t('stats.products')}</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">{store.stats.totalProducts}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
              <Users size={20} className="text-rose-600" />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase">{t('stats.customers')}</span>
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white">{store.stats.totalCustomers}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-100 dark:border-zinc-800 hover:border-indigo-200'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Recent Orders */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                  <h3 className="font-black text-lg">{t('recentOrders.title')}</h3>
                  <Link
                    to={`/dashboard/stores/${id}/orders`}
                    className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    {t('recentOrders.viewAll')}
                    <ChevronRight size={16} className={document.dir === 'rtl' ? 'rotate-180' : ''} />
                  </Link>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {store.recentOrders.map((order) => (
                    <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-gray-500">
                          {order.id}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{order.customer}</p>
                          <p className="text-xs text-gray-400">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {order.amount.toLocaleString()} {t('currency')}
                        </span>
                        {getOrderStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
                <h3 className="font-black text-lg mb-6">{t('performance.title')}</h3>
                <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp size={48} className="text-indigo-300 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">{t('performance.comingSoon')}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-zinc-900 p-12 rounded-3xl border border-gray-100 dark:border-zinc-800 text-center">
              <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="font-black text-lg mb-2">{t('orders.fullList')}</h3>
              <p className="text-gray-500">{t('orders.redirect')}</p>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white dark:bg-zinc-900 p-12 rounded-3xl border border-gray-100 dark:border-zinc-800 text-center">
              <Package size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="font-black text-lg mb-2">{t('products.manage')}</h3>
              <p className="text-gray-500">{t('products.redirect')}</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 space-y-6">
              <h3 className="font-black text-lg">{t('settings.title')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t('settings.currency')}</p>
                  <p className="font-bold text-gray-900 dark:text-white">{store.settings.currency}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t('settings.language')}</p>
                  <p className="font-bold text-gray-900 dark:text-white">{store.settings.language}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t('settings.cashOnDelivery')}</p>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {store.settings.cashOnDelivery ? t('common.yes') : t('common.no')}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">{t('settings.onlinePayment')}</p>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {store.settings.onlinePayment ? t('common.yes') : t('common.no')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Store Info */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
            <h3 className="font-black text-lg mb-4">{t('sidebar.info.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">{t('sidebar.info.location')}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{store.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">{t('sidebar.info.phone')}</p>
                  <p className="font-medium text-gray-900 dark:text-white" dir="ltr">{store.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">{t('sidebar.info.email')}</p>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{store.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">{t('sidebar.info.created')}</p>
                  <p className="font-medium text-gray-900 dark:text-white">{store.createdAt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
            <h3 className="font-black text-lg mb-4">{t('sidebar.actions.title')}</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-left">
                <QrCode size={18} className="text-indigo-600" />
                <span className="font-bold text-sm">{t('sidebar.actions.qrCode')}</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-left">
                <Share2 size={18} className="text-indigo-600" />
                <span className="font-bold text-sm">{t('sidebar.actions.share')}</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-left">
                <Download size={18} className="text-indigo-600" />
                <span className="font-bold text-sm">{t('sidebar.actions.export')}</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800">
            <h3 className="font-black text-lg mb-3">{t('sidebar.description')}</h3>
            <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
              {store.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Show;