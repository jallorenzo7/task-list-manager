<?php

namespace App\Repositories\Eloquent;

use App\Models\Task;
use App\Repositories\TaskRepositoryInterface;

class EloquentTaskRepository implements TaskRepositoryInterface
{
    public function all()
    {
        return Task::all();
    }

    public function create(array $data)
    {
        return Task::create($data);
    }

    public function update(Task $task, array $data)
    {
        $task->update($data);
        return $task;
    }

    public function delete(Task $task)
    {
        return $task->delete();
    }
}