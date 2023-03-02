export default {
  title: 'SSPagingVue',
  description: 'A Low-Level Server-side Pagination Library for Vue.js',
  base: '/ss-paging/',
  themeConfig: {
    sidebar: [
      {
        text: 'Introduction', 
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'Navigation', link: '/navigation' },
          { text: 'Displaying Data', link: '/displaying-data' },
          { text: 'Search', link: '/search' },
          { text: 'Pagination Rows', link: '/paging-rows' },
        ],
        // collapsed: true
      },
      {
        text: 'Tutorials',
        items: [
          { text: 'Preparing Template', link: 'prepare-template' },
          { text: 'Applying Pagination', link: 'apply-paging' },
        ]
      }
    ]
  }
}
  