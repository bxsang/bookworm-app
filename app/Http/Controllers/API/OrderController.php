<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderRequest;
use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Order::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\OrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrderRequest $request)
    {
        $validated_request = $request->validated();
        $order_items = [];
        $order_amount = 0;
        foreach ($validated_request['books'] as $key => $value) {
            $book = Book::where('id', $value['book_id'])
                        ->selectFinalPrice()
                        ->first();
            $price = $value['quantity'] * $book->final_price;
            $order_amount += $price;
            $value['price'] = $price;
            array_push($order_items, $value);
        }
        try {
            $order = Order::create([
                'user_id' => $validated_request['user_id'],
                'order_date' => now(),
                'order_amount' => $order_amount
            ]);

            foreach ($order_items as $key => $value) {
                $order_item = OrderItem::create([
                    'order_id' => $order->id,
                    'book_id' => $value['book_id'],
                    'quantity' => $value['quantity'],
                    'price' => $value['price']
                ]);
            }
        } catch (\Throwable $th) {
            return response(['success' => false]);
        }

        return response(['success' => true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return $order;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return response(['success' => true]);
    }
}
