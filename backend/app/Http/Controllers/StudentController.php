<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Framework\Constraint\IsNull;

class StudentController extends Controller
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
        $query = Student::query();
        if($key_words && $searchType){
            $query->where($searchType, 'LIKE', '%'.$key_words.'%');
        }
        if($records){
            $students = $query->paginate($records);
        }else{
            $students = $query->paginate(10);
        }
        return $students;
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
            'username' => 'required|string|max:255|unique:students,username',
            'firstname' => 'string|max:255',
            'lastname' => 'string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|string|max:255|unique:students,email',
            'gender' => 'string|max:255',
            'identification' => 'string|max:255',
            'address' => 'required|max:255',
            'school_id' => 'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user_by = Auth::user()->username;
        $student = Student::create($validator->validated());
        return response()->json([
            'message' => 'Student successfully created',
            'student' => $student
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
            $student = Student::findOrFail($id);
        }catch(ModelNotFoundException $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
        return $student;
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
        $validator = Validator::make($request->except('username'), [
            'firstname' => 'string|max:255',
            'lastname' => 'string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|string|max:255',
            'gender' => 'string|max:255',
            'identification' => 'string|max:255',
            'address' => 'required|max:255',
            'school_id' => 'required|max:255',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $student = Student::findOrFail($id);
        $user_by = Auth::user()->username;
        $student->update($validator->validated());
        return $student;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return $student;
    }
}
