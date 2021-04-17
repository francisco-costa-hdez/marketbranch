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

    public function findShopByString(string $string)
    {
        return $this->findShopByString($string);
    }

    public function findShopByProduct(int $product_id)
    {
        return $this->shopRepository->findShopByProduct($product_id);
    }

    public function createShop(Request $request)
    {
        $this->shopRepository->createShop($request);
    }

    public function updateShop(Request $request)
    {
        $this->updateShop($request);
    }

    public function uploadShopImage(Request $request)
    {
        $this->shopRepository->uploadShopImage($request);
    }

    public function deleteShopImage($img_id)
    {
        $this->shopRepository->deleteShopImage($img_id);
    }
    
    public function deleteShop($id)
    {
        $this->shopRepository->deleteShop($id);
    }

}