<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Order;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $validated_request = $request->validated();
        $order_items = [];
        $order_amount = 0;
        $unavailable_books = [];

        foreach ($request->all() as $orders => $order) {
            if ($order['quantity'] < 1 || $order['quantity'] > 8) {
                array_push($unavailable_books, $order['book_id']);
            }

            $book = Book::where('id', $order['book_id'])
                        ->selectFinalPrice()
                        ->first();

            if (is_null($book)) {
                array_push($unavailable_books, $order['book_id']);
            } else {
                $price = $order['quantity'] * $book->final_price;
                $order_amount += $price;

                array_push($order_items, [
                    'book_id' => $order['book_id'],
                    'quantity' => $order['quantity'],
                    'price' => $price
                ]);
            }
        }

        if (!empty($unavailable_books)) {
            return response([
                'success' => false,
                'messase' => 'There are unavailable book(s)',
                'unavailable_books' => $unavailable_books
            ]);
        }

        try {
            $order = Order::create([
                'user_id' => 1,
                'order_date' => now(),
                'order_amount' => $order_amount
            ]);

            $order->orderItems()->createMany($order_items);
        } catch (\Throwable $th) {
            return response([
                'success' => false,
                'message' => $th->getMessage()
            ]);
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
