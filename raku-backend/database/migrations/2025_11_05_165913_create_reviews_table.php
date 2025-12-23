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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->text('body');
            $table->foreignId('candidate_id')->nullable();
            $table->foreignId('exam_id')->nullable();
            $table->string('reviewer_name');
            $table->string('reviewer_designation')->nullable();
            $table->unsignedTinyInteger('rating')->default(1)->comment('1 to 5');
            $table->string('image')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
