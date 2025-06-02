/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { storefrontRedirect } from "@shopify/hydrogen";
import { createContentSecurityPolicy } from "@shopify/hydrogen";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: AppLoadContext
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);

  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    connectSrc: [
      // (ie. 'wss://<your-ngrok-domain>.app:*')
      "self",
      "wss://shopitest.parrag.net:*",
      "https://glorious-mature-filly.ngrok-free.app",
      "https://upload.imagekit.io",
      "wss://glorious-mature-filly.ngrok-free.app",
      "https://api-service.vanceai.com",
      "https://shopitest.parrag.net",
    ],
    fontSrc: [
      "self",
      "https://fonts.googleapis.com/",
      "https://fonts.gstatic.com/",
    ],
    styleSrc: [
      "self",
      "https://fonts.googleapis.com/",
      "https://fonts.gstatic.com/",
      "https://shopitest.parrag.net/",
    ],
    imgSrc: [
      "self",
      "data:",
      "https://cdn.shopify.com/",
      "https://cdn.sanity.io/",
      "https://ik.imagekit.io/",
      "https://images.unsplash.com/",
      "blob:",
    ],
    mediaSrc: ["self", "data:", "https://ik.imagekit.io/"],
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: controller.signal,
      onError(error: unknown) {
        if (!controller.signal.aborted) {
          // Log streaming rendering errors from inside the shell
          console.error(error);
        }
        responseStatusCode = 500;
      },
    }
  );

  body.allReady.then(() => clearTimeout(timeoutId));

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  if (context.session.isPending) {
    responseHeaders.set("Set-Cookie", await context.session.commit());
  }

  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("Content-Security-Policy", header);

  const response = new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });

  if (responseStatusCode === 404) {
    /**
     * Check for redirects only when there's a 404 from the app.
     * If the redirect doesn't exist, then `storefrontRedirect`
     * will pass through the 404 response.
     */
    return storefrontRedirect({
      request,
      response,
      storefront: context.storefront,
    });
  }
  return response;
}
