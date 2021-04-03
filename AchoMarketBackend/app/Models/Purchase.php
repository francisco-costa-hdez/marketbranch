<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    public function product()
    {
        return $this->hasOne(Product::class);
    }
    public function lot()
    {
        return $this->belongsTo(Lot::class);
    }
}
