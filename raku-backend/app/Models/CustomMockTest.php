<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomMockTest extends Model
{
    use SoftDeletes;
    
    protected $guarded = [];

    public function mockTestQuestionGroup()
    {
        return $this->hasMany(MockTestQuestionGroup::class,'mock_test_section_id');
    }
    public function mockTestModule()
    {
        return $this->belongsTo(MockTestModule::class,'mock_test_module_id');
    }

    public function mockTestQuestion()
    {
        return $this->hasMany(MockTestQuestion::class,'mock_test_section_id');
    }

    public function section()
    {
        return $this->belongsTo(MockTestSection::class,'mock_test_section_id');
    }
}
