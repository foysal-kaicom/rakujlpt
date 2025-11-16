<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateStageProgress extends Model
{
    protected $guarded=[];

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }

    public function roadmap()
    {
        return $this->belongsTo(Roadmap::class);
    }

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
    
}
