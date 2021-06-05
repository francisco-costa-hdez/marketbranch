<?php

namespace App\Services;

use App\Services\Interfaces\IShopService;
use App\Services\Repositories\ShopRepository;
use Illuminate\Http\Request;

class ShopService implements IShopService
{
    protected $shopRepository;

    public function __construct(ShopRepository $sr)
    {
        $this->shopRepository = $sr;
    }

    public function findShopById(int $id)
    {
        return $this->shopRepository->findShopById($id);
    }

    public function findAllShops()
    {
        return $this->shopRepository->findAllShops();
    }

    public function findShopByProduct(int $product_id)
    {
        return $this->shopRepository->findShopByProduct($product_id);
    }

    public function findShopByStr(string $str)
    {
        return $this->shopRepository->findShopByStr($str);
    }

    public function createShop(Request $request)
    {
        return $this->shopRepository->createShop($request);
    }

    public function uploadShopImage(Request $request)
    {
        return $this->shopRepository->uploadShopImage($request);
    }

    public function deleteShopImage($img_id)
    {
        return $this->shopRepository->deleteShopImage($img_id);
    }
    
    public function deleteShop($id)
    {
        return $this->shopRepository->deleteShop($id);
    }

    public function updateShop(Request $request)
    {
        return $this->shopRepository->updateShop($request);
    }

    public function desplegableBusquedas(string $name)
    {
        return $this->shopRepository->desplegableBusquedas($name);
    }

}