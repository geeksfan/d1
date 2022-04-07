// // 首先引入 Workbox 框架
// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js'
// );

// // 注册成功后要立即缓存的资源列表
// workbox.precaching.precacheAndRoute([
//   // {
//   //   url: 'css/index.css',
//   //   revision: '835ba5c3',
//   // },
//   // {
//   //   url: 'images/xxx.png',
//   //   revision: 'b1537bfs',
//   // },
//   // {
//   //   url: 'index.html',
//   //   revision: 'b331f695',
//   // },
//   // {
//   //   url: 'js/index.js',
//   //   revision: '4d562866',
//   // },
// ]);

// // 缓存策略
// workbox.routing.registerRoute(
//   new RegExp('.*.html'),
//   workbox.strategies.networkFirst()
// );

// workbox.routing.registerRoute(
//   new RegExp('.*.(?:js|css)'),
//   workbox.strategies.networkFirst()
// );

// // workbox.routing.registerRoute(
// //   new RegExp('https://your.cdn.com/'),
// //   workbox.strategies.staleWhileRevalidate()
// // );

// // workbox.routing.registerRoute(
// //   new RegExp('https://your.img.cdn.com/'),
// //   workbox.strategies.cacheFirst({
// //     cacheName: 'example:img',
// //   })
// // );

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js'
);

// const navigationRoute = new workbox.routing.NavigationRoute(
//   new workbox.strategies.NetworkFirst({
//     cacheName: 'navigations',
//   })
// );

const htmlAssetRoute = new workbox.routing.Route(
  ({ request }) => {
    return request.destination === 'document';
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'html-assets',
  })
);
const mainAssetRoute = new workbox.routing.Route(
  ({ request }) => {
    return request.destination === 'manifest';
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'main-assets',
  })
);
const cssAssetRoute = new workbox.routing.Route(
  ({ request }) => {
    return request.destination === '	stylesheet';
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'css-assets',
  })
);
const imageAssetRoute = new workbox.routing.Route(
  ({ request }) => {
    return request.destination === 'image';
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'image-assets',
  })
);
const staticAssetRoute = new workbox.routing.Route(
  ({ request }) => {
    console.log('🚀 ~ file: service-worker.js ~ line 69 ~ request', request);
    return request.destination === 'script';
  },
  new workbox.strategies.CacheFirst({
    cacheName: 'js-assets',
  })
);

workbox.routing.registerRoute(htmlAssetRoute);
workbox.routing.registerRoute(imageAssetRoute);
workbox.routing.registerRoute(staticAssetRoute);
workbox.routing.registerRoute(mainAssetRoute);
workbox.routing.registerRoute(cssAssetRoute);
