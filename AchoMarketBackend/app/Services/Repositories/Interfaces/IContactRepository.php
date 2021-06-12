<?php

namespace App\Services\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IContactRepository
{
    public function createContact(array $data);
}