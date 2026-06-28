import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Smart Fishing" />
            
            {/* Wrapper Utama dengan Nuansa Cerah Biru-Putih (bg-slate-50) */}
            <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative overflow-hidden flex flex-col justify-between">
                
                {/* Hiasan Latar Belakang (Aksen Bulat Biru Lembut / Soft Blobs) */}
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/70 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-sky-100/70 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>

                {/* NAVBAR (Cerah & Bersih) */}
                <nav className="relative z-10 flex justify-between items-center px-6 py-5 sm:px-12 border-b border-slate-200/60 bg-white/60 backdrop-blur-md">
                    {/* Kiri: Tombol Akses Akun */}
                    <div>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition">
                                Dashboard →
                            </Link>
                        ) : (
                            <div className="space-x-4 flex items-center">
                                <Link href={route('login')} className="text-slate-600 hover:text-blue-600 font-semibold transition text-sm sm:text-base">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 text-sm sm:text-base">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Kanan: Identitas Kampus & Logo Undiksha */}
                    <div className="flex items-center space-x-3">
                        <div className="text-right hidden sm:block">
                            <h2 className="text-blue-900 font-black text-lg tracking-wider leading-tight">UNDIKSHA</h2>
                            <p className="text-blue-600 text-xs font-bold tracking-wide">Living Lab Bioflok</p>
                        </div>
                        <img src="/images/Logo_undiksha.png" alt="Logo Undiksha" className="h-12 w-auto drop-shadow-md" />
                    </div>
                </nav>

                {/* HERO SECTION (Konten Tengah Berbentuk Grid dengan Tema Cerah) */}
                <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
                    
                    {/* Hero Kiri: Judul Utama & Deskripsi */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Font diubah menjadi gaya dashboard/teknologi yang lebih rapi */}
                        <div className="inline-block bg-blue-50 text-blue-600 border border-blue-200/60 px-4 py-1.5 rounded-md text-[11px] font-mono font-bold tracking-[0.2em] uppercase shadow-sm">
                            ⚡ Early Warning System
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-slate-800">
                            Make a <span className="text-blue-600">Difference</span> <br /> with us
                        </h1>
                        
                        {/* Teks diatur menjadi rata kiri-kanan (text-justify) */}
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light max-w-md text-justify">
                            Platform cerdas untuk memantau kualitas air kolam Bioflok. 
                            Dilengkapi dengan <strong className="text-slate-900 font-semibold">Artificial Intelligence</strong> untuk mendeteksi tingkat bahaya amonia dan memberikan rekomendasi perawatan secara *real-time*.
                        </p>

                        {/* Tombol Aksi Utama (Hanya Menyisakan Tombol Akses Utama) */}
                        <div className="pt-2">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/20">
                                    Masuk ke Dashboard
                                </Link>
                            ) : (
                                <Link href={route('login')} className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/20">
                                    Mulai Pengecekan Air
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Hero Kanan: Grid Kolase Foto */}
                    <div className="lg:col-span-7 grid grid-cols-12 gap-4 h-[350px] sm:h-[480px]">
                        {/* Foto Kiri Atas */}
                        <div className="col-span-8 bg-white border border-slate-200/60 rounded-2xl overflow-hidden relative group shadow-md">
                            <img src="/images/kolam_bioflog.jpeg" alt="Kolam Bioflok" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" onError={(e)=>{e.target.style.display='none'}} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-transparent to-transparent opacity-60"></div>
                        </div>
                        
                        {/* Foto Kanan Atas */}
                        <div className="col-span-4 bg-white border border-slate-200/60 rounded-2xl overflow-hidden relative group shadow-md">
                            <img src="/images/kolam_bioflog1.jpeg" alt="Aktivitas Bioflok" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" onError={(e)=>{e.target.style.display='none'}} />
                        </div>

                        {/* Foto Kiri Bawah */}
                        <div className="col-span-4 bg-white border border-slate-200/60 rounded-2xl overflow-hidden relative group shadow-md">
                            <img src="/images/ikan_nila1.jpg" alt="Perangkat Sensor" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" onError={(e)=>{e.target.style.display='none'}} />
                        </div>

                        {/* Foto Kanan Bawah */}
                        <div className="col-span-8 bg-white border border-slate-200/60 rounded-2xl overflow-hidden relative group shadow-md">
                            <img src="/images/foto_mahasiswa.jpg" alt="Analisis Data Mining" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500" onError={(e)=>{e.target.style.display='none'}} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>

                </main>

                {/* 3-COLUMN FEATURE SECTION (Gaya Minimalis Biru-Putih) */}
                <section id="fitur" className="relative z-10 w-full grid grid-cols-1 md:grid-cols-3 border-t border-slate-200">
                    
                    {/* Kolom 1 */}
                    <div className="bg-white p-8 lg:p-12 border-b md:border-b-0 md:border-r border-slate-200 hover:bg-blue-50/30 transition duration-300">
                        <h3 className="text-xl font-bold mb-3 text-slate-800">Pengecekan Air Pagi/Sore</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-light text-justify">
                            Monitor parameter krusial seperti suhu, pH, TDS, sisa pakan, dan status air harian kolam Bioflok secara terstruktur.
                        </p>
                    </div>

                    {/* Kolom 2 */}
                    <div className="bg-blue-600 p-8 lg:p-12 text-white hover:bg-blue-700 transition duration-300 shadow-inner">
                        <h3 className="text-xl font-black mb-3">Analisis AI Bahaya Air</h3>
                        <p className="text-white/90 text-sm leading-relaxed font-medium text-justify">
                            Algoritma Data Mining tertanam langsung untuk memprediksi status air instan (Aman, Waspada, Bahaya) beserta rekomendasi kuras.
                        </p>
                    </div>

                    {/* Kolom 3 */}
                    <div className="bg-slate-100/60 p-8 lg:p-12 hover:bg-blue-50/30 transition duration-300">
                        <h3 className="text-xl font-bold mb-3 text-slate-800">Laporan Kinerja Mahasiswa</h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-light text-justify">
                            Pelacakan tindakan mahasiswa, nama pemeriksa, serta perkembangan grafik mingguan untuk keperluan riset akademis Undiksha.
                        </p>
                    </div>

                </section>

                {/* FOOTER */}
                <footer className="w-full text-center py-4 bg-white text-xs text-slate-400 border-t border-slate-200 relative z-10">
                    &copy; 2026 Kelompok Data Mining - Universitas Pendidikan Ganesha
                </footer>

            </div>
        </>
    );
}