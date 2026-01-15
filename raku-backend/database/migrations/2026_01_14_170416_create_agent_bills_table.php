<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('agent_bills', function (Blueprint $table) {
            $table->id();

            $table->foreignId('agent_id')->constrained('agents')->cascadeOnDelete();
            $table->foreignId('candidate_id')->constrained('candidates')->cascadeOnDelete();

            $table->unsignedTinyInteger('billing_month');
            $table->unsignedSmallInteger('billing_year');

            $table->unsignedInteger('commission_amount')->default(200);

            $table->enum('status', ['unpaid', 'paid', 'cancelled'])->default('unpaid');

            $table->string('reference_no')->nullable()->index();
            $table->text('notes')->nullable();
            $table->timestamp('billed_at')->nullable();

            $table->timestamps();

            // Prevent duplicate billing for same candidate in same month
            $table->unique(
                ['agent_id', 'candidate_id', 'billing_year', 'billing_month'],
                'agent_bills_unique'
            );

            // Faster month filtering
            $table->index(['agent_id', 'billing_year', 'billing_month'], 'agent_bills_period_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agent_bills');
    }
};
