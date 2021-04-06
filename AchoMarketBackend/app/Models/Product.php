<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function trademark()
    {
        return $this->belongsTo(Trademark::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function whishlists()
    {
        return $this->belongsToMany(WhishList::class);
    }

    public function purchases()
    {
        return $this->belongsToMany(Purchase::class);
    }

    public function carts()
    {
        return $this->belongsToMany(Cart::class);
    }

    public function user()
    {
        return $this->belongsToMany(Order::class);
    }

    protected $fillable = [
        'name','price',
        'description','discount',
        'stock','availability',
        'shop_id','trademark_id',
        'subcategory_id'];
}
