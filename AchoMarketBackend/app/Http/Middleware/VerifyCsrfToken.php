<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/api/clientuser/create',
        '/api/clientuser/login',
        '/api/clientuser/update',
        '/api/clientuser/pass/update',
        '/api/clientuser/logout',
        '/api/shopuser/create',
        '/api/shopuser/login',
        '/api/shopuser/update',
        '/api/shopuser/pass/update',
        '/api/shopuser/logout',
        '/api/products/create',
        '/api/products/update/{id}',
        '/api/products/uploadImage',
        '/api/shop/create',
        '/api/shop/uploadImage',
        '/api/shop/update',
        '/api/cart/add/{product_id}/{user_id}',
        '/api/review/create',
        '/api/review/update/{review_id}',
    ];
}