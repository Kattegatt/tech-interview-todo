<script setup>
import { ref } from 'vue'

const taskText = ref('')

const isEditing = ref(false)
const emit = defineEmits(['createTask'])

function emitCreate() {
  isEditing.value = false

  if (taskText.value.trim() === '') {
    return
  } else {
    console.log('edit task')
    emit('createTask', taskText.value)
    taskText.value = ''
  }
}

function openTaskEdit() {
  isEditing.value = true
}
</script>

<template>
  <div class="task-elem">
    <button class="create-button" v-if="!isEditing" @click="openTaskEdit">New Task</button>
    <div v-if="isEditing" class="edit-task">
      <textarea v-model="taskText"></textarea>
      <button @click="emitCreate">Done</button>
    </div>
  </div>
</template>

<style scoped>
.edit-task {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
</style>
