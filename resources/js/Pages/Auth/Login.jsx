import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center p-6 relative overflow-hidden">
            <Head title="Log in - Smart Fishing" />

            {/* Tombol Kembali di Pojok Kiri Atas Layar */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-12 z-20">
                <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition bg-white/80 px-4 py-2 rounded-xl border border-slate-200/60 shadow-sm backdrop-blur-sm">
                    <span className="mr-2">←</span> Kembali ke Beranda
                </Link>
            </div>

            {/* Hiasan Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/70 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-100/70 rounded-full mix-blend-multiply filter blur-[100px] opacity-70"></div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/60 p-8 sm:p-10 relative z-10">
                <div className="text-center mb-8">
                    <img src="/images/Logo_undiksha.png" alt="Logo" className="h-14 mx-auto mb-4 drop-shadow-sm" />
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Selamat Datang Kembali</h2>
                    <p className="text-sm text-slate-500 mt-2 font-light">Sistem Cerdas Living Lab Bioflok</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">{status}</div>}
                
                {errors.email && <div className="mb-4 font-medium text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-center">{errors.email}</div>}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email Undiksha</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-sm"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
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
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-slate-300 text-blue-600 shadow-sm focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-slate-600">Ingat saya</span>
                        </label>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 disabled:opacity-70"
                        >
                            Log in
                        </button>
                    </div>

                    <p className="text-center text-sm text-slate-600 mt-6">
                        Belum tergabung dalam riset?{' '}
                        <Link href={route('register')} className="text-blue-600 font-bold hover:underline">
                            Daftar di sini
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}