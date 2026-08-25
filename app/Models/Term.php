<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Term extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function feeStructures()
    {
        return $this->hasMany(FeeStructure::class, 'term_id');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'term_id');
    }
}
