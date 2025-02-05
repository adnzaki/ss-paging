var SSComponents = (function (exports, vue) {
  'use strict';

  const largePadding = { padding: '10px 15px' };

  const iconSet = 'material-icons-round';

  var table = vue.defineComponent({
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
      const { data } = vue.toRefs(props.paging.state);
      const selectedItems = vue.ref(props.modelValue || []);

      const allSelected = vue.computed(() => {
        return (
          data.value.length > 0 &&
          data.value.every((item) => selectedItems.value.includes(item.id))
        )
      });

      const updateSelection = () => {
        emit('update:modelValue', selectedItems.value);
      };

      const toggleSelection = (id) => {
        const index = selectedItems.value.indexOf(id);
        if (index === -1) {
          selectedItems.value.push(id); // add to list
        } else {
          selectedItems.value.splice(index, 1); // remove from list
        }

        updateSelection();
      };

      // Toggle select all
      const toggleSelectAll = () => {
        if (allSelected.value) {
          selectedItems.value = []; // Unselect all
        } else {
          selectedItems.value = data.value.map((item) => item[props.rowKey]); // Select all
        }

        updateSelection();
      };

      vue.watch(data, () => {
        selectedItems.value = [];
      });

      const checkAll = () => {
        return vue.h('input', {
          class: 'sp-checkbox',
          type: 'checkbox',
          checked: allSelected.value,
          onChange: toggleSelectAll,
        })
      };

      const checkItem = (id) => {
        return vue.h('input', {
          class: 'sp-checkbox',
          type: 'checkbox',
          checked: selectedItems.value.includes(id),
          onChange: () => toggleSelection(id),
        })
      };

      const actionHeader = () => {
        return slots.actionHeader ? slots.actionHeader() : ''
      };

      const actionBody = () => {
        return slots.actionBody
          ? isDesktop()
            ? vue.h('td', null, slots.actionBody())
            : slots.actionBody()
          : ''
      };

      const isDesktop = () => {
        return window.innerWidth >= 768
      };

      const tableHeader = (field) => {
        return vue.h(
          'th',
          {
            class: [props.thClass, field.sortable ? 'cursor-pointer' : ''],
            onClick: () => {
              if (field.sortable) props.paging.sortData(field.key);
            },
          },
          [
            field.label,
            field.sortable ? vue.h('span', { class: iconSet }, props.sortIcon) : '',
          ]
        )
      };

      // CHANGED: New state for tracking expanded rows
      const expandedRows = vue.ref([]);

      const expandTitle = (rowId) => {
        const isExpanded = expandedRows.value.includes(rowId);
        return vue.h(
          'span',
          {
            class: iconSet,
            onClick: () => {
              // Toggle the expansion state for this row
              if (isExpanded) {
                expandedRows.value = expandedRows.value.filter(
                  (id) => id !== rowId
                );
              } else {
                expandedRows.value.push(rowId);
              }
            },
            style: { cursor: 'pointer' }, // Optional: make clickable appear as such
          },
          isExpanded ? 'expand_less' : 'expand_more'
        )
      };

      const table = () =>
        vue.h('table', { class: ['sp-table', props.tableClass] }, [
          vue.h('thead', { class: props.theadClass }, [
            vue.h('tr', { class: props.trClass }, [
              // Checkbox for "Select All"
              props.selection
                ? vue.h('th', { class: props.thClass }, checkAll())
                : '',

              // Column headers
              isDesktop()
                ? props.fields.map((field) => tableHeader(field))
                : tableHeader(props.fields[0]),
              isDesktop() ? actionHeader() : '',
            ]),
          ]),
          vue.h('tbody', { class: props.tbodyClass }, [
            data.value.map((item) =>
              vue.h('tr', { class: props.trClass }, [
                // Checkbox for selecting item
                props.selection
                  ? vue.h(
                      'td',
                      { class: [props.tdClass, 'text-center'] },
                      checkItem(item[props.rowKey])
                    )
                  : '',
                isDesktop()
                  ? props.fields.map(
                      (field) =>
                        vue.h('td', { class: props.tdClass }, item[field.key] || '-') // Using key from fields
                    )
                  : vue.h('td', { class: [props.tdClass, 'sp-td-expand'] }, [
                      expandTitle(item[props.rowKey]),
                      vue.h(
                        'span',
                        { class: 'title' },
                        item[props.fields[0].key] || '-'
                      ),
                      expandedRows.value.includes(item[props.rowKey]) ? vue.h('ul', null, [
                        props.fields.map((field, index) => {
                          return index > 0
                            ? vue.h(
                                'li',
                                { class: 'sp-list' },
                                item[field.key] || '-'
                              )
                            : null
                        }),
                      ]) : null,
                      !expandedRows.value.includes(item[props.rowKey]) ? vue.h('p', null) : null,
                      !isDesktop() ? actionBody() : '',
                    ]),
                isDesktop() ? actionBody() : '',
              ])
            ),
          ]),
        ]);

      return () => table()
    },
  });

  var select = vue.defineComponent({  
    props: {
      paging: {
        type: Object,
        required: true
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
      large: {
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
      const paging = props.paging;

      const label = vue.ref(props.label);
      const optionsWidth = vue.ref(0);

      const listWrapperActive = vue.ref('');
      const activeIcon = vue.ref('');
      
      vue.onMounted(() => {
        // hide options if users click outside the select element
        document.addEventListener('click', event => {
          const selectEl = document.getElementById('sp-select-id');
          if(!selectEl.contains(event.target)) {
            setTimeout(() => {
              // showOptions.value = false
              listWrapperActive.value = ''; 
              activeIcon.value = '';
            }, 100);
          }

          optionsWidth.value = selectEl.offsetWidth;
        });
      });

      // if user has predefined selected option
      // use it as select label
      if(props.selected !== null) {
        const updateSelectedOption = () => {
          if(props.options.includes(props.selected)) {
            // only valid selected is accepted
            label.value = `${props.selected} ${props.rowLabel}`;
          }
        };

        updateSelectedOption();
        //watch(props, updateSelectedOption)
      }

      const selectClass = () => {
        const classes = [props.dark ? 'sp-select dark' : 'sp-select'];
        if(props.customSelectClass !== undefined) {
          classes.push(props.customSelectClass);
        }

        return classes
      };

      // attributes for Select    
      const selectAttrs = () => {
        return {
          class: [selectClass(), activeIcon.value],
          style: props.large ? largePadding : '',
          id: 'sp-select-id',
          onClick(event) {
            // showOptions.value = !showOptions.value
            if(listWrapperActive.value === 'active') {
              listWrapperActive.value = '';
              activeIcon.value = '';
            } else {
              listWrapperActive.value = 'active';   
              activeIcon.value = 'active';      
            }  
          },
        }
      };

      const optionClass = () => {
        const classes = [props.dark ? 'dark' : ''];
        if(props.customOptionClass !== undefined) {
          classes.push(props.customOptionClass);
        }

        return classes
      };

      // attributes for Options
      const optionsAttrs = (row, key) => {
        return {
          class: optionClass(),
          key,
          style: props.large ? largePadding : '',
          onClick(event) {

            props.paging.state.rows = row;

            label.value = `${row} ${props.rowLabel}`;
            paging.showPerPage();
            
            // allow users to do something after internal operation completed
            emit('update:selected', event, row);
          }
        }
      };

      return () => [
        // Select element
        vue.h('div', selectAttrs(), label.value,
          vue.h('span', { class: 'material-icons-round' }, 'expand_more'),
        ),

        // Options element
        vue.h('ul', { 
            class: [
              'sp-select-options', 
              props.dark ? 'dark' : '',
              listWrapperActive.value
            ], 
            style: { width: `${optionsWidth.value}px` } 
          }, 
          props.options.map((row, index) => {
            return vue.h('li', optionsAttrs(row, index), `${row} ${props.rowLabel}`)
          })
        )
      ]
    }
  });

  var nav = vue.defineComponent({
    props: {
      paging: {
        type: Object,
        required: true
      },
      modelValue: {
        required: true
      },
      useInput: {
        type: Boolean,
        default: false
      },
      dark: {
        type: Boolean,
        default: false,
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
      } = vue.toRefs(props.paging.state);

      const resetModelValue = () => {
        if(props.paging.activePage.value === 1) {
          emit('update:modelValue', 1);
        }
      };

      // for build tool version
      vue.watch(pageLinks, resetModelValue);

      const activePage = vue.computed(() => props.paging.activePage);

      // when paging.activePage changed, update the modelValue
      vue.watch(activePage, () => {
        emit('update:modelValue', activePage.value);
      });

      // for CDN version
      vue.onMounted(resetModelValue);

      const createList = (content, goTo, ...customClass) => {
        return vue.h('li', { 
          class: 'sp-item',
          onClick(event) {
            if(goTo !== null) {
              emit('update:modelValue', goTo + 1);
              props.paging.nav(goTo);
            }
          }
        }, 
          vue.h('button', { class: ['sp-link', ...customClass] }, content)
        )
      };

      // Page navigation
      const navLinks = (icon, target) => {
        return createList(vue.h('span', {
            class: iconSet
          }, icon), 
          target, 
          props.paging.isDisabled(target), 
          props.dark ? 'dark' : '', props.customNavigationClass
        )
      };   
      
      // Page number links
      const createNumberLinks = () => {
        return pageLinks.value.map(item => {
          return createList(
            item, 
            (item - 1), 
            'sp-numlink', 
            props.paging.activeLink(item),
            props.dark ? 'dark' : '',
            props.customNumlinkClass
          )
        })
      };

      // Specific page input
      const setPage = () => {
        return createList(vue.h('input', { 
          class: ['sp-input', props.customInputClass],
          value: props.modelValue, 
          onKeyup(event) {
            // when user hit enter
            if(event.keyCode === 13) {
              const targetPage = event.target.value - 1;
              if(targetPage <= last.value 
                && targetPage >= 0) {
                emit('update:modelValue', event.target.value);
                props.paging.nav(targetPage);
              }
            }
          }
        }), null /* used to avoid createList() to run click event */, 'no-background')
      };

      return () => vue.h(
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
  });

  var searchbox = vue.defineComponent({
    props: {
      paging: {
        type: Object,
        required: true
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
      },
      customClass: [String, Array]
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const icons = {
        search: 'search',
        arrow: 'arrow_forward'
      };

      return () => 
      vue.h('div', { class: 'sp-searchbox-wrapper' }, 
        [
          // input element
          vue.h('input', { 
            class: ['sp-searchbox', props.customClass],
            placeholder: props.placeholder,
            onInput(event) {
              if(event.target.value === '') {
                emit('update:modelValue', event.target.value);
                props.paging.onSearchChanged();
              }
            },
            onKeyup(event) {
              if(event.keyCode === 13) {
                emit('update:modelValue', event.target.value);
                props.paging.filter();
              }
            }
          }),

          // the icon
          vue.h('span', { class: [iconSet, 'sp-searchbox-icon'] }, icons[props.icon])
        ]
      )
    }
  });

  exports.Navigator = nav;
  exports.SearchBox = searchbox;
  exports.SelectRow = select;
  exports.Table = table;

  return exports;

})({}, Vue);
