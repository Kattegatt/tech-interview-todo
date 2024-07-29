<script setup>
import TaskElem from './TaskElem.vue'
import AddTask from './AddTask.vue'

import Endpoints from '../api/endpoints.js'
import { ref, onBeforeMount } from 'vue'

onBeforeMount(() => {
  fetchTasks()
})

const BASE_URL = Endpoints.BASE_URL
const USER_ID = '1234'

const tasks = ref([])

async function fetchTasks() {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: USER_ID
  }
  try {
    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'GET',
      headers: headers
    })
    const data = await response.json()
    console.log(data)
    tasks.value = data
  } catch (error) {
    console.error(error)
  }
}

async function createTask(task) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: USER_ID
  }
  const body = {
    text: task
  }

  try {
    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    if (response.ok) {
      console.log('Task created successfully')
      const data = await response.json()
      console.log(data)
      // tasks.value.push(data)
      fetchTasks()
    }
  } catch (error) {
    console.error(error)
  }
}

async function deleteTask(id) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: USER_ID
  }
  try {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: headers
    })
    if (response.ok) {
      console.log('Task deleted successfully')
      const data = await response.json()
      console.log('deleted task', data)
      tasks.value = tasks.value.filter((task) => task.id !== id)
    }
  } catch (error) {
    console.error(error)
  }
}

async function editTask({ id, text }) {
  console.log('on update task', id, text)
  const headers = {
    'Content-Type': 'application/json',
    Authorization: USER_ID
  }
  const body = {
    text: text
  }

  try {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    })
    if (response.ok) {
      console.log('Task updated successfully')
      // const data = await response.json()
      // tasks.value = tasks.value.map((task) => {
      //   if (task.id === id) {
      //     return data
      //   }
      //   return task
      // })
      fetchTasks()
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="container">
    <div class="tasks-list" v-if="tasks.length != 0">
      <TaskElem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @deleteTask="deleteTask"
        @editTask="editTask"
      />
    </div>
    <AddTask @createTask="createTask" />
  </div>
</template>

<style scoped>
.tasks-list {
  padding: 1rem;
  background-color: rgb(58, 54, 54);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 75%;
  border-radius: 0.75rem;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
