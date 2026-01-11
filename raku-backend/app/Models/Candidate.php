<?php

namespace App\Models;

use App\Models\UserSubscription;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Candidate extends Authenticatable implements JWTSubject
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $guarded=[];

    // protected $fillable = [
    //     'prefix',
    //     'first_name',
    //     'last_name',
    //     'surname',
    //     'email',
    //     'password',
    //     'date_of_birth',
    //     'phone_number',
    //     'nationality',
    //     'national_id',
    //     'gender',
    //     'photo',
    //     'address',
    //     'status',
    //     'otp',
    //     'otp_expired_at',
    //     'is_phone_verified'
    // ];

    protected $hidden = [
        'password','otp'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return []; 
    }

    public function getFullNameAttribute() 
    {
        return $this->first_name.' '. $this->last_name;  
    }


    public function UserSubscriptions()
    {
        return $this->hasMany(UserSubscription::class, 'candidate_id');
    }

    public function latestSubscription()
    {
        return $this->hasOne(UserSubscription::class, 'candidate_id')->latest();
    }

    public function currentPackage()
    {
        return $this->belongsTo(Package::class, 'current_package_id');
    }
    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id');
    }
    
}
