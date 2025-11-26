<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'slug'=>$this->slug,
            'short_name'=>$this->name,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'title'=>$this->title,
            'description'=>$this->description,
            'duration'=>$this->duration.' minutes',
            'pass_point'=>$this->pass_point,
            'total_point'=>$this->total_point,
            'answer_value'=>$this->answer_value,
        ];
    }
}
