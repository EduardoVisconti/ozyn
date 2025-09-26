// src/components/Analytics.jsx
import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    const GA_ID = import.meta.env.VITE_GA_ID;
    const META_ID = import.meta.env.VITE_META_PIXEL_ID;
    const TIKTOK_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID;

    // GA4
    if (GA_ID && !window._gaLoaded) {
      const gtag = document.createElement("script");
      gtag.async = true;
      gtag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(gtag);
      const inline = document.createElement("script");
      inline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date()); gtag('config', '${GA_ID}');
      `;
      document.head.appendChild(inline);
      window._gaLoaded = true;
    }

    // Meta Pixel
    if (META_ID && !window._fbqLoaded) {
      const s = document.createElement("script");
      s.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n; n.loaded=!0;n.version='2.0'; n.queue=[]; t=b.createElement(e);t.async=!0;
        t.src=v; s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)
      }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${META_ID}'); fbq('track', 'PageView');
      `;
      document.head.appendChild(s);
      window._fbqLoaded = true;
    }

    // TikTok Pixel
    if (TIKTOK_ID && !window._ttqLoaded) {
      const s = document.createElement("script");
      s.innerHTML = `
        !function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
          ttq.methods=["page","track","identify","instances","debug","on","off","upload"];
          ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for (var i=0; i<ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
          ttq.instance=function(t){var e=ttq._i[t]||[];return function(){ttq.push([t].concat(Array.prototype.slice.call(arguments,0)))}};
          ttq.load=function(e){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i=ttq._i||{};ttq._i[e]=[];var n=d.createElement("script");n.async=!0;n.src=i;
          var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a)};
          ttq.load('${TIKTOK_ID}'); ttq.page();
        }(window, document, 'ttq');
      `;
      document.head.appendChild(s);
      window._ttqLoaded = true;
    }
  }, []);

  return null;
}
