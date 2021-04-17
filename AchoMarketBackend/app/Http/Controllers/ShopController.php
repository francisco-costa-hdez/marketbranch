<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\ShopImage;
use App\Services\ShopService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{
    protected $shopService;

    public function __construct(ShopService $shopService)
    {
        $this->shopService = $shopService;
    }
    public function findShopById(int $id)
    {
        $shop = $this->shopService->findShopById($id);
        return response()->json(['shop' => $shop], 200);
    }

    public function findAllShops()
    {
        $shops = $this->shopService->findAllShops();
        return response()->json(['shops' => $shops], 200);
    }

    public function findShopByString(string $string)
    {
        $shops = $this->shopService->findShopByString($string);
        return response()->json(['shops' => $shops], 200);
    }

    public function findShopByProduct(int $product_id)
    {
        $shops = $this->shopService->findShopByProduct($product_id);
        return response()->json(['shop' => $shops], 200);
    }

    public function createShop(Request $request)
    {
      $this->shopService->createShop($request);
    }

    public function updateShop(Request $request)
    {
        $this->shopService->updateShop($request);
    }

    public function uploadShopImage(Request $request)
    {
        $this->shopService->uploadShopImage($request);
    }

    public function deleteShopImage(int $img_id)
    {
        $this->shopService->deleteShopImage($img_id);
    }

    public function deleteShop(int $id)
    {
        $this->shopService->deleteShop($id);
    }
}
