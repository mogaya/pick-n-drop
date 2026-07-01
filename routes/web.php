<?php

use App\Http\Controllers\BusinessDashboardController;
use App\Http\Controllers\BusinessDeliveryController;
use App\Http\Controllers\BusinessHistoryController;
use App\Http\Controllers\BusinessOrderController;
use App\Http\Controllers\BusinessProductController;
use App\Http\Controllers\BusinessStockController;
use App\Http\Controllers\BusinessSubscriptionController;
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
    Route::resource('/business/products', BusinessProductController::class)->names('businessProducts');
    Route::resource('/business/stock', BusinessStockController::class)->names('businessStock');
    Route::resource('/business/orders', BusinessOrderController::class)->names('businessOrders');
    Route::resource('/business/deliveries', BusinessDeliveryController::class)->names('businessDeliveries');
    Route::resource('/business/history', BusinessHistoryController::class)->names('businessHistory');
    Route::resource('/business/subscription', BusinessSubscriptionController::class)->names('businessSubscription');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
