<?php

namespace App\Providers;

use App\Services\CategoryService;
use App\Services\ClientUserService;
use App\Services\ContactService;
use App\Services\ErrorService;
use App\Services\Interfaces\ICategoryService;
use App\Services\Interfaces\IClientUserService;
use App\Services\Interfaces\IContactService;
use App\Services\Interfaces\IErrorService;
use App\Services\Interfaces\IProductService;
use App\Services\Interfaces\IShopService;
use App\Services\ProductService;
use App\Services\ShopService;
use Illuminate\Support\ServiceProvider;

class AchoMarketProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    protected $bindings = [
        IProductService::class => ProductService::class,
        IShopService::class => ShopService::class,
        ICategoryService::class => CategoryService::class,
        IClientUserService::class => ClientUserService::class,
        IErrorService::class => ErrorService::class,
        IContactService::class => ContactService::class
    ];
}
