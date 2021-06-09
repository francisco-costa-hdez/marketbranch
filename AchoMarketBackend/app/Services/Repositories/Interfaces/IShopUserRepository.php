<?php

namespace App\Services\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IShopUserRepository
{
    public function findShopUserById(int $id);

    public function createShopUser(Request $request, String $confirmation_code);

    public function updateShopUser(Request $request, array $data);

    public function login(Request $request);

    public function logout(Request $request);
    
    public function updatePassword(Request $request);
    
    public function deleteShopUser(int $id);
}