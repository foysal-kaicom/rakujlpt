<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    use HasFactory;

    protected $table = 'agents';

    protected $guarded = [];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function getPhotoUrlAttribute()
    {
        return asset('storage/' . $this->photo);
    }
}
