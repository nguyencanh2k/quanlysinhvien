<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
        // $this->middleware(['role:QLHT']);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $key_words = $request->search;
        $searchType = $request->searchType;
        $records = $request->record;
        $query = User::query();
        if($key_words && $searchType){
            $query->where($searchType, 'LIKE', '%'.$key_words.'%');
        }
        if($records){
            $users = $query->paginate($records);
        }else{
            $users = $query->paginate(10);
        }
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
        $validator = Validator::make($request->except('role'), [
            'username' => 'required|string|max:255|unique:users,username',
            'firstname' => 'string|max:255',
            'lastname' => 'string|max:255',
            'gender' => 'string|max:255',
            'active' => 'string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|string|max:255|unique:users,email',
            'password' => 'required|max:255'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user_by = Auth::user()->username;
        $user = User::create(array_merge($validator->validated(), 
            ['password' => bcrypt($request->password)]));
        $user_role = User::find($user->id);
        $user_role->assignRole($request->role);
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
            $user_role = $user->getRoleNames();
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
        $validator = Validator::make($request->except('username', 'role'), [
            'firstname' => 'string|max:255',
            'lastname' => 'string|max:255',
            'gender' => 'string|max:255',
            'active' => 'string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|string|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::findOrFail($id);
        $user_by = Auth::user()->username;
        $user->update($validator->validated());
        $user->syncRoles($request->role);
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
        return $user;
    }
}
