<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="column items-center q-gutter-md">
      <img 
      alt="Quasar logo" 
      src="~assets/img/resume_background.svg" 
      style="width: auto; height: 400px">
      <q-btn :label="$t('makeResume')" color="primary" to="/resume" 
      />
    </div>
    <q-footer class="bg-grey-2 text-black q-pa-sm">
      <div
        :class="['row items-center q-gutter-sm']"
        :style="{ flexDirection:  'row-reverse'  }"
      >
        <q-select
          v-model="language"
          :options="languageOptions"
          option-value="value"
          option-label="label"
          :placeholder="$t('selectYourLanguage')"
          filled
          dense
        />
        <div>{{ $t('selectLanguage') }}:</div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const language = ref({ label: 'English', value: 'en' }) // Default language is English
const languageOptions = ref([
  { label: 'فارسی', value: 'fa' },
  { label: 'English', value: 'en' }
])

// Use the global i18n instance (messages defined in a central file)
const { locale } = useI18n()

// Update locale when language changes
watch(language, (newLang) => {
  console.log('Language changed to:', newLang)
  const langValue = typeof newLang === 'object' ? newLang.value : newLang
  locale.value = langValue
})
</script>