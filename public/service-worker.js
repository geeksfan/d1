importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
// 修改默认配置
workbox.core.setCacheNameDetails({
  prefix: 'app',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime'
})
workbox.precaching.precacheAndRoute(
  self.__WB_MANIFEST
    ? self.__WB_MANIFEST
    : [
        // {
        //   url: '/index.html',
        //   revision: '5ed70e0c237b4c66',
        // },
        // '/static/js/bundle.js',
        // '/index.1236d1250f7ffbdc.css',
      ]
);
// sw.js
console.log('service worker 注册成功')

self.addEventListener('install', () => {
  // 安装回调的逻辑处理
  console.log('service worker 安装成功')
})

self.addEventListener('activate', () => {
  // 激活回调的逻辑处理
  console.log('service worker 激活成功')
})

self.addEventListener('fetch', event => {
  console.log('service worker 抓取请求成功: ' + event.request.url)
})

workbox.navigationPreload.enable();

const navigationRoute = new workbox.routing.NavigationRoute(
  new workbox.strategies.NetworkFirst({
    cacheName: 'navigations',
  })
);
const staticAssetsRoute = new workbox.routing.Route(
  ({ request }) => {
    return ['image', 'script', 'style', 'manifest'].includes(
      request.destination
    );
  },
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-assets',
  })
);
const xhrAssetsRoute = new workbox.routing.Route(
  ({ request }) => {
    // console.log('🚀 ~ file: service-worker.js ~ line 55 ~ request', request);
    return (
      request.url === 'https://my-typescript-worker.17610588786.workers.dev/'
    );
  },
  new workbox.strategies.NetworkFirst({
    cacheName: 'data-assets',
  })
);
workbox.routing.registerRoute(navigationRoute);
workbox.routing.registerRoute(staticAssetsRoute);
workbox.routing.registerRoute(xhrAssetsRoute);
