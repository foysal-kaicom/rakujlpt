<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('agent_disburse_histories', function (Blueprint $table) {
            $table->id();

            $table->foreignId('agent_id')->constrained('agents')->cascadeOnDelete();

            // Which month/year this payment is for (so agent selects month/year and pays that due)
            $table->unsignedTinyInteger('billing_month');
            $table->unsignedSmallInteger('billing_year');

            $table->string('payout_channel')->nullable();

            $table->unsignedInteger('payout_amount')->default(0);

            $table->string('trx_id')->nullable()->index();
            $table->string('image')->nullable();

            $table->enum('status', ['pending', 'approved', 'rejected', 'cancelled'])->default('pending');

            $table->timestamp('paid_at')->nullable();
            $table->text('remarks')->nullable();

            // Admin tracking (optional)
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();

            $table->timestamps();

            $table->index(['agent_id', 'billing_year', 'billing_month'], 'agent_disburse_period_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agent_disburse_histories');
    }
};
