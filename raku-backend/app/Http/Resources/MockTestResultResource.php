<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MockTestResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                        => $this->id,
            'candidate_id'              => $this->candidate_id,
            'question_set'              => $this->question_set,
            'per_question_mark'         => $this->per_question_mark,
            'total_answered'            => $this->total_answered,
            'total_correct'             => $this->total_correct,
            'total_wrong'               => $this->total_wrong,
            'module_wise_score'         => json_decode($this->module_wise_score),
            'created_at'                => date('Y-m-d', strtotime($this->created_at)),
            'updated_at'               => date('Y-m-d h:i:s', strtotime($this->updated_at)),
            'exam' => [
                'id' => $this->exam->id ?? null,
                'name' => $this->exam->name ?? null,
                'title' => $this->exam->title ?? null,
                'pass_point' => $this->exam->pass_point ?? null,
                'total_point' => $this->exam->total_point ?? null,
            ],

        ];
    }
}