import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { 
    BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function AdminDashboard({ auth, stats, usersList = [], activityTrend, globalTrends }) {
    const { flash } = usePage().props;
    const [isProcessing, setIsProcessing] = useState(false);

    // Fungsi Setujui Akun
    const handleApprove = (id) => {
        if (confirm('Konfirmasi persetujuan akses mahasiswa ini?')) {
            setIsProcessing(true);
            router.patch(`/admin/users/${id}/approve`, {}, {
                onFinish: () => setIsProcessing(false)
            });
        }
    };

    // Fungsi Hapus Akun
    const handleDelete = (id) => {
        if (confirm('PERINGATAN: Hapus akun mahasiswa ini secara permanen?')) {
            setIsProcessing(true);
            router.delete(`/admin/users/${id}`, {
                onFinish: () => setIsProcessing(false)
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between gap-6 p-1">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-2 rounded-xl">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div>
                            <h2 className="font-extrabold text-2xl text-gray-900 tracking-tight">
                                Administrator Workspace
                            </h2>
                            <p className="text-sm font-medium text-gray-500">Pusat Kendali Sistem Smart Biofloc</p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-8 bg-slate-50 min-h-screen font-sans">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Notifikasi Pesan Sukses */}
                    {flash?.message && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
                            <p className="text-sm font-bold text-green-800">{flash.message}</p>
                        </div>
                    )}

                    {/* --- PANEL UTAMA (NUANSA BIRU KELAS ATAS) --- */}
                    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-5 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-400 opacity-10 blur-2xl"></div>
                        
                        <div className="p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                                    Panel Kontrol Utama
                                </h1>
                                <p className="text-blue-100 font-medium text-lg">
                                    Pantau aktivitas mahasiswa dan stabilitas parameter air secara real-time.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-right">
                                <p className="text-blue-50 text-sm font-semibold uppercase tracking-wider mb-1">Status Sistem</p>
                                <div className="flex items-center gap-2 text-white font-bold text-lg">
                                    <span className="relative flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    Online & Aktif
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- STAT CARD (DESAIN MINIMALIS & KEREN) --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>
                            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Mahasiswa Terdaftar</p>
                                <h3 className="text-4xl font-black text-gray-900">{stats?.totalUsers || 0} <span className="text-lg font-medium text-gray-400">Pengguna</span></h3>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 group-hover:bg-indigo-600 transition-colors"></div>
                            <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Seluruh Pengetesan</p>
                                <h3 className="text-4xl font-black text-gray-900">{stats?.totalChecks || 0} <span className="text-lg font-medium text-gray-400">Data</span></h3>
                            </div>
                        </div>
                    </div>

                    {/* --- GRAFIK SECTION --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Grafik Aktivitas (Bar) */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Frekuensi Tes
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={activityTrend || []}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} />
                                        <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} allowDecimals={false} />
                                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                        <Bar dataKey="Jumlah_Tes" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Grafik Parameter Air (Area) */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-indigo-500 rounded-full"></span> Tren Rata-rata Parameter Air
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={globalTrends || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAdminSuhu" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorAdminPh" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} />
                                        <YAxis yAxisId="left" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} />
                                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} />
                                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                        <Area yAxisId="left" type="monotone" dataKey="Suhu" stroke="#f97316" fill="url(#colorAdminSuhu)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: '#f97316' }} />
                                        <Area yAxisId="right" type="monotone" dataKey="pH" stroke="#6366f1" fill="url(#colorAdminPh)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: '#6366f1' }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* --- TABEL MANAJEMEN MAHASISWA (TANPA EMOJI, LEBIH PRO) --- */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-2 h-6 bg-slate-800 rounded-full"></span> Manajemen Akun Mahasiswa
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Informasi Mahasiswa</th>
                                        <th className="px-6 py-4 text-center">Kontribusi Tes</th>
                                        <th className="px-6 py-4 text-center">Status Akses</th>
                                        <th className="px-6 py-4 text-right">Tindakan Sistem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {usersList.length > 0 ? (
                                        usersList.map((user) => (
                                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-200">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">{user.name}</p>
                                                            <p className="text-xs text-gray-500">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
                                                        {user.water_checks_count} Data Masuk
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {user.is_approved ? (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 font-bold text-xs border border-green-200">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                                            Terverifikasi
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-xs border border-amber-200">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                            Menunggu
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {!user.is_approved && (
                                                            <button 
                                                                onClick={() => handleApprove(user.id)}
                                                                disabled={isProcessing}
                                                                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50"
                                                            >
                                                                Setujui Akses
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={() => handleDelete(user.id)}
                                                            disabled={isProcessing}
                                                            className="px-4 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50"
                                                        >
                                                            Hapus Akun
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-medium bg-slate-50/50">
                                                Belum ada data mahasiswa yang mendaftar.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}