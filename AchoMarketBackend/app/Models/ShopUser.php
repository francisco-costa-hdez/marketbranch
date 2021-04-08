<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class ShopUser extends Model
{
    use HasFactory;
    use HasRoles;

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
