<?php

namespace App\Services;

use App\Services\Interfaces\IClientUserService;
use App\Services\Repositories\ClientUserRepository;
use Illuminate\Http\Request;

class ClientUserService implements IClientUserService
{
    protected $clientUserRepository;

    public function __construct(ClientUserRepository $clientUserRepository)
    {
        $this->clientUserRepository = $clientUserRepository;
    }

    public function findClientUserById(int $id)
    {
        return $this->clientUserRepository->findClientUserById($id);
    }

    public function createClientUser(Request $data, $confirmation_code)
    {
       return $this->clientUserRepository->createClientUser($data, $confirmation_code);
    }

    public function logout(Request $request)
    {
        return $this->clientUserRepository->logout($request);
    }
    
    public function login(Request $request)
    {
        return $this->clientUserRepository->login($request);
    }
    
    public function updateClientUser(Request $request, array $data)
    {
       return $this->clientUserRepository->updateClientUser($request, $data);
    }

    public function updatePassword(Request $request)
    {
       return $this->clientUserRepository->updatePassword($request);
    }

    public function deleteClientUser(int $id)
    {
       return $this->clientUserRepository->deleteClientUser($id);
    }
}
