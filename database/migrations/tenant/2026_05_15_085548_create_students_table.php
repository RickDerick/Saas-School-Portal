<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('admission_number')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->date('dob')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('parents')->nullOnDelete();
            $table->foreignId('current_class_id')->nullable()->constrained('classes')->nullOnDelete();
            $table->enum('status', ['active', 'inactive', 'graduated', 'withdrawn'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
