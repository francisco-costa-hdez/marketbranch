<?php

namespace App\Services\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IShopRepository
{
    public function findShopById(int $id);

    public function findAllShops();

    public function findShopByProduct(int $product_id);

    public function findShopByStr(string $str);

    public function createShop(Request $request);

    public function uploadShopImage(Request $request);

    public function deleteShopImage(int $img_id);

    public function deleteShop(int $id);

    public function updateShop(Request $request);

    public function desplegableBusquedas(string $name);
}