import { h, defineComponent, toRefs, watch, onMounted, computed } from "vue";
import { getPaging, iconSet } from "../helpers";

export default defineComponent({
  props: {
    paging: {
      type: Object,
    },
    modelValue: {
      required: true,
    },
    useInput: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    useStore: {
      type: Boolean,
      default: false,
    },
    customNavigationClass: [String, Array],
    customInputClass: [String, Array],
    customNumlinkClass: [String, Array],
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const paging = getPaging(props.useStore, props.paging)
    const { pageLinks, first, prev, next, last } = toRefs(paging.state)

    const resetModelValue = () => {
      if (paging.activePage.value === 1) {
        emit('update:modelValue', 1)
      }
    }

    // for build tool version
    watch(pageLinks, resetModelValue)

    const activePage = computed(() => paging.activePage)

    // when paging.activePage changed, update the modelValue
    watch(activePage, () => {
      emit('update:modelValue', activePage.value)
    })

    // for CDN version
    onMounted(resetModelValue)

    const disableLink = (link) => {}

    const createList = (content, goTo, ...customClass) => {
      return h(
        'li',
        {
          class: 'sp-item',
          onClick(event) {
            if (goTo !== null) {
              emit('update:modelValue', goTo + 1)
              paging.nav(goTo)
            }
          },
        },
        h('button', { class: ['sp-link', ...customClass] }, content)
      )
    }

    // Page navigation
    const navLinks = (icon, target) => {
      return createList(
        h(
          'span',
          {
            class: iconSet,
          },
          icon
        ),
        target,
        paging.isDisabled(target),
        props.dark ? 'dark' : '',
        props.customNavigationClass
      )
    }

    // Page number links
    const createNumberLinks = () => {
      return pageLinks.value.map((item) => {
        return createList(
          item,
          item - 1,
          'sp-numlink',
          paging.activeLink(item),
          props.dark ? 'dark' : '',
          props.customNumlinkClass
        )
      })
    }

    // Specific page input
    const setPage = () => {
      return createList(
        h('input', {
          class: ['sp-input', props.customInputClass],
          value: props.modelValue,
          onKeyup(event) {
            // when user hit enter
            if (event.keyCode === 13) {
              const targetPage = event.target.value - 1
              if (targetPage <= last.value && targetPage >= 0) {
                emit('update:modelValue', event.target.value)
                paging.nav(targetPage)
              }
            }
          },
        }),
        null /* used to avoid createList() to run click event */,
        'no-background'
      )
    }

    return () =>
      h('ul', { class: 'sp-navigation' }, [
        navLinks('first_page', first.value),
        navLinks('chevron_left', prev.value),
        props.useInput ? setPage() : createNumberLinks(),
        navLinks('chevron_right', next.value),
        navLinks('last_page', last.value),
      ])
  },
})