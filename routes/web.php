<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WaterCheckController;
use App\Http\Controllers\AdminDashboardController;

// =======================================================
// IMPORT AUTH CONTROLLER (Hanya menyisakan Login, Register & Password Update)
// =======================================================
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordController; // <-- INI YANG KURANG SEBELUMNYA

// =======================
// HALAMAN AWAL
// =======================
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// =======================
// DASHBOARD MAHASISWA & ADMIN
// =======================
Route::middleware(['auth'])->group(function () {

    // Dashboard Mahasiswa
    Route::get('/dashboard', [WaterCheckController::class, 'index'])
        ->name('dashboard');

    Route::post('/water-check', [WaterCheckController::class, 'store'])
        ->name('water-check.store');

    // Dashboard Admin
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');

    Route::delete('/admin/users/{id}', [AdminDashboardController::class, 'destroyUser'])
        ->name('admin.users.destroy');
        
    // Rute untuk tombol konfirmasi/approve
    Route::patch('/admin/users/{id}/approve', [AdminDashboardController::class, 'approveUser'])
        ->name('admin.users.approve');
});

// =======================
// PROFILE (Tetap utuh, ditambah update password)
// =======================
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// =======================
// AUTHENTICATION (GUEST) - Hanya Tersisa Login & Register
// =======================
Route::middleware('guest')->group(function () {

    // Register
    Route::get('/register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('/register', [RegisteredUserController::class, 'store']);

    // Login
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

// =======================
// AUTH USER LOGGED IN - Logout & Update Password
// =======================
Route::middleware('auth')->group(function () {

    // Update Password dari Profile
    Route::put('/password', [PasswordController::class, 'update'])->name('password.update');

    // Logout
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});