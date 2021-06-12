<?php

namespace App\Services;

use App\Services\Interfaces\IContactService;
use App\Services\Repositories\ContactRepository;

class ContactService implements IContactService
{
    protected $contactRepository;

    public function __construct(ContactRepository $cr)
    {
        $this->contactRepository = $cr;
    }

    public function createContact(array $data) 
    {
        return $this->contactRepository->createContact($data);
    }

}