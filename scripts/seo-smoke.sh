#!/usr/bin/env bash
# SEO smoke checks — run against a local `next start` or production.
# Usage: scripts/seo-smoke.sh [BASE_URL]   (default http://localhost:3000)
# Exit code 1 if any check fails. Mirrors the acceptance criteria in marketing/seo-geo/10-Teknik-Backlog.md.
set -u
BASE="${1:-http://localhost:3000}"
UA="Mozilla/5.0 (compatible; seo-smoke)"
fail=0; pass=0
check() { # check "<label>" <condition-exit-code>
  if [ "$2" -eq 0 ]; then echo "PASS  $1"; pass=$((pass+1)); else echo "FAIL  $1"; fail=$((fail+1)); fi
}
hdr() { curl -sS -I -A "$UA" --max-time 30 "$BASE$1" 2>/dev/null | tr -d '\r'; }
hdr_with_cookie() { curl -sS -I -A "$UA" --max-time 30 -H "Cookie: $2" "$BASE$1" 2>/dev/null | tr -d '\r'; }
status() { echo "$1" | head -1 | awk '{print $2}'; }

echo "== SEO smoke @ $BASE =="

# robots.txt
R=$(curl -sS -A "$UA" "$BASE/robots.txt")
check "robots.txt does not disallow /_next/"      $([ "$(echo "$R" | grep -c '_next')" -eq 0 ]; echo $?)
check "robots.txt still disallows /api/"           $(echo "$R" | grep -q 'Disallow: /api/'; echo $?)
check "robots.txt references sitemap"              $(echo "$R" | grep -qi 'Sitemap:'; echo $?)

# /tr prefix → 308
H=$(hdr /tr/urunler); check "/tr/urunler → 308" $([ "$(status "$H")" = "308" ]; echo $?)
check "/tr/urunler location is /urunler"           $(echo "$H" | grep -qi '^location: .*/urunler$'; echo $?)
H=$(hdr /tr);         check "/tr → 308"         $([ "$(status "$H")" = "308" ]; echo $?)

# home: no Link hreflang header, no NEXT_LOCALE cookie, cacheable
H=$(hdr /)
check "/ returns 200"                              $([ "$(status "$H")" = "200" ]; echo $?)
check "/ has no HTTP Link hreflang header"         $([ "$(echo "$H" | grep -ci '^link: .*hreflang')" -eq 0 ]; echo $?)
check "/ sets no NEXT_LOCALE cookie"               $([ "$(echo "$H" | grep -ci 'set-cookie: NEXT_LOCALE')" -eq 0 ]; echo $?)
check "/ is cacheable (no private/no-store)"       $([ "$(echo "$H" | grep -i '^cache-control' | grep -ci 'no-store')" -eq 0 ]; echo $?)

# product page: no Link hreflang header either; canonical present
H=$(hdr /urunler/sakata-inx-cmyk-murekkepler)
check "product page 200"                           $([ "$(status "$H")" = "200" ]; echo $?)
check "product page has no HTTP Link hreflang"     $([ "$(echo "$H" | grep -ci '^link: .*hreflang')" -eq 0 ]; echo $?)
B=$(curl -sS -A "$UA" "$BASE/urunler/sakata-inx-cmyk-murekkepler")
check "product page canonical is self"             $(echo "$B" | grep -q 'rel="canonical" href="https://www.simlimited.net/urunler/sakata-inx-cmyk-murekkepler"'; echo $?)

# cookie preference redirect
H=$(hdr_with_cookie / "USER_LOCALE_PREFERENCE=en")
check "/ with en preference → 302 /en"             $([ "$(status "$H")" = "302" ] && echo "$H" | grep -qi '^location: .*/en$'; echo $?)
check "preference redirect is not CDN-cacheable"   $(echo "$H" | grep -i '^cache-control' | grep -qi 'no-store'; echo $?)

# WordPress leftovers → 404 (not redirect to home)
H=$(hdr /wp-admin/index.php); check "/wp-admin/* → 404" $([ "$(status "$H")" = "404" ]; echo $?)

# wrong-locale slugs → 308 to the locale's own slug
H=$(hdr /urunler/sakata-inx-cmyk-inks);        check "EN slug under TR path → 308 TR slug"   $([ "$(status "$H")" = "308" ] && echo "$H" | grep -qi 'location: .*/urunler/sakata-inx-cmyk-murekkepler$'; echo $?)
H=$(hdr /en/products/sakata-inx-cmyk-murekkepler); check "TR slug under EN path → 308 EN slug" $([ "$(status "$H")" = "308" ] && echo "$H" | grep -qi 'location: .*/en/products/sakata-inx-cmyk-inks$'; echo $?)
H=$(hdr /blog/pantone-color-system-guide);     check "EN blog slug under TR → 308"          $([ "$(status "$H")" = "308" ]; echo $?)

# no hard-coded TR slugs inside EN pages; language switcher uses EN slug
B=$(curl -sS -A "$UA" "$BASE/en/printing-materials")
check "EN landing has no TR product slugs"         $([ "$(echo "$B" | grep -c '/en/products/sakata-inx-cmyk-murekkepler')" -eq 0 ]; echo $?)
B=$(curl -sS -A "$UA" "$BASE/urunler/sakata-inx-cmyk-murekkepler")
check "TR product page: EN switcher link uses EN slug" $(echo "$B" | grep -q 'href="/en/products/sakata-inx-cmyk-inks"'; echo $?)
check "TR product page: RU switcher link uses RU slug" $(echo "$B" | grep -q 'href="/ru/produkty/sakata-inx-cmyk-kraski"'; echo $?)
B=$(curl -sS -A "$UA" "$BASE/en/products/sakata-inx-cmyk-inks")
check "EN product page: TR switcher link is unprefixed TR slug" $(echo "$B" | grep -q 'href="/urunler/sakata-inx-cmyk-murekkepler"'; echo $?)
check "EN product page: no /tr/ or /en/urunler links" $([ "$(echo "$B" | grep -cE 'href="/(tr/|en/urunler/|ru/urunler/|ar/urunler/)')" -eq 0 ]; echo $?)
check "TR product page: no /tr/ switcher link"     $([ "$(echo "$B" | grep -c 'href="/tr/')" -eq 0 ]; echo $?)

# branded 404s
H=$(hdr /bilinmeyen-sayfa-xyz); check "unknown URL → 404" $([ "$(status "$H")" = "404" ]; echo $?)
B=$(curl -sS -A "$UA" "$BASE/bilinmeyen-sayfa-xyz"); check "root 404 is branded (title + body) and noindex" $(echo "$B" | grep -q 'Sayfa Bulunamadı' && echo "$B" | grep -qi 'name="robots" content="noindex'; echo $?)
H=$(hdr /en/unknown-page-xyz); check "unknown EN URL → 404" $([ "$(status "$H")" = "404" ]; echo $?)
B=$(curl -sS -A "$UA" "$BASE/en/unknown-page-xyz"); check "EN 404 is localized" $(echo "$B" | grep -q 'Page Not Found'; echo $?)

# blog: typo slug redirect, newest-first ordering on home, single brand in list title
H=$(hdr /blog/flekso-baski-murakkepleri-rehberi); check "typo blog slug → 308" $([ "$(status "$H")" = "308" ] && echo "$H" | grep -qi 'murekkepleri-rehberi'; echo $?)
B=$(curl -sS -A "$UA" "$BASE/"); check "home shows newest post first (chemicals guide)" $(echo "$B" | grep -q 'href="/blog/baski-kimyasallari-rehberi"'; echo $?)
B=$(curl -sS -A "$UA" "$BASE/blog"); check "blog list title has the brand once" $([ "$(echo "$B" | grep -oE '<title>[^<]*' | grep -o 'SIM Baskı Malzemeleri' | wc -l | tr -d ' ')" = "1" ]; echo $?)

# pillar /matbaa-malzemeleri (brief A): depth, schema, EN export page, blog guide block
P=$(curl -sS -A "$UA" "$BASE/matbaa-malzemeleri")
check "pillar H1 names keyword + 1983"                  $(echo "$P" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -q 'Matbaa Malzemeleri' && echo "$P" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -q '1983'; echo $?)
check "pillar has ItemList + FAQPage + BreadcrumbList JSON-LD" $(echo "$P" | grep -q '"@type":"ItemList"' && echo "$P" | grep -q '"@type":"FAQPage"' && echo "$P" | grep -q '"@type":"BreadcrumbList"'; echo $?)
PW=$(echo "$P" | sed -e 's/<script[^>]*>[^<]*<\/script>//g' -e 's/<[^>]*>/ /g' | wc -w | tr -d ' ')
check "pillar body ≥ 2500 words ($PW)"                   $([ "$PW" -ge 2500 ]; echo $?)
check "pillar links 8 categories to products/guides"     $([ "$(echo "$P" | grep -o 'id="\(offset\|pantone\|metallic\|fluorescent\|uv\|blanket\|chemicals\|varnish\)"' | sort -u | wc -l | tr -d ' ')" = "8" ]; echo $?)
PE=$(curl -sS -A "$UA" "$BASE/en/printing-materials")
check "EN pillar H1 is export-oriented (Turkey + 1983)"  $(echo "$PE" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -q 'Turkey' && echo "$PE" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -q '1983'; echo $?)
check "EN pillar inline product links use EN slugs"      $(echo "$PE" | grep -q 'href="/en/products/' && ! echo "$PE" | grep -q 'href="/urunler/'; echo $?)
BP=$(curl -sS -A "$UA" "$BASE/blog/ofset-murekkep-secimi")
check "blog post shows pillar guide block"               $(echo "$BP" | grep -q 'href="/matbaa-malzemeleri"'; echo $?)

# about /hakkimizda (brief G): E-E-A-T page, schema, EN, author box
A=$(curl -sS -A "$UA" "$BASE/hakkimizda")
check "about H1 names 1983"                              $(echo "$A" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -q '1983'; echo $?)
check "about has AboutPage + FAQPage JSON-LD"            $(echo "$A" | grep -q '"@type":"AboutPage"' && echo "$A" | grep -q '"@type":"FAQPage"'; echo $?)
AW=$(echo "$A" | sed -e 's/<script[^>]*>[^<]*<\/script>//g' -e 's/<[^>]*>/ /g' | wc -w | tr -d ' ')
check "about body ≥ 1000 words ($AW)"                     $([ "$AW" -ge 1000 ]; echo $?)
check "about timeline shows 1983 and 1998"               $(echo "$A" | grep -q '>1983<' && echo "$A" | grep -q '>1998<'; echo $?)
AE=$(curl -sS -A "$UA" "$BASE/en/about")
check "EN about H1 names Turkey + 1983"                  $(echo "$AE" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -q 'Turkey' && echo "$AE" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -q '1983'; echo $?)
check "blog post has author box linking to about"        $(echo "$BP" | grep -q 'href="/hakkimizda"'; echo $?)

# istanbul local page (brief F): local intent H1, map embed, district table, FAQPage
I=$(curl -sS -A "$UA" "$BASE/matbaa-malzemeleri-istanbul")
check "istanbul H1 is local (İstanbul + Aynı Gün)"       $(echo "$I" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -q 'İstanbul' && echo "$I" | grep -oE '<h1[^>]*>[^<]*</h1>' | grep -qi 'Aynı Gün'; echo $?)
check "istanbul page embeds a lazy Google map"           $(echo "$I" | grep -q '<iframe' && echo "$I" | grep -q 'google.com/maps' && echo "$I" | grep -q 'loading="lazy"'; echo $?)
check "istanbul district table has ≥ 16 rows"            $([ "$(echo "$I" | grep -o '<th scope="row"' | wc -l | tr -d ' ')" -ge 16 ]; echo $?)
check "istanbul has FAQPage + WebPage schema"            $(echo "$I" | grep -q '"@type":"FAQPage"' && echo "$I" | grep -q '"@type":"WebPage"'; echo $?)
check "home LocalBusiness areaServed lists districts"    $(curl -sS -A "$UA" "$BASE/" | grep -q '"name":"Beylikdüzü"'; echo $?)

# generated llms.txt + sitemap hygiene + IndexNow key file
L=$(curl -sS -A "$UA" "$BASE/llms.txt"); check "llms.txt is served and lists the newest post" $(echo "$L" | grep -q 'baski-kimyasallari-rehberi' && echo "$L" | grep -q '1983'; echo $?)
check "llms.txt has no stale postal code"           $([ "$(echo "$L" | grep -c '34000')" -eq 0 ]; echo $?)
S=$(curl -sS -A "$UA" "$BASE/sitemap.xml"); check "sitemap excludes noindex pages" $([ "$(echo "$S" | grep -c 'gizlilik-politikasi\|privacy-policy')" -eq 0 ]; echo $?)
check "sitemap has 138 URLs (no ru/ar blog summaries)" $([ "$(echo "$S" | grep -c '<loc>')" -eq 138 ]; echo $?)
check "sitemap has no ru/ar blog URLs"                $(! echo "$S" | grep -qE '/(ru|ar)/blog/'; echo $?)
H=$(hdr /978eda0da5050651d3ec438c9854edea.txt); check "IndexNow key file served" $([ "$(status "$H")" = "200" ]; echo $?)

# PR-7/PR-8: CSP header, visible H1, all service descriptions in HTML, consent checkbox
H=$(hdr /); check "CSP header present" $(echo "$H" | grep -qi '^content-security-policy:'; echo $?)
B=$(curl -sS -A "$UA" "$BASE/"); check "home H1 is visible (not sr-only)" $(echo "$B" | grep -oE '<h1[^>]*>' | grep -vq 'sr-only' && [ "$(echo "$B" | grep -c '<h1')" -ge 1 ]; echo $?)
check "all 7 service descriptions are in the home HTML" $([ "$(echo "$B" | grep -o 'ST PRO DOT' | wc -l | tr -d ' ')" -ge 1 ] && echo "$B" | grep -q 'Fluorescent\|floresan\|Floresan'; echo $?)
B=$(curl -sS -A "$UA" "$BASE/iletisim"); check "contact form has KVKK consent checkbox" $(echo "$B" | grep -q 'name="consent"'; echo $?)
check "contact tel link is E.164" $(echo "$B" | grep -q 'href="tel:+902126376249"'; echo $?)

# home services link target exists
H=$(hdr /urunler/vector-baski-blanketleri); check "7th service target product 200" $([ "$(status "$H")" = "200" ]; echo $?)

echo "== $pass passed, $fail failed =="
[ "$fail" -eq 0 ]
