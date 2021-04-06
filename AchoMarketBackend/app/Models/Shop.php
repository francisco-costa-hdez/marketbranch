<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    public function shopUser()
    {
        return $this->belongsTo(ShopUser::class);
    }

    public function shopImages()
    {
        return $this->hasMany(ShopImage::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    protected $fillable =[
        'name',
        'description',
        'address',
        'tlf',
        'email',
        'shop_user_id'
    ];
}
