<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class ClientUser extends Model
{
    use HasFactory;
    use HasRoles; 

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
        "password"
    ];
}
