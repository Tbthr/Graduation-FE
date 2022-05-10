export default [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      { path: '/', redirect: '/data' },
      { path: '/data', component: './Data', title:'RPC远程调用展示'},
    ],
  },
];
