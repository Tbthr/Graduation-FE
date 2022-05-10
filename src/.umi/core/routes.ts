// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/DeskTop/Graduation-FE/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts').default,
    "routes": [
      {
        "path": "/",
        "redirect": "/data",
        "exact": true
      },
      {
        "path": "/data",
        "component": require('D:/DeskTop/Graduation-FE/src/pages/Data').default,
        "title": "RPC远程调用展示",
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
