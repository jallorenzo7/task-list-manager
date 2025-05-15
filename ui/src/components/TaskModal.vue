<template>
  <div v-if="show" class="modal fade show d-block" tabindex="-1" role="dialog" style="background: rgba(0,0,0,0.5);">
    <div class="modal-dialog" role="document">
      <form @submit.prevent="handleSubmit" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ task.id ? 'Edit Task' : 'Add Task' }}</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              id="title"
              v-model="localTask.title"
              type="text"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="localTask.description"
              class="form-control"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="due_date" class="form-label">Due Date</label>
            <input
              id="due_date"
              v-model="localTask.due_date"
              type="date"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select id="status" v-model="localTask.status" class="form-select" required>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
          <button type="submit" class="btn btn-primary">{{ task.id ? 'Update' : 'Add' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskModal',
  props: {
    show: Boolean,
    task: {
      type: Object,
      default: () => ({
        id: null,
        title: '',
        description: '',
        due_date: '',
        status: 'pending',
      }),
    },
  },
  data() {
    return {
      localTask: { ...this.task },
    };
  },
  watch: {
    task: {
      handler(newTask) {
        this.localTask = { ...newTask };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('save', this.localTask);
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
