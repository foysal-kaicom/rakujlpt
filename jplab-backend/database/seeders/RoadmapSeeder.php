<?php

namespace Database\Seeders;

use App\Models\Roadmap;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoadmapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Roadmap::create([
            'title' => 'JLPT',
            'slug' => 'jlpt',
            'description' => 'Learn the fundamentals of web development, including HTML, CSS, JavaScript, and popular frameworks.',
            // 'status' => 'active',
        ]);
    }
}
