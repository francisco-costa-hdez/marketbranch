<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class ClientUser extends Authenticatable implements MustVerifyEmail
{
    use HasFactory;
    use HasRoles; 
    use HasApiTokens, HasFactory, Notifiable;

    protected $guard_name = 'web';
    
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function whishList()
    {
        return $this->hasMany(WhishList::class);
    }

    public function shoppingHistory()
    {
        return $this->hasOne(ShoppingHistory::class);
    }

    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    protected $fillable = [
        "name",
        "email",
        "tlf",
        "profile_img",
        "address",
        "password",
        "confirmation_code",
        "confirmed"
    ];
}
