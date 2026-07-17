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
        Schema::create('shelves', function (Blueprint $table) {
            $table->id();
            $table->string('zone');
            $table->unsignedInteger('index');
            $table->foreignId('occupied_by_business_id')->nullable()->constrained('businesses')->nullOnDelete();
            $table->unsignedBigInteger('occupied_by_product_id')->nullable();
            $table->timestamps();

            $table->unique(['zone', 'index']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shelves');
    }
};
