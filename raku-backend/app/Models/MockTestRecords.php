<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MockTestRecords extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function candidate() {
        return $this->belongsTo(Candidate::class, 'candidate_id');
    }

    public function exam() {
        return $this->belongsTo(Exam::class, 'exam_id');
    }
}