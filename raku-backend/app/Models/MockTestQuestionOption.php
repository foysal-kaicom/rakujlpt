<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class MockTestQuestionOption extends Model
{
    use HasFactory , SoftDeletes;

    protected $guarded = [];

    protected $hidden=['correct_answer_index'];
    protected $casts = [
        'values' => 'array',
    ];

    public function question()
    {
        return $this->belongsTo(MockTestQuestion::class, 'question_id');
    }
}
