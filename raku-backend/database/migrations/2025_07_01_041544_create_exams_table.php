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
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('name')->comment("Short Name");
            $table->string('slug')->unique();
            $table->enum('type',['custom','general','agent']);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->double('duration')->nullable();
            $table->double('pass_point')->nullable();
            $table->double('total_point')->nullable();
            $table->double('answer_value')->nullable();
            $table->boolean('status')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->foreignId('agent_id')->nullable()->constrained('agents');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
