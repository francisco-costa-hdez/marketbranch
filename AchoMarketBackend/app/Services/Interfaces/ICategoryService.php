<?php

namespace App\Services\Interfaces;

use Illuminate\Http\Request;

interface ICategoryService
{
    public function findAllCategories();

    public function findSubcategoryByCategoryId(int $category_id);

    public function findCategoryBySubcategoryId(int $subcategory_id);
}
