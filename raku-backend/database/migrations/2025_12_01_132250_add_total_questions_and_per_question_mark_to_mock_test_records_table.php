<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mock_test_records', function (Blueprint $table) {
            $table->integer('total_questions')->after('wrong_listening_answer')->nullable();
            $table->double('per_question_mark', 8, 2)->after('total_questions')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('mock_test_records', function (Blueprint $table) {
            $table->dropColumn(['total_questions', 'per_question_mark']);
        });
    }
};
