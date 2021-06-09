<?php

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

interface IClientUserService
{
    public function findClientUserById(int $id);

    public function createClientUser(Request $data, String $confirmation_code);

    public function updateClientUser(Request $request, array $data);

    public function login(Request $request);

    public function logout(Request $request);

    public function deleteClientUser(int $id);
}
