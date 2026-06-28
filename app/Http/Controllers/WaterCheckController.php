<?php

namespace App\Http\Controllers;

use App\Models\WaterCheck;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http; // Wajib ada untuk nembak API Python
use Carbon\Carbon; // WAJIB DITAMBAHKAN untuk filter tanggal (Mingguan & Bulanan)

class WaterCheckController extends Controller
{
    public function index()
    {
        // =======================================================
        // TAMBAHAN: AUTO-REDIRECT UNTUK ADMIN
        // Jika yang login adalah admin, langsung lempar ke halaman admin!
        // =======================================================
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        // 1. Menampilkan data riwayat pengecekan (kita ambil 20 data terakhir)
        $history = auth()->user()->waterChecks()->latest()->take(20)->get();
        
        // 2. Siapkan data untuk TREN GRAFIK berdasarkan data user yang login
        $trends = [
            // Tren Harian: Mengambil 10 pengecekan terakhir
            'daily' => auth()->user()->waterChecks()->latest()->take(10)->get()->reverse()->map(function($item) {
                return [
                    'name' => $item->waktu_cek, // Pagi/Sore
                    'Suhu' => (float) $item->suhu,
                    'pH' => (float) $item->ph,
                ];
            })->values(),

            // Tren Mingguan: Mengambil data 7 hari terakhir
            'weekly' => auth()->user()->waterChecks()
                ->where('created_at', '>=', Carbon::now()->subDays(7))
                ->latest()->take(14)->get()->reverse()->map(function($item) {
                return [
                    'name' => $item->created_at->translatedFormat('l'), // Nama hari (Senin, Selasa, dll)
                    'Suhu' => (float) $item->suhu,
                    'pH' => (float) $item->ph,
                ];
            })->values(),

            // Tren Bulanan: Mengambil data 30 hari terakhir
            'monthly' => auth()->user()->waterChecks()
                ->where('created_at', '>=', Carbon::now()->subDays(30))
                ->latest()->take(30)->get()->reverse()->map(function($item) {
                return [
                    'name' => $item->created_at->format('d/m'), // Tanggal/Bulan (misal 27/06)
                    'Suhu' => (float) $item->suhu,
                    'pH' => (float) $item->ph,
                ];
            })->values(),
        ];

        // 3. Kirim data history dan trends ke React (Dashboard.jsx)
        return Inertia::render('Dashboard', [
            'history' => $history,
            'trends' => $trends // Variabel trends sekarang sudah dikirim!
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validasi input dari mahasiswa di React
        $request->validate([
            'waktu_cek' => 'required|string',
            'suhu' => 'required|numeric',
            'ph' => 'required|numeric',
            'tds' => 'required|numeric',
            'sisa_pakan' => 'required|numeric',
        ]);

        try {
            // 2. Tembak data ke API Python FastAPI kamu
            $response = Http::post('http://127.0.0.1:8000/predict', [
                'Suhu' => (float) $request->suhu,
                'TDS' => (float) $request->tds,
                'pH' => (float) $request->ph,
                'Sisa_Pakan' => (float) $request->sisa_pakan,
                'Status_Air_Num' => 0.0 
            ]);

            // 3. Tangkap hasil dari Python
            $hasil_prediksi = $response->json();
            
            $status = $hasil_prediksi['status'] ?? 'Aman';
            $rekomendasi = $hasil_prediksi['rekomendasi'] ?? 'Kondisi air optimal.';

        } catch (\Exception $e) {
            // Jika Python belum jalan atau error
            $status = 'Error';
            $rekomendasi = 'Gagal terhubung ke Model AI.';
        }

        // 4. Simpan ke database MySQL
        auth()->user()->waterChecks()->create([
            'waktu_cek' => $request->waktu_cek,
            'suhu' => $request->suhu,
            'ph' => $request->ph,
            'tds' => $request->tds,
            'sisa_pakan' => $request->sisa_pakan,
            'status' => $status,
            'rekomendasi' => $rekomendasi,
        ]);

        return redirect()->back()->with('message', 'Data berhasil dianalisis oleh sistem AI!');
    }
}