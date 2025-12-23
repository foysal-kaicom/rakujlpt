<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $table = 'reviews';

    protected $guarded=[];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function exam()
    {
     return $this->hasOne(Exam::class,'id','exam_id');    
    }
}
