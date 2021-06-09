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

    public function createShopUser(Request $request, String $confirmation_code)
    {
        return $this->shopUserRepository->createShopUser($request,$confirmation_code);
    }

    public function login(Request $request)
    {
        return $this->shopUserRepository->login($request);
    }

    public function logout(Request $request)
    {
        return $this->shopUserRepository->logout($request);
    }

    public function updateShopUser(Request $request, array $data)
    {
        return $this->shopUserRepository->updateShopUser($request, $data);
    }
    
    public function deleteShopUser(int $id)
    {
        return $this->shopUserRepository->deleteShopUser($id);
    }

    public function updatePassword(Request $request)
    {
        return $this->shopUserRepository->updatePassword($request);
    }

}
