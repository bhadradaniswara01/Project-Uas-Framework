import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function Dashboard({ auth, history = [], trends }) {
    // State untuk form input
    const [values, setValues] = useState({
        waktu_cek: 'Pagi', 
        suhu: '',
        ph: '',
        tds: '',
        sisa_pakan: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Menangani perubahan input
    const handleChange = (e) => {
        const { id, value } = e.target;
        setValues(values => ({ ...values, [id]: value }));
    };

    // Menangani submit data
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.post('/water-check', values, {
            onFinish: () => {
                setIsSubmitting(false);
                setValues({ ...values, suhu: '', ph: '', tds: '', sisa_pakan: '' }); 
            }
        });
    };

    // Logika warna badge status AI
    const getStatusStyle = (status) => {
        if (!status) return 'bg-gray-100 text-gray-800';
        if (status.includes('Bahaya') || status.includes('Mematikan')) return 'bg-red-100 text-red-800 border border-red-300';
        if (status.includes('Rendah') || status.includes('Waspada')) return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
        return 'bg-green-100 text-green-800 border border-green-300';
    };

    // Komponen untuk merender AreaChart
    const renderWaterChart = (data, title) => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">{title}</h4>
            {data && data.length > 0 ? (
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSuhu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#ddd" />
                            <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} label={{ value: 'Suhu (°C)', angle: -90, position: 'insideLeft', offset: 10, fill: '#f97316', style: { textAnchor: 'middle', fontSize: '11px' } }} />
                            <YAxis yAxisId="right" orientation="right" fontSize={11} tickLine={false} axisLine={false} domain={[0, 14]} label={{ value: 'pH', angle: 90, position: 'insideRight', offset: 10, fill: '#0ea5e9', style: { textAnchor: 'middle', fontSize: '11px' } }} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Area yAxisId="left" type="monotone" dataKey="Suhu" stroke="#f97316" fillOpacity={1} fill="url(#colorSuhu)" strokeWidth={2} activeDot={{ r: 6 }} />
                            <Area yAxisId="right" type="monotone" dataKey="pH" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorPh)" strokeWidth={2} activeDot={{ r: 6 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex items-center justify-center h-48 text-gray-400 italic bg-gray-50 rounded-lg">Input data harian untuk melihat grafik.</div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between gap-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <img src="/undiksha.png" alt="Logo Undiksha" className="h-16" onError={(e) => e.target.style.display = 'none'} />
                        <div>
                            <h2 className="font-extrabold text-3xl text-gray-950 leading-tight tracking-tight">
                                UNDIKSHA SMART FISHING DASHBOARD
                            </h2>
                            <p className="text-gray-600">Real-time Biofloc System Monitoring</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-right">
                            <p className="font-semibold text-gray-800">Selamat Datang, {auth.user.name}</p>
                            <p className="text-sm text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <img src={`https://ui-avatars.com/api/?name=${auth.user.name}&background=0D9488&color=fff`} className="h-12 w-12 rounded-full border-2 border-teal-100" alt="Avatar" />
                    </div>
                </div>
            }
        >
            <Head title="Smart Fishing Dashboard" />

            <div className="py-8 bg-gray-50/50 min-h-screen">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        
                        {/* --- KIRI: FORM --- */}
                        <div className="space-y-8">
                            <div className="bg-white overflow-hidden shadow-sm rounded-3xl border border-gray-100 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-teal-500 rounded-full"></span> Input Data Kualitas Air
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Pilih Waktu Cek</label>
                                        <select id="waktu_cek" value={values.waktu_cek} onChange={handleChange} className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-teal-500 focus:border-teal-500 transition">
                                            <option value="Pagi">Pagi (08:00)</option>
                                            <option value="Sore">Sore (16:00)</option>
                                        </select>
                                    </div>
                                    {[
                                        { id: 'suhu', label: 'Suhu', unit: '°C', placeholder: '28.5' },
                                        { id: 'ph', label: 'pH Air', unit: '', placeholder: '7.2' },
                                        { id: 'tds', label: 'TDS', unit: 'ppm', placeholder: '1000' },
                                        { id: 'sisa_pakan', label: 'Sisa Pakan', unit: 'gram', placeholder: '50' }
                                    ].map(field => (
                                        <div key={field.id}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label} {field.unit && `(${field.unit})`}</label>
                                            <div className="relative">
                                                <input type="number" step="0.1" id={field.id} required value={values[field.id]} onChange={handleChange} className="w-full border-gray-200 rounded-xl shadow-sm focus:ring-teal-500 focus:border-teal-500 pl-4 pr-12 transition" placeholder={`Contoh: ${field.placeholder}`} />
                                                {field.unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">{field.unit}</span>}
                                            </div>
                                        </div>
                                    ))}
                                    <button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl transition duration-150 shadow-lg shadow-teal-500/20 active:scale-[0.98]">
                                        {isSubmitting ? 'Menganalisis AI...' : 'SIMPAN & ANALISIS DATA'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* --- KANAN: GRAFIK & TABEL --- */}
                        <div className="md:col-span-3 space-y-8">
                            
                            <div className="bg-white overflow-hidden shadow-sm rounded-3xl border border-gray-100 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Tren Parameter Air
                                </h3>
                                
                                {renderWaterChart(trends?.daily || [], 'Tren Harian (Last Data)')}

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                                    {renderWaterChart(trends?.weekly || [], 'Tren Mingguan (Last 7 Days)')}
                                    {renderWaterChart(trends?.monthly || [], 'Tren Bulanan (Last 30 Days)')}
                                </div>
                            </div>

                            {/* TABEL RIWAYAT YANG SUDAH DIREVISI MENJADI RAPI & TIDAK KEPOTONG */}
                            <div className="bg-white overflow-hidden shadow-sm rounded-3xl border border-gray-100 p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <span className="w-2 h-6 bg-amber-500 rounded-full"></span> Riwayat Pengecekan Lengkap
                                    </h3>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusStyle(history[0]?.status)}`}>
                                        Status Terbaru: {history[0]?.status || 'Belum Ada'}
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left text-sm table-fixed">
                                        <thead className="uppercase tracking-wider border-b border-gray-100 text-gray-600 bg-gray-50/50 rounded-t-lg">
                                            <tr>
                                                <th className="px-5 py-4 w-[15%]">Waktu</th>
                                                <th className="px-5 py-4 w-[25%]">Parameter Air</th>
                                                <th className="px-5 py-4 text-center w-[15%]">Status AI</th>
                                                <th className="px-5 py-4 w-[45%]">Analisis & Rekomendasi Tindakan AI</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 vertical-align-middle">
                                            {history.length > 0 ? history.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-5 py-4 text-gray-700 font-semibold align-middle">
                                                        {item.waktu_cek}
                                                    </td>
                                                    <td className="px-5 py-4 text-gray-600 font-mono text-xs align-middle">
                                                        <div className="grid grid-cols-2 gap-1">
                                                            <span>Suhu: <b>{item.suhu}°C</b></span>
                                                            <span>pH: <b>{item.ph}</b></span>
                                                            <span>TDS: <b>{item.tds} ppm</b></span>
                                                            <span>Pakan: <b>{item.sisa_pakan} g</b></span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 text-center align-middle">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getStatusStyle(item.status)}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    {/* REVISI UTAMA: Kolom dibuat whitespace-normal agar teks membungkus otomatis ke bawah */}
                                                    <td className="px-5 py-4 text-gray-600 whitespace-normal align-middle">
                                                        <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100/70">
                                                            <p className="text-xs text-gray-400 font-medium uppercase mb-0.5">Saran Sistem:</p>
                                                            <p className="text-gray-700 text-xs leading-relaxed">{item.rekomendasi}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="4" className="px-5 py-12 text-center text-gray-400 italic">
                                                        Belum ada data riwayat pengecekan.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}