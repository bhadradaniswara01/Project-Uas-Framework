<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Validasi Input (Wajib Email Undiksha & NIM Unik)
        $request->validate([
            'name' => 'required|string|max:255',
            'nim' => 'required|string|unique:users,nim', // Validasi NIM
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                'unique:'.User::class,
                'regex:/^[a-zA-Z0-9._%+-]+@undiksha\.ac\.id$/' // Wajib berakhiran @undiksha.ac.id
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            // Pesan Error Bahasa Indonesia (Custom)
            'email.regex' => 'Pendaftaran gagal! Anda wajib menggunakan email resmi @undiksha.ac.id.',
            'nim.unique' => 'NIM ini sudah terdaftar di sistem.'
        ]);

        // 2. Simpan Data ke Database
        $user = User::create([
            'name' => $request->name,
            'nim' => $request->nim, // Simpan NIM
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // is_approved otomatis false dari aturan default database
        ]);

        event(new Registered($user));

        // 3. JANGAN LAKUKAN LOGIN OTOMATIS
        // Auth::login($user); <--- Baris ini sengaja kita hapus/matikan 

        // 4. Redirect ke Login dengan Pesan Sukses
        return redirect()->route('login')->with('status', 'Pendaftaran berhasil! Silakan tunggu Admin menyetujui akun Anda.');
    }
}