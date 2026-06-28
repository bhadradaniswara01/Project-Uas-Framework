import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nim: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center p-6 relative overflow-hidden">
            <Head title="Register - Smart Fishing" />

            {/* Tombol Kembali di Pojok Kiri Atas Layar */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-12 z-20">
                <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition bg-white/80 px-4 py-2 rounded-xl border border-slate-200/60 shadow-sm backdrop-blur-sm">
                    <span className="mr-2">←</span> Kembali ke Beranda
                </Link>
            </div>

            {/* Hiasan Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/70 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-100/70 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8 sm:p-10 relative z-10 mt-12 sm:mt-0">
                <div className="text-center mb-8">
                    <img src="/images/Logo_undiksha.png" alt="Logo" className="h-14 mx-auto mb-4 drop-shadow-sm" />
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Daftar Peneliti</h2>
                    <p className="text-sm text-slate-500 mt-2 font-light">Gunakan email <strong className="text-blue-600">@undiksha.ac.id</strong>. Akun perlu persetujuan Admin sebelum dapat digunakan.</p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-sm"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">NIM (Nomor Induk Mahasiswa)</label>
                        <input
                            type="number"
                            name="nim"
                            value={data.nim}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-sm"
                            onChange={(e) => setData('nim', e.target.value)}
                            required
                        />
                        <span className="text-red-500 text-xs mt-1 block">{errors.nim}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email Undiksha</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="nama@undiksha.ac.id"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-sm"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-sm"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Konfirmasi Password</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-sm"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <span className="text-red-500 text-xs mt-1 block">{errors.password_confirmation}</span>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 disabled:opacity-70"
                        >
                            Ajukan Pendaftaran
                        </button>
                    </div>

                    <p className="text-center text-sm text-slate-600 mt-6">
                        Sudah punya akun yang disetujui?{' '}
                        <Link href={route('login')} className="text-blue-600 font-bold hover:underline">
                            Log in di sini
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}