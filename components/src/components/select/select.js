import { h, defineComponent, ref, onMounted } from "vue";
import { setPagingState, densePadding } from "../helpers";

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
    label: {
      type: String,
      default: 'Choose Option'
    },
    rowLabel: {
      type: String,
      default: 'rows'
    },
    options: {
      type: Array,
      default: [10, 25, 50, 100, 250]
    },
    selected: {
      default: null
    },
    dense: {
      type: Boolean,
      default: false
    },
    customSelectClass: [String, Array],
    customOptionClass: [String, Array],
    dark: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['update:selected'],
  setup(props, { emit }) {
    // Pagination instance
    const paging = props.paging

    const showOptions = ref(false)
    const label = ref(props.label)
    const optionsWidth = ref(0)
    
    onMounted(() => {
      // hide options if users click outside the select element
      document.addEventListener('click', event => {
        const selectEl = document.getElementById('sp-select-id')
        if(!selectEl.contains(event.target)) {
          setTimeout(() => {
            showOptions.value = false            
          }, 100)
        }

        optionsWidth.value = selectEl.offsetWidth
      })
    })

    // if user has predefined selected option
    // use it as select label
    if(props.selected !== null) {
      const updateSelectedOption = () => {
        if(props.options.includes(props.selected)) {
          // only valid selected is accepted
          label.value = `${props.selected} ${props.rowLabel}`
        }
      }

      updateSelectedOption()
      //watch(props, updateSelectedOption)
    }

    const selectClass = () => {
      const classes = [props.dark ? 'sp-select dark' : 'sp-select']
      if(props.customSelectClass !== undefined) {
        classes.push(props.customSelectClass)
      }

      return classes
    }

    // attributes for Select
    const selectAttrs = {
      class: selectClass(),
      style: props.dense ? densePadding : '',
      id: 'sp-select-id',
      onClick(event) {
        showOptions.value = !showOptions.value
      },
    }

    const optionClass = () => {
      const classes = [props.dark ? 'dark' : '']
      if(props.customOptionClass !== undefined) {
        classes.push(props.customOptionClass)
      }

      return classes
    }

    // attributes for Options
    const optionsAttrs = (row, key) => {
      return {
        class: optionClass(),
        key,
        style: props.dense ? densePadding : '',
        onClick(event) {
          setPagingState(props.useStore, {
            paging,
            property: 'rows',
            value: row
          })

          label.value = `${row} ${props.rowLabel}`
          paging.showPerPage()
          
          // allow users to do something after internal operation completed
          emit('update:selected', event, row)
        }
      }
    }

    return () => [
      // Select element
      h('div', selectAttrs, label.value,
        h('span', { class: 'material-icons-round' }, 'expand_more'),
      ),

      // Options element
      showOptions.value ? h('ul', { 
          class: ['sp-select-options', props.dark ? 'dark' : ''], 
          style: { width: `${optionsWidth.value}px` } 
        }, 
        props.options.map((row, index) => {
          return h('li', optionsAttrs(row, index), `${row} ${props.rowLabel}`)
        })
      ) : ''
    ]
  }
})