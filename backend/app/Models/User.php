<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes; // add soft delete
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Auth;
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes;// add soft delete
    use HasRoles;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username', 'firstname', 'lastname', 'gender', 'active', 
        'phone', 'email', 'password', 'role',
        'deleted_at', 'deleted_by', 'created_at', 'created_by', 'updated_at', 'updated_by'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'phone' => $this->phone,
            'email' => $this->email,
            'role' => $this->getRoleNames(),
        ];
    }
    
    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            $model->created_by = Auth()->user()->id;
            $model->updated_by = NULL;
            $model->deleted_by = NULL;
        });

        static::updating(function ($model) {
            $model->updated_by = Auth()->user()->id;
            $model->deleted_by = NULL;
        });

        // static::deleting(function ($model) {
        //     $model->deleted_by = Auth()->user()->id;
        //     $model->save();
        // });
    }
}
