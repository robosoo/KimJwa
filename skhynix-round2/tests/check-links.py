import urllib.request,urllib.error,concurrent.futures,json,pathlib
p=pathlib.Path(__file__).resolve().parents[1]
m=json.loads((p/'source-manifest.json').read_text())
def check(s):
 r={'id':s['id'],'url':s['url']}
 try:
  q=urllib.request.Request(s['url'],headers={'User-Agent':'Mozilla/5.0','Range':'bytes=0-2047'})
  with urllib.request.urlopen(q,timeout=12)as x:r.update(http_status=x.status,final_url=x.url)
 except urllib.error.HTTPError as e:r.update(http_status=e.code,detail=e.reason)
 except Exception as e:r.update(http_status=None,detail=str(e))
 code=r['http_status'];r['classification']='reachable' if code and 200<=code<400 else 'not_found' if code in [404,410] else 'access_restricted' if code in [401,403,429,999] else 'unverified_request_failure'
 return r
with concurrent.futures.ThreadPoolExecutor(max_workers=6)as ex:results=list(ex.map(check,m['sourceRecords']))
report={'checked_at':'2026-10-25','method':'HTTP GET with Range, timeout 12s; request success is not claim verification','results':results}
(p/'reports/link-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps([{'id':r['id'],'status':r['http_status'],'classification':r['classification']}for r in results],ensure_ascii=False))
