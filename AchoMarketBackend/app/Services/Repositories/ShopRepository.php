<?php

namespace App\Services\Repositories;

use App\Models\Product;
use App\Models\Shop;
use App\Models\ShopImage;
use App\Services\Repositories\Interfaces\IShopRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShopRepository implements IShopRepository
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
        $shop = $this->shop->find($id);
        $images = DB::select('SELECT id,image from shop_images where shop_id = ?',[$id]);
        return response()->json(['shop' => $shop, 'images' =>$images], 200);
    }

    public function findAllShops()
    {
       $shops =  DB::select("SELECT s.*, si.image as image
                            from shops s LEFT JOIN shop_images si ON s.id = si.shop_id
                            WHERE s.name != ''
                            GROUP BY s.id
                            ORDER BY s.created_at DESC");
        return $shops;
    }

    public function findShopByProduct(int $product_id)
    {
        $shop = DB::select('SELECT s.*, si.image as image
        from (shops s LEFT JOIN shop_images si ON s.id = si.shop_id)
        LEFT JOIN products p ON p.shop_id = s.id
        WHERE p.id = ?
        ORDER BY s.created_at DESC',[$product_id]);
        return $shop;
    }   

    public function findShopByStr(string $str)
    {
        $string = '%' . $str . '%';
        $shops = DB::select("SELECT s.*, si.image as image
        from shops s LEFT JOIN shop_images si ON s.id = si.shop_id
        WHERE s.name like ? or s.description like ?
        GROUP BY s.id
        ORDER BY s.created_at DESC",[$string,$string]);

        return $shops;
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

    public function desplegableBusquedas(string $name){
        $str = '%' . $name . '%';
        $shops = DB::select('SELECT name FROM shops WHERE name like ? ORDER BY name
        LIMIT 6',[$str]);
        return response()->json($shops);
    }
}
