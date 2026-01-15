<?php

namespace Database\Seeders;

use App\Models\CoinRule;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CoinRuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rules = [

            // ===== EARNING =====
            [
                'action' => 'daily_login',
                'title' => 'Daily Login',
                'type' => 'earn',
                'points_min' => 5,
                'frequency' => 'daily',
            ],
            [
                'action' => 'new_registration',
                'title' => 'New Registration',
                'type' => 'earn',
                'points_min' => 100,
                'frequency' => 'once',
            ],
            [
                'action' => 'mock_test_complete',
                'title' => 'Mock Test Complete',
                'type' => 'earn',
                'points_min' => 20,
                'frequency' => 'daily',
            ],
            [
                'action' => 'community_help',
                'title' => 'Community Help',
                'type' => 'earn',
                'points_min' => 15,
                'frequency' => 'per_action',
            ],

            // ===== SPENDING =====
            [
                'action' => 'premium_roadmap',
                'title' => 'Premium Roadmap',
                'type' => 'spend',
                'points_min' => 200,
                'frequency' => 'once',
            ],
            [
                'action' => 'unlock_roadmap',
                'title' => 'Unlock Roadmap',
                'type' => 'spend',
                'points_min' => 20,
                'frequency' => 'per_action',
            ],
            [
                'action' => 'ai_evaluation',
                'title' => 'AI Evaluation',
                'type' => 'spend',
                'points_min' => 70,
                'frequency' => 'per_action',
            ],
            //referral_bonus
            [
                'action' => 'referral_bonus',
                'title' => 'Referral Bonus',
                'type' => 'earn',
                'points_min' => 50,
                'frequency' => 'per_action',
            ],

        ];

        foreach ($rules as $rule) {
            CoinRule::updateOrCreate(
                ['action' => $rule['action']],
                $rule
            );
        }
    }
}
