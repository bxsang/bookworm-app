<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthRegisterRequest;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request)
    {
        $validated_request = $request->validated();
        $validated_request['password'] = Hash::make($request->password);
        $user = User::create($validated_request);

        return response($user);
    }

    public function login(AuthLoginRequest $request)
    {
        $validated_request = $request->validated();
        if (!auth()->attempt($validated_request)) {
            return response(['message' => 'Wrong username or password'], 401);
        }
        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response(['user' => auth()->user(), 'access_token' => $accessToken]);
    }
}
