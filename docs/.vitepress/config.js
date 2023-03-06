export default {
  title: 'SSPagingVue',
  description: 'A Low-Level Server-side Pagination Library for Vue.js',
  base: '/ss-paging/',
  themeConfig: {
    sidebar: [
      {
        text: 'Introduction', 
        items: [
          { text: 'What is SSPaging?', link: '/intro' },
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
          { text: 'Prerequisites', link: '/tutorials/prerequisites' },
          { text: 'Preparing Template', link: '/tutorials/prepare-template' },
          { text: 'Applying Features', link: '/tutorials/applying-features' },
        ]
      }
      
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2017-present Adnan Zaki'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/adnzaki/ss-paging-vue' }
    ],
  }
}
  