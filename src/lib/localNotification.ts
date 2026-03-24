export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) return 'denied'
  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'
  return Notification.requestPermission()
}

export async function showCareTeamLocalAlert(): Promise<{ ok: boolean; message: string }> {
  if (!('serviceWorker' in navigator)) {
    return { ok: false, message: 'Service workers are not supported in this browser.' }
  }

  const permission = await requestNotificationPermission()
  if (permission !== 'granted') {
    return { ok: false, message: 'Notification permission was not granted.' }
  }

  const registration = await navigator.serviceWorker.ready
  if (!registration.active) {
    return {
      ok: false,
      message: 'Service worker is not active yet. Refresh once and try again.',
    }
  }

  registration.active.postMessage({
    type: 'SHOW_LOCAL_NOTIFICATION',
    title: 'Care team alert',
    body: 'New task: review flagged patients in the directory.',
    tag: `care-demo-${Date.now()}`,
  })

  return { ok: true, message: 'Notification sent via service worker.' }
}
