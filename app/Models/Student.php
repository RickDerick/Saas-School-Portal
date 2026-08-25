<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'admission_number',
        'first_name',
        'last_name',
        'dob',
        'gender',
        'parent_id',
        'current_class_id',
        'status',
    ];

    public function parent()
    {
        return $this->belongsTo(StudentParent::class, 'parent_id');
    }

    public function currentClass()
    {
        return $this->belongsTo(SchoolClass::class, 'current_class_id');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
