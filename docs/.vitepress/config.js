export default {
  title: 'SSPagingVue',
  description: 'A Low-Level Server-side Pagination Library for Vue.js',
  base: '/ss-paging/',
  head: [
    ['link', { rel: 'icon', type: 'image', href: '/ss-paging/sspaging-logo.png' }]
  ],
  themeConfig: {
    logo: '/sspaging-logo.png',
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
      },
      {
        text: 'Pagination Components',
        items: [
          { text: 'Intro to Components', link: '/builtin-components/intro' },
          { text: 'Installation', link: '/builtin-components/installation' },
          { text: 'SelectRow', link: '/builtin-components/select-row' },
          { text: 'Navigator', link: '/builtin-components/navigator' },
          { text: 'SearchBox', link: '/builtin-components/search-box' },
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
    nav: [
      { text: 'v2.3.0-beta.1', link: 'https://www.npmjs.com/package/ss-paging-vue' }
    ]
  }
}
  