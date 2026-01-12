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
        Schema::create('coin_rules', function (Blueprint $table) {
            $table->id();
            $table->string('action')->unique(); 
            // example: daily_login, mock_test_complete

            $table->string('title')->nullable();
            $table->enum('type', ['earn', 'spend']);

            $table->decimal('points_min', 8, 2)->default(0);
            $table->decimal('points_max', 8, 2)->nullable();

            $table->enum('frequency', [
                'once',
                'daily',
                'unlimited',
                'per_action'
            ])->default('once');

            $table->text('description')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coin_rules');
    }
};
