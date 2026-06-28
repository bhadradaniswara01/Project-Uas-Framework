<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\WaterCheck;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // 1. Ambil seluruh mahasiswa (user) beserta hitungan jumlah tes airnya
        $usersList = User::where('role', 'user')
            ->withCount('waterChecks')
            ->get();

        // 2. Hitung statistik ringkas
        $stats = [
            'totalUsers' => User::where('role', 'user')->count(),
            'totalChecks' => WaterCheck::count(),
        ];

        // 3. Ambil data tren aktivitas frekuensi tes (Diperbaiki Error ONLY_FULL_GROUP_BY)
        $activityTrend = WaterCheck::select(
                DB::raw("DATE_FORMAT(created_at, '%d %b') as name"), 
                DB::raw('count(*) as Jumlah_Tes')
            )
            ->groupBy('name')
            ->orderByRaw('MIN(created_at) asc') // <-- INI YANG KITA PERBAIKI BLI
            ->get();

        if ($activityTrend->isEmpty()) {
            $activityTrend = [[ 'name' => date('d M'), 'Jumlah_Tes' => 0 ]];
        }

        // 4. Ambil data rata-rata parameter air keseluruhan (Diperbaiki Error ONLY_FULL_GROUP_BY)
        $globalTrends = WaterCheck::select(
                DB::raw("DATE_FORMAT(created_at, '%d %b') as name"),
                DB::raw('ROUND(AVG(suhu), 1) as Suhu'),
                DB::raw('ROUND(AVG(ph), 1) as pH')
            )
            ->groupBy('name')
            ->orderByRaw('MIN(created_at) asc') // <-- INI JUGA KITA PERBAIKI
            ->get();

        if ($globalTrends->isEmpty()) {
            $globalTrends = [[ 'name' => date('d M'), 'Suhu' => 0, 'pH' => 0 ]];
        }

        return Inertia::render('admin/AdminDashboard', [
            'stats' => $stats,
            'usersList' => $usersList,
            'activityTrend' => $activityTrend,
            'globalTrends' => $globalTrends
        ]);
    }

    public function approveUser($id)
    {
        $user = User::findOrFail($id);
        $user->is_approved = 1;
        $user->save();

        return redirect()->back()->with('message', 'Akun mahasiswa berhasil dikonfirmasi!');
    }

    public function destroyUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('message', 'Akun mahasiswa berhasil dihapus.');
    }
}