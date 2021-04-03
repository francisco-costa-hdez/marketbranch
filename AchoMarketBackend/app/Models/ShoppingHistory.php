<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingHistory extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(ClientUser::class);
    }

    public function lots()
    {
        return $this->hasMany(Lot::class);
    }
}
