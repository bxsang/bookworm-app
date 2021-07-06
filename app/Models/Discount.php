<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Discount extends Model
{
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function scopeMostDiscount($query)
    {
        return $query->whereDate('discount_start_date', '<=', now())
                        ->where(function ($query) {
                            $query->whereDate('discount_end_date', '>=', now())
                                    ->orWhere('discount_end_date', null);
                        })
                        ->orderBy('discount_price', 'DESC')
                        ->take(10);
    }
}
