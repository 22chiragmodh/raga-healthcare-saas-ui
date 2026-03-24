/// Service worker: lifecycle + local notifications (demo for assignment).

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  const data = event.data
  if (!data || data.type !== 'SHOW_LOCAL_NOTIFICATION') return

  event.waitUntil(
    self.registration.showNotification(data.title || 'RAGA Care', {
      body: data.body || '',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: data.tag || 'care-local-alert',
      renotify: true,
    }),
  )
})
