<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::paginate(10);
        return $users;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'firstname' => 'string|max:255',
            'lastname' => 'string|max:255',
            'gender' => 'string|max:255',
            'active' => 'string|max:255',
            'role' => 'string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|string|max:255',
            'password' => 'required|max:255'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge($validator->validated(), 
            ['password' => bcrypt($request->password),
            'created_by' => 'admin', 'updated_by' => 'admin']));
        return response()->json([
            'message' => 'User successfully created',
            'user' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $user = User::findOrFail($id);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
        return $user;
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
        $user = User::findOrFail($id);
        $user->update(array_merge($request->except('username'), ['password' => bcrypt($request->password), 'updated_by' => 'admin']));
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        $user->update(['deleted_by' => 'admin']);
        return $user;
    }
}
