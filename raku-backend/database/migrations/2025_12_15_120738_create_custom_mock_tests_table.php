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
        Schema::create('custom_mock_tests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agent_id')->nullable()->constrained('agents');
            $table->foreignId('exam_id')->constrained('exams');
            $table->foreignId('mock_test_module_id')->constrained('mock_test_modules');
            $table->foreignId('mock_test_section_id')->constrained('mock_test_sections');
            $table->integer('question_quantity')->default(1);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_mock_tests');
    }
};
