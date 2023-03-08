var SSComponents = (function (exports, vue) {
  'use strict';

  const setPagingState = (useStore, { paging, property, value }) => {
    useStore ? paging[property] = value : paging.state[property] = value;
  };

  const densePadding = { padding: '6px 12px' };

  var SPSelect = vue.defineComponent({  
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
      }
    },
    emits: ['update:selected'],
    setup(props, { emit }) {
      // Pagination instance
      const paging = props.paging;

      const showOptions = vue.ref(false);
      const label = vue.ref(props.label);
      
      vue.onMounted(() => {
        // hide options if users click outside the select element
        document.addEventListener('click', event => {
          const selectEl = document.getElementById('sp-select-id');
          if(!selectEl.contains(event.target)) {
            setTimeout(() => {
              showOptions.value = false;            
            }, 100);
          }
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

      // attributes for Select
      const selectAttrs = {
        class: 'sp-select',
        style: props.dense ? densePadding : '',
        id: 'sp-select-id',
        onClick(event) {
          showOptions.value = !showOptions.value;
        },
      };

      // attributes for Options
      const optionsAttrs = (row, key) => {
        return {
          key,
          style: props.dense ? densePadding : '',
          onClick(event) {
            setPagingState(props.useStore, {
              paging,
              property: 'rows',
              value: row
            });

            label.value = `${row} ${props.rowLabel}`;
            paging.showPerPage();
            
            // allow users to do something after internal operation completed
            emit('update:selected', event, row);
          }
        }
      };

      return () => [
        // Select element
        vue.h('div', selectAttrs, label.value,
          vue.h('span', { class: 'material-icons-sharp' }, 'expand_more'),
        ),

        // Options element
        showOptions.value ? vue.h('ul', { class: 'sp-select-options' }, 
          props.options.map((row, index) => {
            return vue.h('li', optionsAttrs(row, index), `${row} ${props.rowLabel}`)
          })
        ) : ''
      ]
    }
  });

  exports.SPSelect = SPSelect;

  return exports;

})({}, Vue);
