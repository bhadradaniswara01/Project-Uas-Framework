<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('water_checks', function (Blueprint $table) {
            $table->id();
            // Menghubungkan data air dengan id mahasiswa yang menginput
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Parameter yang diinput mahasiswa
            $table->enum('waktu_cek', ['pagi', 'sore']);
            $table->float('suhu'); // Contoh: 28.5
            $table->float('ph');   // Contoh: 7.2
            $table->integer('tds'); // Contoh: 1000
            $table->float('sisa_pakan'); // Contoh: 0.5 (dalam kg)

            // Hasil Analisis AI (Sesuai idemu)
            $table->string('status'); // Aman, Waspada, Bahaya
            $table->text('rekomendasi'); // Pesan "Kuras air 30%" atau "Jangan kuras air"

            $table->timestamps(); // Mencatat tanggal dan jam input otomatis
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('water_checks');
    }
};