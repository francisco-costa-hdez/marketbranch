<?php

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

interface IShopService
{
    public function findShopById(int $id);

    public function findAllShops();

    public function findShopByString(string $string);

    public function findShopByProduct(int $product_id);

    public function createShop(Request $request);

    public function updateShop(Request $request);

    public function uploadShopImage(Request $request);

    public function deleteShopImage($img_id);
    
    public function deleteShop($id);
}
