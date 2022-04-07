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
console.log('self', self.__WB_MANIFEST);
workbox.precaching.precacheAndRoute(
  self.__WB_MANIFEST ? self.__WB_MANIFEST : []
);
workbox.navigationPreload.enable();

const navigationRoute = new workbox.routing.NavigationRoute(
  new workbox.strategies.NetworkFirst({
    cacheName: 'navigations',
  })
);

// const htmlAssetRoute = new workbox.routing.Route(
//   ({ request }) => {
//     return request.destination === 'document';
//   },
//   new workbox.strategies.networkFirst({
//     cacheName: 'html-assets',
//   })
// );

const staticAssetsRoute = new workbox.routing.Route(
  ({ request }) => {
    return ['image', 'script', 'style'].includes(request.destination);
  },
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-assets',
  })
);

// const mainAssetRoute = new workbox.routing.Route(
//   ({ request }) => {
//     return request.destination === 'manifest';
//   },
//   new workbox.strategies.cacheFirst({
//     cacheName: 'main-assets',
//   })
// );

workbox.routing.registerRoute(navigationRoute);
workbox.routing.registerRoute(staticAssetsRoute);
// workbox.routing.registerRoute(mainAssetRoute);
