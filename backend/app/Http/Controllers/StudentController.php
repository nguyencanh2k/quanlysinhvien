<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class StudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
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
        $gender = $request->searchGender;
        $records = $request->record;
        $query = Student::query();
        if($key_words ){
            $query->where(function($query) use ($key_words) {
                $query->orWhere('username', 'LIKE', '%'.$key_words.'%')->orWhere('firstname', 'LIKE', '%'.$key_words.'%')
                ->orWhere('lastname', 'LIKE', '%'.$key_words.'%')->orWhere('phone', 'LIKE', '%'.$key_words.'%')
                ->orWhere('email', 'LIKE', '%'.$key_words.'%')->orWhere('identification', 'LIKE', '%'.$key_words.'%');
            });
            
        }
        if(!is_null($gender)){
            $query->where('gender', $gender);
        }
        // if($key_words)
        // if($key_words && $gender){
        //     $query->where('username', 'LIKE', '%'.$key_words.'%')->orWhere('firstname', 'LIKE', '%'.$key_words.'%')
        //     ->orWhere('lastname', 'LIKE', '%'.$key_words.'%')->orWhere('phone', 'LIKE', '%'.$key_words.'%')
        //     ->orWhere('email', 'LIKE', '%'.$key_words.'%')->orWhere('identification', 'LIKE', '%'.$key_words.'%')->where('gender', $gender);
        // }
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
        $student = Student::create(array_merge($validator->validated(), ['created_by' => 'admin', 'updated_by' => 'admin']));
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
        $student = Student::findOrFail($id);
        $student->update(array_merge($request->except('username'), ['updated_by' => 'admin']));
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
        $student->update(['deleted_by' => 'admin']);
        return $student;
    }
}
