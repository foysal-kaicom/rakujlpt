<?php

namespace Database\Seeders;

use App\Models\ReturnPolicy;
use App\Models\PrivacyPolicy;
use App\Models\TermsCondition;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PagePolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Privacy Policy
        PrivacyPolicy::create([
            'content' => [
                'en' => 'This is the default Privacy Policy in English.',
                'bn' => 'এটি ডিফল্ট গোপনীয়তা নীতি বাংলা ভাষায়।',
            ],
        ]);

        // Terms & Conditions
        TermsCondition::create([
            'content' => [
                'en' => 'These are the default Terms and Conditions in English.',
                'bn' => 'এগুলি বাংলা ভাষায় ডিফল্ট শর্তাবলী।',
            ],
        ]);

        // Return Policy
        ReturnPolicy::create([
            'content' => [
                'en' => 'This is the default Return Policy in English.',
                'bn' => 'এটি বাংলা ভাষায় ডিফল্ট রিটার্ন নীতি।',
            ],
        ]);
    }
}
