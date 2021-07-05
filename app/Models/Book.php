<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

    public function discount()
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
}
