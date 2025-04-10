<template>
  <q-page class="q-pa-md flex flex-center items-center">
    <div class="q-gutter-md" style="width: 100%; max-width: 900px;">
      
      <h1 class="text-center text-primary">{{ $t('resume.title') }}</h1>
      <div class="q-mb-md">
        <q-btn color="grey-7" icon="arrow_back" :label="$t('resume.backToHome')" flat @click="goHome" />
      </div>
      <q-form @submit.prevent="submitForm" class="q-gutter-md">
        <h5 class="q-mt-md row items-center justify-between">
          <span>{{ $t('resume.personalInfo') }}</span>
          <div>
            <q-btn dense flat icon="upload" :label="$t('resume.importData')" @click="importData" class="q-mr-sm" />
            <q-btn dense flat icon="download" :label="$t('resume.exportData')" @click="exportData" />
          </div>
        </h5>
        <div>
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-md-7 q-gutter-md">
              <q-input filled v-model="name" :label="$t('resume.fullName')" lazy-rules :rules="[val => !!val || 'Required']" />
              <q-input filled v-model="jobTitle" :label="$t('resume.jobTitle')" lazy-rules :rules="[val => !!val || 'Required']" />
              <q-input filled v-model="phone" :label="$t('resume.phone')" />
            </div>
            <div class="col-12 col-md-5">
              <div class="q-pa-sm" style="border: 1px solid #ccc; border-radius: 8px;">
                <div class="q-mb-sm text-center">
                 
                  <q-img
                    :src="avatar || 'https://www.w3schools.com/howto/img_avatar.png'"
                    style="max-width: 150px; max-height: 150px; border-radius: 8px;"
                    spinner-color="primary"
                    class="q-mb-sm"
                  />
                </div>
                <div class="row q-gutter-sm items-center q-mb-sm justify-center">
                  <q-btn
                    :disable="!!avatar"
                    color="primary"
                    icon="photo_camera"
                    :label="$t('resume.uploadAvatar')"
                    @click="triggerAvatarInput"
                  />
                  <q-btn
                    :disable="!avatar"
                    color="negative"
                    icon="delete"
                    :label="$t('resume.deleteAvatar')"
                    @click="removeAvatar"
                  />
                </div>
                <input
                  ref="hiddenAvatarInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleAvatarChange"
                />
               
              </div>
            </div>
          </div>
         
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-md-6 q-gutter-md">
              <q-input filled v-model="email" :label="$t('resume.email')" />
              <q-input filled v-model="location" :label="$t('resume.location')" />
            </div>
            <div class="col-12 col-md-6">
              <q-input filled v-model="summary" :label="$t('resume.summary')" type="textarea" />
            </div>
          </div>

        </div>

        <q-separator />
        <div>
          <h5 class="q-mt-md row items-center">
            <span class="col">{{ $t('resume.socialLinks') }}</span>
            <q-btn dense flat icon="add" :label="$t('resume.addSocial')" @click="addSocial" class="q-ml-sm" />
          </h5>
          <div v-for="(social, index) in socials" :key="index" class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col">
              <q-input filled v-model="socials[index].platform" :label="$t('resume.platform')" />
            </div>
            <div class="col">
              <q-input filled v-model="socials[index].url" :label="$t('resume.url')" />
            </div>
          </div>
        </div>

        <q-separator />
        <div>
          <h5 class="q-mt-md row items-center">
            <span class="col">{{ $t('resume.skills') }}</span>
            <q-btn dense flat icon="add" :label="$t('resume.addSkill')" @click="addSkill" class="q-ml-sm" />
          </h5>
          <div v-for="(skill, index) in skills" :key="index" class="row q-col-gutter-sm items-center q-mb-sm">
            <div class="col-12 col-md-6">
              <q-input filled v-model="skills[index].name" :label="$t('resume.skill')" />
            </div>
            <div class="col-12 col-md-6">
              <q-item-label>{{ $t('resume.level') }}</q-item-label>
              <q-slider
                v-model="skills[index].level"
                label
                label-always
                markers
                :min="0"
                :max="100"
                :step="1"
              />
            </div>
          </div>
        </div>

        <q-separator />
        <div>
          <h5 class="q-mt-md row items-center">
            <span class="col">{{ $t('resume.workExperience') }}</span>
            <q-btn dense flat icon="add" :label="$t('resume.addExperience')" @click="addExperience" class="q-ml-sm" />
          </h5>
          <div v-for="(exp, index) in experience" :key="index" class="q-mb-md">
            <q-input filled v-model="experience[index].company" :label="$t('resume.company')" />
            <q-input filled v-model="experience[index].role" :label="$t('resume.role')" />
              <div class="row items-center q-col-gutter-sm">
              <div class="col-12 col-md-4">
                <q-input filled v-model="experience[index].startDate" :label="$t('resume.startDate')" readonly>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date
                          v-model="experience[index].startDate"
                          mask="YYYY/MM/DD"
                          :calendar="isFaLocale ? 'persian' : 'gregorian'"
                          :locale="isFaLocale ? faIR : enUS"
                        />

                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input filled v-model="experience[index].endDate" :label="$t('resume.endDate')" readonly>
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy>
                        <q-date
                          v-model="experience[index].endDate"
                          mask="YYYY/MM/DD"
                          :calendar="isFaLocale ? 'persian' : 'gregorian'"
                          :locale="isFaLocale ? faIR : enUS"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <div class="text-subtitle2 text-grey" v-if="experience[index].startDate && experience[index].endDate">
                  {{ $t('resume.durationPrefix') }} {{ calculateDuration(experience[index].startDate, experience[index].endDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <q-separator />
        <div>
          <h5 class="q-mt-md row items-center">
            <span class="col">{{ $t('resume.projects') }}</span>
            <q-btn dense flat icon="add" :label="$t('resume.addProject')" @click="addProject" class="q-ml-sm" />
          </h5>
          <div v-for="(project, index) in projects" :key="index" class="q-mb-md">
            <q-input filled v-model="projects[index].title" :label="$t('resume.projectTitle')" />
            <q-input filled v-model="projects[index].description" :label="$t('resume.description')" type="textarea" autogrow />
            <q-input
              filled
              :label="$t('resume.technologies')"
              v-model="projects[index].technologiesString"
            />
          </div>
        </div>
        <q-select v-model="selectedTemplate" :options="templateOptions" :label="$t('resume.selectTemplate')" filled class="q-mb-md" />
        
        <q-btn-group spread class="q-mt-md">
          <q-btn :label="$t('resume.downloadPDF')" type="submit" color="primary" unelevated />
          <q-btn :label="$t('resume.preview')" color="secondary" flat @click="previewResume" />
          <q-btn :label="$t('resume.reset')" color="negative" flat @click="resetForm" />
          <q-btn :label="$t('resume.clearAndClose')" color="negative" flat @click="clearAndClose" />
        </q-btn-group>
      </q-form>
    </div>
  </q-page>
</template> 

<script setup>
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import faIR from 'quasar/lang/fa-IR'
import enUS from 'quasar/lang/en-US'

const { locale } = useI18n()

const isFaLocale = computed(() => locale.value.startsWith('fa'))

const router = useRouter()


// Form fields as refs
const name = ref('')
const jobTitle = ref('')
const summary = ref('')
const email = ref('')
const phone = ref('')
const location = ref('')
const avatar = ref('')
const hiddenAvatarInput = ref(null)
const socials = ref([{ platform: '', url: '' }])
const skills = ref([{ name: '', level: 50 }])
const experience = ref([{ company: '', role: '', startDate: '', endDate: '', period: '' }])
const projects = ref([{ title: '', description: '', technologies: '' }])
const selectedTemplate = ref('template_01')
const templateOptions = ref([])


// Computed property to aggregate form data (optional)
const formData = computed(() => ({
  personalInfo: {
    fullName: name.value,
    jobTitle: jobTitle.value,
    summary: summary.value,
    email: email.value,
    phone: phone.value,
    location: location.value,
    avatar: avatar.value,
    socials: socials.value
  },
  skills: skills.value.filter(s => s.name.trim() !== ''),
  experience: experience.value.map(exp => ({
    ...exp,
    period: exp.startDate && exp.endDate
      ? calculateDuration(exp.startDate, exp.endDate)
      : ''
  })),
  projects: projects.value.map(p => ({
    ...p,
    technologies: typeof p.technologies === 'string'
      ? p.technologies.split(',').map(t => t.trim())
      : Array.isArray(p.technologies)
        ? p.technologies
        : []
  })),
  templateName: selectedTemplate.value
}))

// Watch the formData and update localStorage on changes
watch(formData, (newVal) => {
  localStorage.setItem('resumeData', JSON.stringify(newVal))
}, { deep: true })

// On mounted, prefill form from localStorage and fetch template options
onMounted(async () => {
  try {
    const saved = localStorage.getItem('resumeData')
    if (saved) {
      const parsed = JSON.parse(saved)
      name.value = parsed.personalInfo.fullName || ''
      jobTitle.value = parsed.personalInfo.jobTitle || ''
      summary.value = parsed.personalInfo.summary || ''
      email.value = parsed.personalInfo.email || ''
      phone.value = parsed.personalInfo.phone || ''
      location.value = parsed.personalInfo.location || ''
      avatar.value = parsed.personalInfo.avatar || ''
      skills.value = parsed.skills && parsed.skills.length > 0
        ? parsed.skills
        : [{ name: '', level: 50 }]
      socials.value = Array.isArray(parsed.personalInfo?.socials)
        ? parsed.personalInfo.socials
        : [{ platform: '', url: '' }]
      experience.value = parsed.experience && parsed.experience.length > 0
        ? parsed.experience
        : [{ company: '', role: '', startDate: '', endDate: '', period: '' }]
      projects.value = parsed.projects && parsed.projects.length > 0
        ? parsed.projects
        : [{ title: '', description: '', technologies: '' }]
      projects.value.forEach(project => {
        project.technologiesString = Array.isArray(project.technologies)
          ? project.technologies.join(', ')
          : project.technologies || ''
      })
      selectedTemplate.value = parsed.templateName || 'template_01'
    }
  } catch (err) {
    console.error('Error parsing localStorage data:', err)
  }

  try {
    const res = await axios.get('http://localhost:3000/templates')
    templateOptions.value = res.data
  } catch (e) {
    console.error('Failed to fetch template list:', e)
  }
})


function triggerAvatarInput() {
  hiddenAvatarInput.value?.click()
}

function handleAvatarChange(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    avatar.value = e.target.result
    console.log('Avatar base64 updated:', avatar.value)
  }
  reader.readAsDataURL(file)
}

function removeAvatar() {
  avatar.value = ''
  hiddenAvatarInput.value.value = ''
}

// Function to calculate duration between two dates
function calculateDuration(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return ''
  
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12
  months += endDate.getMonth() - startDate.getMonth()

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  const formatNumber = (n) => {
    return isFaLocale.value
      ? n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
      : n.toString()
  }
  
  return `${years > 0 ? formatNumber(years) + ' ' + $t('resume.years') : ''}${years > 0 && remainingMonths > 0 ? ' ' + $t('resume.and') + ' ' : ''}${remainingMonths > 0 ? formatNumber(remainingMonths) + ' ' + $t('resume.months') : ''}`;
}

// Function to handle PDF download
async function submitForm() {
  const dataToSend = {
    personalInfo: {
      fullName: name.value,
      jobTitle: jobTitle.value,
      summary: summary.value,
      email: email.value,
      phone: phone.value,
      location: location.value,
      avatar: avatar.value,
      socials: socials.value
    },
    skills: skills.value.filter(s => s.name.trim() !== ''),
    experience: experience.value.map(exp => ({
      ...exp,
      period: exp.startDate && exp.endDate
        ? calculateDuration(exp.startDate, exp.endDate)
        : ''
    })),
    projects: projects.value.map(p => ({
      ...p,
      technologies: typeof p.technologies === 'string'
        ? p.technologies.split(',').map(t => t.trim())
        : Array.isArray(p.technologies)
          ? p.technologies
          : []
    })),
    templateName: selectedTemplate.value
  }

  console.log('Sending data for PDF generation:', JSON.stringify(dataToSend, null, 2))

  try {
    const res = await axios.post('http://localhost:3000/generate', dataToSend, {
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'resume.pdf')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
    // localStorage.removeItem('resumeData')
    // router.push('/')
  } catch (err) {
    console.error('Error generating PDF:', err)
    alert('An issue occurred while generating the PDF file.')
  }
}

// Function to preview resume
function previewResume() {
  // localStorage is already updated via watcher; navigate to preview page
  router.push({ name: 'resume-preview' })
}

// Function to reset the form
function resetForm() {
  name.value = ''
  jobTitle.value = ''
  summary.value = ''
  email.value = ''
  phone.value = ''
  location.value = ''
  avatar.value = ''
  socials.value = [{ platform: '', url: '' }]
  skills.value = [{ name: '', level: 50 }]
  experience.value = [{ company: '', role: '', startDate: '', endDate: '', period: '' }]
  projects.value = [{ title: '', description: '', technologies: '' }]
  selectedTemplate.value = 'template_01'
  localStorage.removeItem('resumeData')
}

// Function to add a new social link
function addSocial() {
  socials.value.push({ platform: '', url: '' })
}

// Function to add a new skill
function addSkill() {
  skills.value.push({ name: '', level: 50 })
}

// Function to add a new experience
function addExperience() {
  experience.value.push({ company: '', role: '', startDate: '', endDate: '', period: '' })
}

// Function to add a new project
function addProject() {
  projects.value.push({ title: '', description: '', technologies: '' })
}

// Function to go home
function goHome() {
  router.push('/')
}

// Function to clear localStorage and close the form
function clearAndClose() {
  localStorage.removeItem('resumeData')
  router.push('/')
}

// Function to export data
function exportData() {
  const json = JSON.stringify(formData.value, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'resume-data.json'
  link.click()
  URL.revokeObjectURL(url)
}

// Function to import data
function importData() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.addEventListener('change', async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const text = await file.text()
    try {
      const parsed = JSON.parse(text)

      name.value = parsed.personalInfo?.fullName || ''
      jobTitle.value = parsed.personalInfo?.jobTitle || ''
      summary.value = parsed.personalInfo?.summary || ''
      email.value = parsed.personalInfo?.email || ''
      phone.value = parsed.personalInfo?.phone || ''
      location.value = parsed.personalInfo?.location || ''
      avatar.value = parsed.personalInfo?.avatar || ''
      socials.value = parsed.personalInfo?.socials?.length ? parsed.personalInfo.socials : [{ platform: '', url: '' }]
      skills.value = parsed.skills?.length ? parsed.skills : [{ name: '', level: 50 }]
      experience.value = parsed.experience?.length ? parsed.experience : [{ company: '', role: '', startDate: '', endDate: '', period: '' }]
      projects.value = parsed.projects?.length ? parsed.projects : [{ title: '', description: '', technologies: '' }]
      selectedTemplate.value = parsed.templateName || 'template_01'
    } catch (err) {
      alert('Invalid JSON file format.')
      console.error('Import failed:', err)
    }
  })
  input.click()
}
</script>

<style scoped>
/* Add any custom styles here */
.rtl {
  direction: rtl;
  text-align: right;
}
.ltr {
  direction: ltr;
  text-align: left;
}
.hidden {
  display: none;
}
</style>