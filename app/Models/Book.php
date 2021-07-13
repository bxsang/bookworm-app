<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category_id',
        'author_id',
        'book_title',
        'book_summary',
        'book_price',
        'book_cover_photo',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function availableDiscounts()
    {
        return $this->hasMany(Discount::class)
                        ->latest('discount_start_date')
                        ->whereDate('discount_start_date', '<=', now())
                        ->where(function ($query) {
                            $query->whereDate('discount_end_date', '>=', now())
                                    ->orWhere('discount_end_date', null);
                        });
    }

    public function discounts()
    {
        return $this->hasMany(Discount::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function scopeSelectFinalPrice($query)
    {
        return $query->addSelect([
            'final_price' => Discount::select(DB::raw('coalesce(discounts.discount_price, books.book_price)'))
                                        ->whereColumn('book_id', 'books.id')
                                        ->whereDate('discount_start_date', '<=', now())
                                        ->where(function ($query) {
                                            $query->whereDate('discount_end_date', '>=', now())
                                                    ->orWhere('discount_end_date', null);
                                        })
        ]);
    }

    public function scopeSelectSubPrice($query)
    {
        return $query->addSelect([
            'sub_price' => Discount::select(DB::raw('books.book_price - discounts.discount_price'))
                                        ->whereColumn('book_id', 'books.id')
                                        ->whereDate('discount_start_date', '<=', now())
                                        ->where(function ($query) {
                                            $query->whereDate('discount_end_date', '>=', now())
                                                    ->orWhere('discount_end_date', null);
                                        })
        ]);
    }

    public function scopeSortByOnSale($query)
    {
        return $query->whereHas('availableDiscounts')
                        ->selectFinalPrice()
                        ->selectSubPrice()
                        ->orderByDesc('sub_price')
                        ->orderBy('final_price')
                        ->take(10);
    }
}
