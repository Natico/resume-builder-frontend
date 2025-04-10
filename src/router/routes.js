const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'resume',
        component: () => import('pages/ResumeBuilder.vue')
      },
      {
        path: 'resume-preview',
        name: 'resume-preview',
        component: () => import('pages/ResumePreview.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
