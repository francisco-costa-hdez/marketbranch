<?php

namespace App\Services;

use App\Services\Interfaces\IShopUserService;
use App\Services\Repositories\ShopUserRepository;
use Illuminate\Http\Request;

class ShopUserService implements IShopUserService
{
    protected $shopUserRepository;

    public function __construct(ShopUserRepository $shopUserRepository)
    {
        $this->shopUserRepository = $shopUserRepository;
    }

    public function findShopUserById(int $id)
    {
        return $this->shopUserRepository->findShopUserById($id);
    }

    public function createShopUser(Request $request)
    {
        $this->shopUserRepository->createShopUser($request);
    }

    public function updateshopUser(Request $request)
    {
        $this->shopUserRepository->updateshopUser($request);
    }
    
    public function deleteShopUser(int $id)
    {
        $this->shopUserRepository->deleteShopUser($id);
    }

}
