<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'student_id',
        'term_id',
        'total_amount',
        'status',
        'due_date'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function term()
    {
        return $this->belongsTo(Term::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
