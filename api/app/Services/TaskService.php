<?php

namespace App\Services;

use App\Repositories\TaskRepositoryInterface;
use App\Models\Task;

class TaskService
{
    protected $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function getAllTasks()
    {
        $user = auth()->user();
        return $user->tasks()->get();
    }

    public function createTask(array $data)
    {
        return $this->taskRepository->create($data);
    }

    public function updateTask(Task $task, array $data)
    {
        return $this->taskRepository->update($task, $data);
    }

    public function deleteTask(Task $task)
    {
        return $this->taskRepository->delete($task);
    }
}