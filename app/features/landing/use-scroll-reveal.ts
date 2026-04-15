export function useScrollReveal(root: MaybeRefOrGetter<HTMLElement | null>) {
  const elements = useQuerySelectorAll(root, '.reveal')

  watchEffect(() => {
    const disposers = elements.value.map((element) => {
      const { stop } = useIntersectionObserver(
        element,
        ([entry]) => {
          element.classList.toggle('reveal--visible', entry?.isIntersecting ?? false)
        },
        { threshold: 0.1 },
      )
      return stop
    })

    onWatcherCleanup(() => {
      disposers.forEach((dispose) => dispose())
    })
  })
}

function useQuerySelectorAll(parent: MaybeRefOrGetter<HTMLElement | null>, selector: string) {
  const _parent = toRef(parent)
  const elements = shallowRef<HTMLElement[]>([])

  watchEffect(update)
  useMutationObserver(_parent, update, { childList: true, subtree: true })

  function update() {
    if (_parent.value) {
      elements.value = Array.from(_parent.value.querySelectorAll(selector))
    } else {
      elements.value = []
    }
  }

  return elements
}
