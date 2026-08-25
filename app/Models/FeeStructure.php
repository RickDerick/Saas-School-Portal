<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeeStructure extends Model
{
     protected $fillable = [
        'class_id',
        'term_id',
        'amount'
    ];

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

     public function term()
    {
        return $this->belongsTo(Term::class, 'term_id');
    }
}
