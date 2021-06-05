<?php

namespace App\Services\Repositories;

use App\Models\Category;
use App\Services\Repositories\Interfaces\ICategoryRepository;
use Illuminate\Support\Facades\DB;

class CategoryRepository implements ICategoryRepository
{
    protected $category;

    public function __construct(Category $c)
    {
        $this->category = $c;
    }

    public function findAllCategories()
    {
        return $this->category->all();
    }

    public function findSubcategoryByCategoryId(int $category_id)
    {
        return $this->category->find($category_id)->subcategory;
    }

    public function findCategoryBySubcategoryId(int $subcategory_id)
    {
        $category = DB::select('SELECT subcategories.name as subcategory_name, categories.name as category_name, categories.id as category_id FROM
        categories JOIN subcategories on categories.id = subcategories.category_id
        WHERE subcategories.id = ?', [$subcategory_id]);
        return $category;
    }
}
