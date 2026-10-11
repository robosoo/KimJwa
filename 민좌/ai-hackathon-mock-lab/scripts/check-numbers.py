import json,pathlib,math,datetime
P=pathlib.Path(__file__).resolve().parents[1];qs=json.loads((P/'data/round1-question-bank.json').read_text())['questions'];results=[]
def check(id_,actual,expected):
 assert math.isclose(actual,expected,rel_tol=1e-10,abs_tol=1e-10),(id_,actual,expected)
 results.append(dict(id=id_,actual=actual,expected=expected,status='pass'))
for i,a,b in [('R1-002',160/20000*100,.8),('R1-010:accuracy',9900/10000*100,99),('R1-010:recall',0/100,0),('R1-011:precision',80/100*100,80),('R1-011:recall',80/120*100,200/3),('R1-021',83-76,7)]:check(i,a,b)
for q in qs:
 f=q.get('numericFixture');i=q['id']
 if not f:continue
 if f['kind']=='missing':
  v=[v for v in f['values'] if v is not None];check(i,sum(v)/len(v),f['expected'])
 elif f['kind']=='dedup':
  latest={}
  for key,time,status in q['table']['rows']:
   if key not in latest or time>latest[key][0]:latest[key]=(time,status)
  check(i+':count',len(latest),f['expectedCount']);check(i+':rate',sum(x[1]=='완료' for x in latest.values())/len(latest),f['expectedRate'])
 elif f['kind']=='weighted':check(i,sum(f['defects'])/sum(f['tested'])*100,f['expected'])
 elif f['kind']=='unit':
  v=f['microamps']/1000;check(i,v,f['expectedMilli']);assert (v<f['limitMilli'])==f['expectedPass']
 elif f['kind']=='timezone':
  v=datetime.datetime.fromisoformat(f['utc']).astimezone(datetime.timezone(datetime.timedelta(hours=9)));assert v.date().isoformat()==f['expectedDate'];results.append(dict(id=i,actual=v.isoformat(),status='pass'))
 elif f['kind']=='percent':check(i+':pp',f['before']-f['after'],f['expectedPP']);check(i+':relative',(f['before']-f['after'])/f['before']*100,f['expectedRelative'])
for i,a,b in [('P1:nominal',200/8000*100,2.5),('P1:valid',200/7860*100,2.544529262086514),('P3:accuracy',9820/10000*100,98.2),('P3:precision',60/200*100,30),('P3:recall',60/100*100,60),('P3:f1',120/300*100,40),('P3:cost',40*40+140,1740),('refund:user-example',14377000-113*3000,14038000)]:check(i,a,b)
import csv,io
practices=json.loads((P/'data/round1-practice.json').read_text())
u=next(x for x in practices if x['id']=='R1-U01');rows=list(csv.DictReader(io.StringIO(u['datasets'][1]['text'])));latest={}
for row in rows:
 key=row['request_id']
 if key not in latest or row['modified_at']>latest[key]['modified_at']:latest[key]=row
eligible=[]
for row in latest.values():
 purchase=datetime.date.fromisoformat(row['purchase_date']);received=datetime.date.fromisoformat(row['received_date'])
 if datetime.date(2026,7,1)<=received<=datetime.date(2026,9,30) and 0<=(received-purchase).days<=14:
  eligible.append(int(row['amount_krw'])-(3000 if row['reason']=='변심' else 0))
check('R1-U01:eligible-count',len(eligible),4);check('R1-U01:total',sum(eligible),191000)
assert u['choices'][u['answerIndex']]=='191,000원'
u=next(x for x in practices if x['id']=='R1-U02');rows=list(csv.DictReader(io.StringIO(u['datasets'][1]['text'])))
valid=[(int(x['unit_krw'])*100+int(x['delivery_fee_krw']),x['supplier']) for x in rows if int(x['total_lead_days'])<=7 and float(x['defect_percent'])<=1]
check('R1-U02:eligible-count',len(valid),2);check('R1-U02:min-cost',min(valid)[0],205000)
assert min(valid)[1]=='A' and u['choices'][u['answerIndex']]=='A, 205,000원'
(P/'reports/numeric-checks.json').write_text(json.dumps(dict(status='pass',checks=results),ensure_ascii=False,indent=2)+'\n');print(len(results),'independent numeric checks passed')
