<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    protected $guarded=[];
    public function roadmap()
    {
        return $this->belongsTo(Roadmap::class);
    }
    
    public function practices()
    {
        return $this->hasMany(Practice::class);
    }
}
