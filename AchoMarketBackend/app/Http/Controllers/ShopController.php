<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\ShopImage;
use App\Services\ShopService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class ShopController extends Controller
{
    protected $shopService;

    public function __construct(ShopService $shopService)
    {
        $this->shopService = $shopService;
    }
    public function findShopById(int $id)
    {
        return $this->shopService->findShopById($id);
    }

    public function findAllShops()
    {
        $shops = $this->shopService->findAllShops();
        return response()->json(['shops' => $shops], 200);
    }

    public function findShopByProduct(int $product_id)
    {
        $shops = $this->shopService->findShopByProduct($product_id);
        return response()->json(['shop' => $shops], 200);
    }

    public function findShopByStr(string $str)
    {
        $shops = $this->shopService->findShopByStr($str);
        return response()->json(['shops' => $shops], 200);
    }

    public function createShop(Request $request)
    {
        if(auth()->user()->id == $request->shop_user_id && auth()->user()->tokenCan('shop_user'))
        {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:shops,email',
                "tlf" => 'required|unique:shops,tlf',
                "address" => 'required',
                'description' => 'required',
            ]);
            if ($validator->fails()) 
            {
                return response()->json($validator->errors(), 404);
            }
            return $this->shopService->createShop($request); 
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
    }

    public function uploadShopImage(Request $request)
    {
        if(auth()->user()->shop->id == $request->shop_id && auth()->user()->tokenCan('shop_user'))
        {
            return $this->shopService->uploadShopImage($request);
        }else{
            return response()->json(['message' => 'Usuario no autorizado']);
        }
    }

    public function updateShop(Request $request)
    {
        if(auth()->user()->id == $request->shop_user_id && auth()->user()->tokenCan('shop_user'))
        {
            return $this->shopService->updateShop($request);
        }else{
            return response()->json(['message' => 'Usuario no autorizado']);
        }
    }

    public function deleteShopImage(int $img_id)
    {
        if(auth()->user()->shop->shopImages()->find($img_id) && auth()->user()->tokenCan('shop_user'))
        {
            return $this->shopService->deleteShopImage($img_id);
        }else{
            return response()->json(['message' => 'Usuario no autorizado']);
        }
    }

    public function deleteShop(int $id)
    {
        if(auth()->user()->shop->id == $id && auth()->user()->tokenCan('shop_user'))
        {
            return $this->shopService->deleteShop($id);
        }else{
            return response()->json(['message' => 'Usuario no autorizado']);
        }
        
    }

    public function desplegableBusquedas(string $name) 
    {
        return $this->shopService->desplegableBusquedas($name);
    }
}
