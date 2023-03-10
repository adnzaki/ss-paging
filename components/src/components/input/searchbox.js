import { h, defineComponent } from "vue";
import { iconSet } from "../helpers";

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
    placeholder: {
      type: String, 
      default: ''
    },
    icon: {
      type: String,
      default: 'search'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const icons = {
      search: 'search',
      arrow: 'arrow_forward'
    }

    return () => 
    h('div', { class: 'sp-searchbox-wrapper' }, 
      [
        // input element
        h('input', { 
          class: 'sp-searchbox',
          placeholder: props.placeholder,
          onInput(event) {
            if(event.target.value === '') {
              emit('update:modelValue', event.target.value)
              props.paging.onSearchChanged()
            }
          },
          onKeyup(event) {
            if(event.keyCode === 13) {
              emit('update:modelValue', event.target.value)
              props.paging.filter()
            }
          }
        }),

        // the icon
        h('span', { class: [iconSet, 'sp-searchbox-icon'] }, icons[props.icon])
      ]
    )
  }
})