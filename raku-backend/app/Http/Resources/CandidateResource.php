<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateResource extends JsonResource
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
                'first_name'=>$this->first_name,
                'last_name'=>$this->last_name,
                'full_name'=>$this->first_name.' '.$this->last_name,
                'email'=>$this->email,
                'phone_number'=>$this->phone_number,
                'photo'=>$this->photo,
                'cover_photo'=>$this->cover_photo,
                'about'=>$this->about,
                'facebook'=>$this->social_facebook,
                'linkedin'=>$this->social_linkedin,
                'gender'=>$this->gender,
                'address'=>$this->address,
                'skills'=>[
                    'vocabulary'=>0,
                    'grammar'=>0,
                    'listening'=>0,
                    'reading'=>0,
                ],
                
        ];
    }
}
