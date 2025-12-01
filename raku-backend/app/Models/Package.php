<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_popular' => 'boolean',
        'is_home' => 'boolean',
        'is_free' => 'boolean',
    ];

    public function package_details()
    {
        return $this->hasMany(PackageDetail::class);
    }

    public function current_package_candidates()
    {
        return $this->hasMany(Candidate::class,  'current_package_id');
    }

    // public function subscriptions()
    // {
    //     return $this->hasMany(UserSubscription::class);
    // }
}
