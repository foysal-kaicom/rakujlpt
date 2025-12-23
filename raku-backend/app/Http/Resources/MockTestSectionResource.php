<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MockTestSectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       $groups = collect();

        if ($this->mockTestModule->slug==='listening') { // for listening module - need to follow set no
            // Find available set numbers for this section
            $availableSets = $this->mockTestQuestionGroup()
                ->where('mock_test_section_id', $this->id)
                ->distinct()
                ->pluck('set_no');

            if ($availableSets->isNotEmpty()) {
                // Pick one set randomly for this section
                $randomSetNo = $availableSets->random();

                // Fetch questions belonging to that set (respect limit)
                $groups = $this->mockTestQuestionGroup()
                    ->where('mock_test_section_id', $this->id)
                    ->where('set_no', $randomSetNo)
                    ->orderBy('id') // keep order
                    ->take($this->question_limit)
                    ->get();
            }
        } elseif ($this->slug === 'reading-comprehension') {
            // Hardcoded pattern: 3 + 4 + 3
            $groups = $groups->merge(
                $this->mockTestQuestionGroup()
                    ->where('question_quantity', 3)
                    ->inRandomOrder()
                    ->take(1)
                    ->get()
            );

            $groups = $groups->merge(
                $this->mockTestQuestionGroup()
                    ->where('question_quantity', 4)
                    ->inRandomOrder()
                    ->take(1)
                    ->get()
            );

            $groups = $groups->merge(
                $this->mockTestQuestionGroup()
                    ->where('question_quantity', 3)
                    ->whereNotIn('id', $groups->pluck('id'))
                    ->inRandomOrder()
                    ->take(1)
                    ->get()
            );
        } else {
            // Fallback for other sections
            $groups = $this->mockTestQuestionGroup()
                ->inRandomOrder()
                ->take($this->question_limit)
                ->get();
        }

        return [
            'id'              => $this->id,
            'slug'            => $this->slug ?? null,
            'title'           => $this->title ?? null,
            'module_name'     => $this->mockTestModule->name ?? null,
            'sample_question' => $this->sample_question,
            'group'           => MockTestGroupResource::collection($groups),
        ];
    }
}
