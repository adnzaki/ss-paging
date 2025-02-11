import {
  h,
  defineComponent,
  toRefs,
  ref,
  watch,
  computed,
} from 'vue'
import { iconSet } from '../helpers'

export default defineComponent({
  props: {
    paging: {
      type: Object,
      required: true,
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
      return slots.actionBody
        ? isDesktop()
          ? h('td', null, slots.actionBody())
          : slots.actionBody()
        : ''
    }

    const isDesktop = () => {
      return window.innerWidth >= 768
    }

    const tableHeader = (field) => {
      return h(
        'th',
        {
          class: [props.thClass, field.sortable ? 'cursor-pointer' : ''],
          onClick: () => {
            if (field.sortable) props.paging.sortData(field.key)
          },
        },
        [
          field.label,
          field.sortable ? h('span', { class: iconSet }, props.sortIcon) : '',
        ]
      )
    }

    // CHANGED: New state for tracking expanded rows
    const expandedRows = ref([])

    const expandTitle = (rowId) => {
      const isExpanded = expandedRows.value.includes(rowId)
      return h(
        'span',
        {
          class: iconSet,
          onClick: () => {
            // Toggle the expansion state for this row
            if (isExpanded) {
              expandedRows.value = expandedRows.value.filter(
                (id) => id !== rowId
              )
            } else {
              expandedRows.value.push(rowId)
            }
          },
          style: { cursor: 'pointer' }, // Optional: make clickable appear as such
        },
        isExpanded ? 'expand_less' : 'expand_more'
      )
    }

    const table = () =>
      h('table', { class: ['sp-table', props.tableClass] }, [
        h('thead', { class: props.theadClass }, [
          h('tr', { class: props.trClass }, [
            // Checkbox for "Select All"
            props.selection
              ? h('th', { class: props.thClass }, checkAll())
              : '',

            // Column headers
            isDesktop()
              ? props.fields.map((field) => tableHeader(field))
              : tableHeader(props.fields[0]),
            isDesktop() ? actionHeader() : '',
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
              isDesktop()
                ? props.fields.map(
                    (field) =>
                      h('td', { class: props.tdClass }, item[field.key] || '-') // Using key from fields
                  )
                : h('td', { class: [props.tdClass, 'sp-td-expand'] }, [
                    expandTitle(item[props.rowKey]),
                    h(
                      'span',
                      { class: 'title' },
                      item[props.fields[0].key] || '-'
                    ),
                    expandedRows.value.includes(item[props.rowKey])
                      ? h('ul', null, [
                          props.fields.map((field, index) => {
                            return index > 0
                              ? h(
                                  'li',
                                  { class: 'sp-list' },
                                  item[field.key] || '-'
                                )
                              : null
                          }),
                        ])
                      : null,
                    !expandedRows.value.includes(item[props.rowKey])
                      ? h('p', null)
                      : null,
                    !isDesktop() ? actionBody() : '',
                  ]),
              isDesktop() ? actionBody() : '',
            ])
          ),
        ]),
      ])

    return () => table()
  },
})
