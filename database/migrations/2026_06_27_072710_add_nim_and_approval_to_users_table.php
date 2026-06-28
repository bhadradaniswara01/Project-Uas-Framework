<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Menambahkan kolom nim dan is_approved
            $table->string('nim')->unique()->after('name');
            $table->boolean('is_approved')->default(false)->after('password'); 
            // default(false) artinya otomatis belum disetujui saat baru daftar
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nim', 'is_approved']);
        });
    }
};