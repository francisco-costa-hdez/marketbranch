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

    public function findShopByProduct(int $product_id)
    {
        return $this->product->find($product_id)->shop;
    }

    public function findShopByStr(string $str)
    {
        return $this->shop
            ->where('name', 'like', '%' . $str . '%')
            ->orWhere('description', 'like', '%' . $str . '%')->get();
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

        return response()->json(['message' => 'Tienda creada correctamente']);
    }

    public function uploadShopImage(Request $request)
    {
        $this->shop->find($request->shop_id)
            ->shopImages()->create(['image' => $request->image]);
        return response()->json(['message' => 'Imagen subida correctamente']);
    }

    public function deleteShopImage(int $img_id)
    {
        ShopImage::find($img_id)->delete();
        return response()->json(['message' => 'Imagen borrada correctamente']);
    }

    public function deleteShop(int $id)
    {
        $this->shop->destroy($id);
        return response()->json(['message' => 'Tienda borrada correctamente']);
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

        return response()->json(['message' => 'Los datos se han guardado correctamente']);
    }
}
