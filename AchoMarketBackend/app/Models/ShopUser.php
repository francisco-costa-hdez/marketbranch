<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopUser extends Model
{
    use HasFactory;

    public function shop()
    {
        return $this->hasOne(Shop::class);
    }

    protected $fillable =[
        'admin_name',
        'nif',
        'profile_img',
        'email',
        'password'
    ];  
}
