<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoadmapUnlock extends Model
{
    protected $guarded = [];

    public function roadmap()
    {
        return $this->belongsTo(Roadmap::class);
    }
}
