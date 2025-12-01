<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class BusinessSetting extends Model
{
    protected $table = 'business_settings';

    protected $guarded=[];

    protected $casts = [
        'legal_docs' => 'json',
    ];

    protected static function booted()
    {
        static::saved(function () {
            Cache::forget('business_settings:first');
        });

        static::deleted(function () {
            Cache::forget('business_settings:first');
        });
    }
}
