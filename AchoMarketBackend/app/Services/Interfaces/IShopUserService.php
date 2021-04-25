<?php

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

interface IShopUserService
{
    public function findShopUserById(int $id);

    public function createShopUser(Request $request);

    public function updateshopUser(Request $request);

    public function login(Request $request);

    public function logout(Request $request);
    
    public function deleteShopUser(int $id);
}
