<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $stars_list = [
            '1' => 0,
            '2' => 0,
            '3' => 0,
            '4' => 0,
            '5' => 0,
        ];
        if ($this->reviews->isNotEmpty()) {
            foreach ($this->reviews as $key => $value) {
                $stars_list[$value['rating_start']] += 1;
            }
        }

        return [
            'id' => $this->id,
            'book_title' => $this->book_title,
            'book_summary' => $this->book_summary,
            'book_price' => $this->book_price + 0,
            'book_cover_photo' => $this->book_cover_photo,
            'category' => $this->category,
            'author' => $this->author,
            // 'discounts' => $this->availableDiscounts,
            // 'reviews' => $this->reviews,
            // 'sub_price' => $this->sub_price + 0,
            'final_price' => $this->final_price + 0,
            'avg_star' => $this->avg_star + 0,
            'reviews_count' => $this->reviews_count + 0,
            'star_list' => $stars_list,
        ];
    }
}
