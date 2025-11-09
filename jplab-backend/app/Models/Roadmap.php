<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roadmap extends Model
{
    protected $guarded=[];

    protected $casts = [
        'stage_pattern' => 'array', // auto JSON encode/decode
    ];
    public function stages()
    {
        return $this->hasMany(Stage::class)->orderBy('id');
    }

    // Relationships
    public function practices()
    {
        return $this->hasMany(Practice::class)->orderBy('order');
    }
}
