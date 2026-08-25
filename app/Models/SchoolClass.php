<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    protected $table = 'classes';

    protected $fillable = ['name'];
    
    public function students()
    {
        return $this->hasMany(Student::class, 'current_class_id');
    }

    public function feeStructures()
    {
        return $this->hasMany(FeeStructure::class, 'class_id');
    }
}
