<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class ShopUser extends Authenticatable implements MustVerifyEmail
{
    use HasFactory;
    use HasRoles;
    use HasApiTokens, HasFactory, Notifiable;
    
    protected $guard_name = 'web';
    
    public function shop()
    {
        return $this->hasOne(Shop::class);
    }

    protected $fillable =[
        'admin_name',
        'nif',
        'profile_img',
        'email',
        'password',
        "confirmation_code",
        "confirmed"
    ];  
}
