<template>
  <div class="container mt-4">
    <h3>Tasks</h3>
    <button class="btn btn-primary mb-3" @click="openModal()">Add Task</button>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ formatDate(task.due_date) }}</td>
          <td>{{ task.status }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="openModal(task)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="tasks.length === 0">
          <td colspan="5" class="text-center">No tasks found</td>
        </tr>
      </tbody>
    </table>

    <TaskModal
      :show="showModal"
      :task="currentTask"
      @save="saveTask"
      @close="closeModal"
    />
  </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import { useTaskStore } from '../stores/tasks';
import TaskModal from '../components/TaskModal.vue';

export default {
  components: { TaskModal },
  data() {
    return {
      tasks: [],
      showModal: false,
      currentTask: {
        id: null,
        title: '',
        description: '',
        due_date: '',
        status: 'pending',
      },
    };
  },
  async created() {
    await this.loadTasks();
  },
  methods: {
    async loadTasks() {
      const taskStore = useTaskStore();
      
      await taskStore.fetchTasks();
      this.tasks = taskStore.tasks;
    },
    openModal(task = null) {
      if (task) {
        this.currentTask = { ...task };
      } else {
        this.currentTask = {
          id: null,
          title: '',
          description: '',
          due_date: '',
          status: 'pending',
        };
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async saveTask(task) {
      const taskStore = useTaskStore();
      try {
        if (task.id) {
          await taskStore.updateTask(task);
          toast.success('Task updated successfully!');
        } else {
          await taskStore.addTask(task);
          toast.success('Task added successfully!');
        }
        this.closeModal();
        await this.loadTasks();
      } catch (error) {
        toast.error(`Error saving task: ${error.message}`);
      }
    },
    async deleteTask(id) {
      if (!confirm('Are you sure you want to delete this task?')) return;
      const taskStore = useTaskStore();
      try {
        await taskStore.deleteTask(id);
        toast.success('Task deleted successfully!');
        await this.loadTasks();
      } catch (error) {
        toast.error(`Error deleting task: ${error.message}`);
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return d.toLocaleDateString();
    },
  },
};
</script>
