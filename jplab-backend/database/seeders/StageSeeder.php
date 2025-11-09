<?php

namespace Database\Seeders;

use App\Models\Stage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Stage::create([
            'roadmap_id' => 1,
            'title' => 'Stage 1',
            'slug' => 'stage-1',
            'order' => 1,
            'description' => 'This is the first stage of the roadmap.',
            'duration' => 10,
            'status' => 1,
        ]);
    }
}
