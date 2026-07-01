<?php

use App\Http\Controllers\BusinessDashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource('/', LandingController::class)->names('landing');
Route::resource('/products', ProductController::class)->names('products');

// Route::get('/', function () {
//     return Inertia::render('landing');
// })->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');    
    Route::resource('/business/dashboard', BusinessDashboardController::class)->names('businessDashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
