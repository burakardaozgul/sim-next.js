<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/">
    <html lang="tr">
      <head>
        <title>XML Sitemap — SIM Baskı Malzemeleri</title>
        <meta name="robots" content="noindex,nofollow"/>
        <style>
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#080C14;color:#F5EDD8;line-height:1.6}
          .header{background:#0F1620;border-bottom:1px solid rgba(255,255,255,.06);padding:32px 24px}
          .header h1{font-size:20px;font-weight:700;color:#C4922A;letter-spacing:1px}
          .header p{font-size:13px;color:#9BA8B4;margin-top:6px}
          .header .count{display:inline-block;background:#C4922A;color:#080C14;font-size:11px;font-weight:700;padding:2px 10px;border-radius:20px;margin-left:8px;vertical-align:middle}
          .container{max-width:1200px;margin:0 auto;padding:24px}
          table{width:100%;border-collapse:collapse;font-size:13px}
          thead th{text-align:left;padding:12px 16px;background:#1A2332;color:#9BA8B4;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid rgba(255,255,255,.06)}
          tbody tr{border-bottom:1px solid rgba(255,255,255,.04);transition:background .15s}
          tbody tr:hover{background:#1A2332}
          tbody td{padding:10px 16px;vertical-align:top}
          a{color:#C4922A;text-decoration:none;word-break:break-all}
          a:hover{text-decoration:underline;color:#E5B84A}
          .langs{display:flex;gap:4px;flex-wrap:wrap;margin-top:4px}
          .lang{font-size:10px;background:#243044;color:#9BA8B4;padding:2px 6px;border-radius:3px;text-transform:uppercase}
          .priority{font-weight:600}
          .priority-high{color:#4ade80}
          .priority-med{color:#C4922A}
          .priority-low{color:#9BA8B4}
          .freq{color:#9BA8B4}
          .date{color:#9BA8B4;white-space:nowrap}
          .footer{text-align:center;padding:24px;color:#9BA8B4;font-size:11px;border-top:1px solid rgba(255,255,255,.06);margin-top:24px}
          .footer a{color:#C4922A}
          @media(max-width:768px){
            .container{padding:12px}
            table{font-size:12px}
            thead th,tbody td{padding:8px 10px}
            .hide-mobile{display:none}
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>
            XML Sitemap
            <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URL</span>
          </h1>
          <p>Bu dosya arama motorlarının siteyi taramasını kolaylaştırır. <a href="https://www.simlimited.net">← Ana Sayfaya Dön</a></p>
        </div>
        <div class="container">
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th class="hide-mobile">Öncelik</th>
                <th class="hide-mobile">Güncelleme</th>
                <th class="hide-mobile">Son Değişiklik</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    <xsl:if test="xhtml:link">
                      <div class="langs">
                        <xsl:for-each select="xhtml:link">
                          <span class="lang"><xsl:value-of select="@hreflang"/></span>
                        </xsl:for-each>
                      </div>
                    </xsl:if>
                  </td>
                  <td class="hide-mobile">
                    <xsl:variable name="prio" select="sitemap:priority"/>
                    <span class="priority">
                      <xsl:attribute name="class">
                        priority
                        <xsl:choose>
                          <xsl:when test="$prio &gt;= 0.8"> priority-high</xsl:when>
                          <xsl:when test="$prio &gt;= 0.5"> priority-med</xsl:when>
                          <xsl:otherwise> priority-low</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td class="hide-mobile freq"><xsl:value-of select="sitemap:changefreq"/></td>
                  <td class="hide-mobile date"><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
        <div class="footer">
          <a href="https://www.simlimited.net">simlimited.net</a> — XML Sitemap
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
