import { Quasar } from 'quasar'
import langEn from 'quasar/lang/en-US'
import langFa from 'quasar/lang/fa-IR'
import { i18n } from 'src/boot/i18n'
import { watch } from 'vue'

export default async () => {
  const setQuasarLang = (val) => {
    const lang = val.startsWith('fa') ? langFa : langEn
    Quasar.lang.set(lang)
    document.documentElement.setAttribute('dir', val.startsWith('fa') ? 'rtl' : 'ltr')
    console.log('[LANG BOOT] Quasar lang set to', val)
  }

  watch(() => i18n.global.locale.value, (newVal) => {
    console.log('[LANG BOOT] locale changed to', newVal)
    setQuasarLang(newVal)
  })

  setQuasarLang(i18n.global.locale.value)
}