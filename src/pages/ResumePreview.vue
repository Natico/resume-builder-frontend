<template>
  <q-page class="q-pa-md">
    <div v-if="loading" class="text-center q-my-lg">
      <q-spinner color="primary" size="40px" />
      <div class="q-mt-md">Loading Preview...</div>
    </div>
    <iframe
      v-else
      class="bg-white q-pa-lg"
      style="min-height: 500px; width: 100%; border: none; height: 90vh;"
      :srcdoc="renderedHtml"
    />
    <div class="text-center ">
      <q-btn
        :label="$t('resume.edit')"
        color="primary"
        icon="edit"
        @click="goBackToForm"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Handlebars from 'handlebars'

const router = useRouter()
const data = ref({})

const renderedHtml = ref('')
const loading = ref(true)

onMounted(() => {
  try {
    const saved = localStorage.getItem('resumeData')
    if (saved) {
      data.value = JSON.parse(saved)
      fetchTemplateAndRender()
    } else {
      renderedHtml.value = '<p style="color:red;">No resume data found.</p>'
      loading.value = false
    }
  } catch {
    renderedHtml.value = '<p style="color:red;">Invalid data</p>'
    loading.value = false
  }
})

async function fetchTemplateAndRender () {
  try {
    const templateName = data.value.templateName || 'template_default'
    const response = await axios.get('http://localhost:3000/template', {
      params: { name: templateName }
    })
    const templateSource = response.data
    const template = Handlebars.compile(templateSource)
    renderedHtml.value = template(data.value)
  } catch (err) {
    renderedHtml.value = '<p style="color:red;">Error loading template.</p>'
    console.error(err)
  } finally {
    loading.value = false
  }
}

function goBackToForm() {
  router.push({ path: '/resume' })
}
</script>
