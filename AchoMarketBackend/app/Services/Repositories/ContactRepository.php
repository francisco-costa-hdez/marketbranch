<?php

namespace App\Services\Repositories;

use App\Models\Contact;
use App\Services\Repositories\Interfaces\IContactRepository;
use Illuminate\Support\Facades\DB;

class ContactRepository implements IContactRepository
{
    protected $contact;
    public function __construct(Contact $contact)
    {
        $this->contact = $contact;
    }
    public function createContact(array $data)
    {   
        $this->contact->create($data);
        return response()->json(['message' => 'Mensaje enviado correctamente']);
    }
}
