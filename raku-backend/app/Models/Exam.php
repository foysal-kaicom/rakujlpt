<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Exam extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'exams';

    protected $guarded = [];

    protected $hidden = [];

    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i', 
        'fee' => 'decimal:2',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id', 'id');
    }
    
    public function getExamDateAttribute($value)
    {
        return Carbon::parse($value)->format('d-m-Y');
    }

    public function getApplicationDeadlineAttribute($value)
    {
        return Carbon::parse($value)->format('d-m-Y');
    }

    public function getResultPublishDateAttribute($value)
    {
        return Carbon::parse($value)->format('d-m-Y');
    }

    public function packageDetails()
    {
        return $this->belongsToMany(PackageDetail::class, 'package_detail_exam');
    }

    public function sections()
    {
        return $this->belongsToMany(MockTestSection::class, 'exam_section', 'exam_id', 'section_id');
    }

    public function mockTestModules()
    {
        return $this->hasMany(MockTestModule::class);
    }

    public function mockTestRecords()
    {
        return $this->hasMany(MockTestRecords::class, 'exam_id', 'id');
    }

}
