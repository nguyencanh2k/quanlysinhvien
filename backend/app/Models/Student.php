<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // add soft delete
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class Student extends Model
{
    use HasFactory;
    use SoftDeletes;// add soft delete
    protected $table = 'students';
    protected $fillable = [
        'username', 'firstname', 'lastname', 'phone', 
        'email', 'gender', 'identification', 'address', 'school_id', 
        'deleted_at', 'deleted_by', 'created_at', 'created_by', 'updated_at', 'updated_by'
    ];
    protected $primaryKey = 'id';

    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            $model->created_by = Auth::user()->id;
            $model->updated_by = NULL;
            $model->deleted_by = NULL;
        });

        static::updating(function ($model) {
            $model->updated_by = Auth::user()->id;
            $model->deleted_by = NULL;
        });

        // static::deleting(function ($model) {
        //     $model->deleted_by = Auth::user()->id;
        //     $model->save();
        // });
    }
}
