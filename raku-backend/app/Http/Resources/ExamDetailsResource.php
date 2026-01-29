<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamDetailsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Base fields (same for both)
        $data = [
            'id' => $this->id,
            'title' => $this->title,
            'name' => $this->name,
            'type' => $this->type,
            'pass_point' => $this->pass_point,
            'total_point' => $this->total_point,
            'duration' => $this->duration,
            'description' => $this->description,
            'reviews' => $this->whenLoaded('reviews', $this->reviews),
        ];

        if ($this->type === 'general') {
            $modules = collect($this->mockTestModules ?? [])->map(function ($m) {
                return [
                    'id' => $m->id,
                    'exam_id' => $m->exam_id,
                    'name' => $m->name,
                    'total_module_question_quantity' => (int) ($m->total_module_question_quantity ?? 0),
                    'sections' => collect($m->sections ?? [])->map(function ($s) {
                        return [
                            'id' => $s->id,
                            'mock_test_module_id' => $s->mock_test_module_id,
                            'title' => $s->title,
                            'status' => $s->status,
                            'question_limit' => (int) ($s->question_limit ?? 0),
                        ];
                    })->values(),
                ];
            })->values();

            return $data + [
                'total_exam_question_quantity' => (int) ($this->total_exam_question_quantity ?? 0),
                'mock_test_modules' => $modules,
            ];
        }

        $rows = collect($this->customMockTests ?? []);

        $modules = $rows->groupBy('mock_test_module_id')->map(function ($moduleRows) {
            $module = optional($moduleRows->first())->mockTestModule;

            $sections = $moduleRows->map(function ($row) {
                $section = $row->section;

                return [
                    'id' => $section->id,
                    'mock_test_module_id' => $section->mock_test_module_id,
                    'title' => $section->title,
                    'status' => $section->status,
                    'question_limit' => (int) $row->question_quantity,
                ];
            })->values();

            return [
                'id' => $module?->id,
                'exam_id' => $module?->exam_id,
                'name' => $module?->name,
                'total_module_question_quantity' => (int) $sections->sum('question_limit'),
                'sections' => $sections,
            ];
        })->values();

        return $data + [
            'total_exam_question_quantity' => (int) $modules->sum('total_module_question_quantity'),
            'mock_test_modules' => $modules,
        ];
    }
}
