import { h, defineComponent, ref, watch } from "vue";
import { getPaging, iconSet } from "../helpers";

export default defineComponent({
  props: {
    paging: {
      type: Object,
      required: true
    },
    useStore: {
      type: Boolean,
      default: false
    },
    modelValue: {
      required: true
    },
    useInput: {
      type: Boolean,
      default: false
    },
    customNavigationClass: [String, Array],
    customInputClass: [String, Array],
    customNumlinkClass: [String, Array],
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { 
      pageLinks,
      first, prev,
      next, last
    } = getPaging(props.useStore, props.paging)

    const numberLinks = ref([])
    watch(pageLinks, () => {
      numberLinks.value = pageLinks.value
    })

    const createList = (content, goTo, ...customClass) => {
      return h('li', { 
        class: 'sp-item',
        onClick(event) {
          if(goTo !== null) {
            emit('update:modelValue', goTo + 1)
            props.paging.nav(goTo)
          }
        }
      }, 
        h('a', { class: ['sp-link', ...customClass] }, content)
      )
    }

    // Page navigation
    const navLinks = (icon, target) => {
      return createList(h('span', {
          class: iconSet
        }, icon), target, props.customNavigationClass
      )
    }   
    
    // Page number links
    const createNumberLinks = () => {
      return numberLinks.value.map(item => {
        return createList(
          item, 
          (item - 1), 
          'sp-numlink', 
          props.paging.activeLink(item),
          props.customNumlinkClass
        )
      })
    }

    // Specific page input
    const setPage = () => {
      return createList(h('input', { 
        class: ['sp-input', props.customInputClass],
        value: props.modelValue, 
        onKeyup(event) {
          // when user hit enter
          if(event.keyCode === 13) {
            const targetPage = event.target.value - 1
            if(targetPage <= last.value 
              && targetPage >= 0) {
              emit('update:modelValue', event.target.value)
              props.paging.nav(targetPage)
            }
          }
        }
      }), null /* used to avoid createList() to run click event */, 'no-background')
    }

    return () => h(
      'ul',
      { class: 'sp-navigation' },
      [
        navLinks('first_page', first.value),
        navLinks('chevron_left', prev.value),
        props.useInput ? setPage() : createNumberLinks(),
        navLinks('chevron_right', next.value),
        navLinks('last_page', last.value)
      ]
    )
  }
})