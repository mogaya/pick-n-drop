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
        Schema::table('businesses', function (Blueprint $table) {
            $table->string('category')->nullable()->after('name');
            $table->enum('plan', ['small', 'medium', 'Large'])->default('small')->after('category');
            $table->string('status')->default('active')->after('plan');
            $table->timestamp('joined_at')->nullable()->after('status');
            $table->unsignedBigInteger('owner_id')->nullable()->after('joined_at');
            $table->json('shelves')->nullable()->after('owner_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn(['category', 'plan', 'status', 'joined_at', 'owner_id', 'shelves']);
        });
    }
};
