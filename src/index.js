import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Map clean URLs to index.html files
    const pathMappings = {
      '/auftritte': '/auftritte/index.html',
      '/galerie': '/galerie/index.html',
      '/impressum': '/impressum/index.html',
      '/datenschutzerklarung': '/datenschutzerklarung/index.html',
    };

    // Check if the path needs to be mapped
    if (pathMappings[url.pathname]) {
      url.pathname = pathMappings[url.pathname];
      const mappedRequest = new Request(url.toString(), request);
      try {
        return await getAssetFromKV(
          { request: mappedRequest, waitUntil: ctx.waitUntil.bind(ctx) },
          { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
        );
      } catch (e) {
        // fall through
      }
    }

    try {
      // Serve static assets
      const response = await getAssetFromKV(
        { request, waitUntil: ctx.waitUntil.bind(ctx) },
        { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
      );

      // Add cache headers for static assets
      const headers = new Headers(response.headers);
      const ext = url.pathname.split('.').pop();

      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'eot'].includes(ext)) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (['css', 'js'].includes(ext)) {
        headers.set('Cache-Control', 'public, max-age=86400');
      } else {
        headers.set('Cache-Control', 'public, max-age=3600');
      }

      return new Response(response.body, {
        status: response.status,
        headers,
      });
    } catch (e) {
      // If not found, try appending /index.html
      try {
        const indexUrl = new URL(request.url);
        if (!indexUrl.pathname.endsWith('/')) {
          indexUrl.pathname += '/';
        }
        indexUrl.pathname += 'index.html';
        const indexRequest = new Request(indexUrl.toString(), request);
        return await getAssetFromKV(
          { request: indexRequest, waitUntil: ctx.waitUntil.bind(ctx) },
          { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
        );
      } catch (e2) {
        return new Response('Page not found', { status: 404 });
      }
    }
  },
};
