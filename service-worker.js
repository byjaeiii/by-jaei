const DEFAULT_ADMIN_URL = '/admin.html?section=members';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (_) {
    data = { body: event.data ? event.data.text() : '' };
  }

  const title = data.title || 'BYJAEI 관리자 · 알림';
  const options = {
    body: data.body || '관리자 페이지에서 새 알림을 확인해주세요.',
    icon: data.icon || '/icon-512.png',
    badge: data.badge || '/icon-512.png',
    tag: data.tag || `byjaei-approval-${Date.now()}`,
    renotify: true,
    data: { url: data.url || DEFAULT_ADMIN_URL }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL(
    (event.notification.data && event.notification.data.url) || DEFAULT_ADMIN_URL,
    self.location.origin
  ).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async clients => {
      const existing = clients.find(client => {
        const url = new URL(client.url);
        return url.origin === self.location.origin && url.pathname.endsWith('/admin.html');
      });
      if (existing) {
        try { await existing.navigate(target); } catch (_) {}
        return existing.focus();
      }
      return self.clients.openWindow(target);
    })
  );
});
