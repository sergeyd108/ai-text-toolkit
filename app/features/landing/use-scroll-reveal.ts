export function useScrollReveal(root: Ref<HTMLElement | null>) {
  onMounted(() => {
    if (!root.value) return

    const elements = root.value.querySelectorAll<HTMLElement>('.reveal')

    elements.forEach((el) => {
      useIntersectionObserver(
        el,
        ([entry]) => {
          el.classList.toggle('reveal--visible', entry?.isIntersecting ?? false)
        },
        { threshold: 0.1 },
      )
    })
  })
}
