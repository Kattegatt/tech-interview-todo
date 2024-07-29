<!-- TaskElem.vue -->
<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const taskText = ref(props.task.text)
const isEditing = ref(false)
const emit = defineEmits(['deleteTask', 'editTask'])

watchEffect(() => {
  taskText.value = props.task.text
})

function emitDelete() {
  emit('deleteTask', props.task.id)
}

function emitEdit() {
  emit('editTask', { id: props.task.id, text: taskText.value })
  isEditing.value = false
}

function openTaskEdit() {
  isEditing.value = true
}
</script>

<template>
  <div class="task-elem">
    <div v-if="!isEditing" @click="openTaskEdit">{{ taskText }}</div>
    <div v-if="isEditing" class="edit-task">
      <textarea v-model="taskText"></textarea>
      <button @click="emitEdit">Done</button>
    </div>
    <button @click="emitDelete">Delete</button>
  </div>
</template>

<style scoped>
.task-elem {
  color: white;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  background-color: gray;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.edit-task {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

button {
  background-color: slategrey;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>
