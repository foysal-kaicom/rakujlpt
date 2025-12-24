<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                    => $this->id,
            'body'                  => $this->body,
            'exam_name'             => $this->exam->title,
            'reviewer_name'         => $this->reviewer_name,
            'reviewer_designation'  => $this->reviewer_designation,
            'rating'                => $this->rating,
            'image'                 => $this->image  
        ];
    }
}
