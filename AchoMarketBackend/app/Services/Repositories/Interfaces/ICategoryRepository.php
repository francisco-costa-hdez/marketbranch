<?php

namespace App\Services\Repositories\Interfaces;

interface ICategoryRepository
{
    public function findAllCategories();

    public function findSubcategoryByCategoryId(int $category_id);

    public function findCategoryBySubcategoryId(int $subcategory_id);
}