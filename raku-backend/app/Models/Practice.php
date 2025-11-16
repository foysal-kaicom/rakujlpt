<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Practice extends Model
{
    protected $guarded=[];

    protected $casts = [
        'questions' => 'array',
    ];


    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }

}
