<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TermsCondition extends Model
{
    protected $guarded = [];

    protected $casts = [
        'content' => 'array', // json -> array automatically
    ];
}
