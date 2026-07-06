<?php

use App\Http\Controllers\Business\BusinessDashboardController;
use App\Http\Controllers\Business\BusinessDeliveryController;
use App\Http\Controllers\Business\BusinessHistoryController;
use App\Http\Controllers\Business\BusinessInvoiceController;
use App\Http\Controllers\Business\BusinessOrderController;
use App\Http\Controllers\Business\BusinessProductController;
use App\Http\Controllers\Business\BusinessProfileController;
use App\Http\Controllers\Business\BusinessStockController;
use App\Http\Controllers\Business\BusinessSubscriptionController;
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
    Route::resource('/business/invoices', BusinessInvoiceController::class)->names('businessInvoices');
    Route::resource('/business/profile', BusinessProfileController::class)->names('businessProfile');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
