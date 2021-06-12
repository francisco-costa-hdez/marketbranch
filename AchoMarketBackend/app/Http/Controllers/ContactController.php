<?php

namespace App\Http\Controllers;

use App\Services\ContactService;
use App\Services\ErrorService;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $cs)
    {
        $this->contactService = $cs;
    }

    public function createContact(Request $request) 
    {
        return $this->contactService->createContact($request->all());
    }
}
