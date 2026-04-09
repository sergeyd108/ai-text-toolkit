import sampleMd from '~/assets/sample.md?raw'

export const useEditorStore = defineStore('editor', () => {
  const content = ref(sampleMd)
  return { content }
})
