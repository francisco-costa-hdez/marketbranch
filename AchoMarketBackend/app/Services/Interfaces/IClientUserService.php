<?php

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

interface IClientUserService
{
    public function findClientUserById(int $id);

    public function createClientUser(Request $request);

    public function updateClientUser(Request $request);

    public function login(Request $request);

    public function logout(Request $request);

    public function deleteClientUser(int $id);
}
