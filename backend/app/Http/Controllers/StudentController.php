<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::all();
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
            'username' => 'required|string|max:255',
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
        $student->update(array_merge($request->all(), ['updated_by' => 'admin']));
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
