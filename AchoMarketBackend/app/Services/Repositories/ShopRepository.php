<?php

namespace App\Services\Repositories;

use App\Models\Product;
use App\Models\Shop;
use App\Models\ShopImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShopRepository
{
    protected $shop;
    protected $product;

    public function __construct(Shop $shop, Product $product)
    {
        $this->shop = $shop;
        $this->product = $product;
    }

    public function findShopById(int $id)
    {
        return $this->shop->find($id);
    }

    public function findAllShops()
    {
        return $this->shop->orderBy('created_at', 'desc')->get();
    }

    public function findShopByString(string $string)
    {
        $str = "%" . $string . "%";
        $shops = DB::select('select * from shops where name like ? OR description like ? order by created_at desc', [$str, $str]);
        return $shops;
    }
    
    public function findShopByProduct(int $product_id)
    {
        return $this->product->find($product_id)->shop;
    }

    public function createShop(Request $request)
    {
        $this->shop->create([
            'name' => $request->name,
            'tlf' => $request->tlf,
            'description' => $request->description,
            'address' => $request->address,
            'email' => $request->email,
            'shop_user_id' => $request->shop_user_id
        ]);
    }

    public function updateShop(Request $request)
    {
        $this->shop->find($request->id)->update([
            'name' => $request->name,
            'tlf' => $request->tlf,
            'description' => $request->description,
            'address' => $request->address,
            'email' => $request->email,
        ]);
    }

    public function uploadShopImage(Request $request)
    {
        $this->shop->find($request->shop_id)
        ->shopImages()->create(['image' => $request->image]);
    }

    public function deleteShopImage(int $img_id)
    {
        ShopImage::find($img_id)->delete();
    }

    
    public function deleteShop(int $id)
    {
        $this->shop->destroy($id);
    }

}
