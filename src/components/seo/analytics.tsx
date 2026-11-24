import Script from "next/script";

/**
 * Google Tag Manager, enabled only when NEXT_PUBLIC_GTM_ID is set (e.g. "GTM-XXXXXXX").
 * Load GA4 and other tags from inside the GTM container.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  if (!id || !/^GTM-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          className="hidden"
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
