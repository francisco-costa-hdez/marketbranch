<?php

namespace App\Services;

use App\Services\Interfaces\ICategoryService;
use App\Services\Repositories\CategoryRepository;

class CategoryService implements ICategoryService
{
    protected $categoryRepository;

    public function __construct(CategoryRepository $cr)
    {
        $this->categoryRepository = $cr;
    }

    public function findAllCategories()
    {
        return $this->categoryRepository->findAllCategories();
    }

    public function findSubcategoryByCategoryId(int $category_id)
    {
        return $this->categoryRepository->findSubcategoryByCategoryId($category_id);
    }

    public function findCategoryBySubcategoryId(int $subcategory_id)
    {
        return $this->categoryRepository->findCategoryBySubcategoryId($subcategory_id);
    }
}