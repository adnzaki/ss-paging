import {
  h,
  defineComponent,
  toRefs,
  ref,
  watch,
  onMounted,
  computed,
} from 'vue'
import { iconSet } from '../helpers'

export default defineComponent({
  props: {
    paging: {
      type: Object,
      required: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    sortIcon: {
      type: String,
      default: 'sort',
    },
    fields: {
      type: Array,
      required: true,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    selection: {
      type: Boolean,
      default: false,
    },
    modelValue: Array,
    tableClass: [String, Array],
    tbodyClass: [String, Array],
    theadClass: [String, Array],
    trClass: [String, Array],
    thClass: [String, Array],
    tdClass: [String, Array],
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const { data } = toRefs(props.paging.state)
    const selectedItems = ref(props.modelValue || [])

    const allSelected = computed(() => {
      return (
        data.value.length > 0 &&
        data.value.every((item) => selectedItems.value.includes(item.id))
      )
    })

    const updateSelection = () => {
      emit('update:modelValue', selectedItems.value)
    }

    const toggleSelection = (id) => {
      const index = selectedItems.value.indexOf(id)
      if (index === -1) {
        selectedItems.value.push(id) // add to list
      } else {
        selectedItems.value.splice(index, 1) // remove from list
      }

      updateSelection()
    }

    // Toggle select all
    const toggleSelectAll = () => {
      if (allSelected.value) {
        selectedItems.value = [] // Unselect all
      } else {
        selectedItems.value = data.value.map((item) => item[props.rowKey]) // Select all
      }

      updateSelection()
    }

    watch(data, () => {
      selectedItems.value = []
    })

    const checkAll = () => {
      return h('input', {
        class: 'sp-checkbox',
        type: 'checkbox',
        checked: allSelected.value,
        onChange: toggleSelectAll,
      })
    }

    const checkItem = (id) => {
      return h('input', {
        class: 'sp-checkbox',
        type: 'checkbox',
        checked: selectedItems.value.includes(id),
        onChange: () => toggleSelection(id),
      })
    }

    const actionHeader = () => {
      return slots.actionHeader ? slots.actionHeader() : ''
    }

    const actionBody = () => {
      return slots.actionBody ? slots.actionBody() : ''
    }

    return () =>
      h('table', { class: ['sp-table', props.dark ? 'dark' : ''] }, [
        h('thead', { class: props.theadClass }, [
          h('tr', { class: props.trClass }, [
            // Checkbox for "Select All"
            props.selection
              ? h('th', { class: props.thClass }, checkAll())
              : '',

            // Column headers
            props.fields.map((field) =>
              h(
                'th',
                {
                  class: [
                    props.thClass,
                    field.sortable ? 'cursor-pointer' : '',
                  ],
                  onClick: () => {
                    if (field.sortable) props.paging.sortData(field.key)
                  },
                },
                [
                  field.label,
                  field.sortable
                    ? h('span', { class: iconSet }, props.sortIcon)
                    : '',
                ]
              )
            ),
            actionHeader(),
          ]),
        ]),
        h('tbody', { class: props.tbodyClass }, [
          data.value.map((item) =>
            h('tr', { class: props.trClass }, [
              // Checkbox for selecting item
              props.selection
                ? h(
                    'td',
                    { class: [props.tdClass, 'text-center'] },
                    checkItem(item[props.rowKey])
                  )
                : '',
              props.fields.map(
                (field) =>
                  h('td', { class: props.tdClass }, item[field.key] || '-') // Using key from fields
              ),
              actionBody(),
            ])
          ),
        ]),
      ])
  },
})
