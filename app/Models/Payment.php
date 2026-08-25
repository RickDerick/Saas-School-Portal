<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'student_id',
        'invoice_id',
        'amount',
        'method',
        'transaction_id',
        'status',
        'paid_at'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
