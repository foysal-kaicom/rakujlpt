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
        Schema::create('practices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stage_id')->constrained('stages')->onDelete('cascade');
            $table->json('questions')->nullable(); // All questions, options, answers stored here
            $table->enum('status', ['active', 'disabled'])->default('active');
            $table->timestamps();
        });
        // $table->id();
        // $table->foreignId('roadmap_id')->nullable()->constrained('roadmaps');
        
        // $table->foreignId('mock_test_questions_id')->constrained('mock_test_questions');
        // $table->string('title');
        // $table->string('slug')->unique();
        // $table->string('image')->nullable();
        // $table->text('description')->nullable();

        // $table->foreignId('stage_id')->constrained('stages');
        // $table->timestamps();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('practices');
    }
};
