<?php

namespace App;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;

enum Category: string
{
    case Skincare = 'skincare';
    case Haircare = 'haircare';
    case Fashion = 'fashion';
    case Food = 'food';
    case Electronics = 'electronics';
    case Home = 'home';

    /**
     * Products in this category.
     *
     * @return Builder<Product>
     */
    public function products(): Builder
    {
        return Product::query()->where('category', $this->value);
    }
}
