<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable; // Wajib di-import untuk gaya penulisan baru

// Memberikan izin agar kolom-kolom ini bisa diisi data secara massal dari form React
#[Fillable(['waktu_cek', 'suhu', 'ph', 'tds', 'sisa_pakan', 'status', 'rekomendasi'])]
class WaterCheck extends Model
{
    use HasFactory;

    // Relasi balik ke User (Satu data pengecekan air ini milik satu user/mahasiswa)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}