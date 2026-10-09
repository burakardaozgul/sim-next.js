/**
 * Google Tag Manager (GA4 bu kapsayıcıda yönetilir) — Consent Mode v2 ile.
 * Varsayılan rıza "denied"; CookieConsent kabulünde gtag('consent','update', granted) çağrılır.
 * NEXT_PUBLIC_GTM_ID tanımlı değilse hiçbir şey render edilmez.
 */
export default function Analytics({ gtmId }: { gtmId?: string }) {
  if (!gtmId) return null;
  const consentDefault = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});try{if(localStorage.getItem('cookie-consent')==='accepted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'})}}catch(e){}`;
  const gtm = `(function(w,d,s,l){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${gtmId}'+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer');`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: consentDefault }} />
      <script dangerouslySetInnerHTML={{ __html: gtm }} />
    </>
  );
}
