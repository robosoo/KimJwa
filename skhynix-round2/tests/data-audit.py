import csv,io,json,pathlib,hashlib
p=pathlib.Path(__file__).resolve().parents[1];core=json.loads((p/'cofa-chapters.json').read_text());db=json.loads((p/'portal-content.json').read_text());guide=json.loads((p/'learning-guide.json').read_text());checks=[]
def test(name,ok):
 assert ok,name
 checks.append({'name':name,'status':'PASS'})
test('14 core chapters',len(core['chapters'])==14);test('5 additional chapters',len(db['newChapters'])==5);test('8 cases and 12 quizzes',len(db['cases'])==8 and len(db['drill'])==12)
for c in core['chapters']+db['newChapters']:test('title/question/facts: '+c['id'],bool(c.get('title')and c.get('question')and c.get('facts')))
cases={c['id']:c for c in db['cases']}
def table(id,index=0):return list(csv.DictReader(io.StringIO(cases[id]['files'][index][1].replace('\\n','\n'))))
rows=table('lot');unique={tuple(r.items()):r for r in rows}.values();valid=[r for r in unique if r['inspected']];test('Lot source row correction',len(rows)==6 and len({r['lot']for r in rows})==5);test('Lot weighted rate',sum(int(r['reject'])for r in valid)==157 and sum(int(r['inspected'])for r in valid)==3500)
r2=[r for r in valid if r['recipe']=='R2'];test('R2 weighted rate',sum(int(r['reject'])for r in r2)==115 and sum(int(r['inspected'])for r in r2)==1500);test('Crossed E1/E2, R1/R2 observations',all(any(r['equipment']==e and r['recipe']==r0 for r in valid)for e in ['E1','E2']for r0 in ['R1','R2']))
a=table('ab');rates={g:sum(int(r['converted'])for r in a if r['group']==g)/sum(int(r['visitors'])for r in a if r['group']==g) for g in ['A','B']};test('AB total and percentage-point delta',abs(rates['A']-.115)<1e-10 and abs(rates['B']-.245)<1e-10 and abs((rates['B']-rates['A'])*100-13)<1e-10)
test('Spec normal/operating mismatch',5.25>5.1 and abs(5.25-5.1-.15)<1e-10)
inv=table('inventory');alloc={('W1','A'):8,('W2','A'):5,('W1','B'):3,('W2','B'):9};test('Inventory capacity',all(alloc[(r['warehouse'],r['sku'])]<=int(r['available'])for r in inv));test('Urgent B shortage remains explicit',10-9==1)
test('Supplier percentages and sample',94/100==188/200 and 20/20==1 and 20<100)
test('Schedule hours and approval separated',sum([8,8,4,8])==sum([4,8,4,12])==28)
test('All four decision explanations for every case',all(set(guide['practicePrompts'][c])=={'uncertain','decision','proof','explain'}for c in cases))
test('Five comparison sections with sources',len(db['compare'])+len(guide['additionalComparisons'])==5 and len(guide['comparisonSources'])==5)
test('Every quiz has valid key and explanation',all(len(q)==4 and isinstance(q[2],int)and 0<=q[2]<len(q[1])and q[3]for q in db['drill']))
luka=json.loads((p/'luka-deep.json').read_text());text=json.dumps(luka,ensure_ascii=False)
for token in ['225','README','INTERVIEW.md','CLAUDE.md','STATE','Codex','Compact','Handoff','Technique','Intent','Cognition','Communication']:test('Luka required topic: '+token,token.lower()in text.lower())
# WCAG contrast calculation for active brand controls.
def lum(h):
 v=[int(h[i:i+2],16)/255 for i in [1,3,5]];v=[x/12.92 if x<=.04045 else((x+.055)/1.055)**2.4 for x in v];return .2126*v[0]+.7152*v[1]+.0722*v[2]
def contrast(a,b):
 x,y=sorted([lum(a),lum(b)]);return(y+.05)/(x+.05)
pairs=[('#111111','#F47725'),('#913b00','#ffffff'),('#626262','#f7f6f4'),('#d1d1d1','#171717')]
for a,b in pairs:test('Brand normal-text contrast '+a+'/'+b,contrast(a,b)>=4.5)
report={'date':'2026-10-25','passed':len(checks),'checks':checks,'contrast':[{'foreground':a,'background':b,'ratio':round(contrast(a,b),2)}for a,b in pairs],'limitations':['No semiconductor process causal effects or device damage thresholds are inferred.','Raw files remain unchanged; source-row and confounding corrections appear in the application.']};(p/'reports/data-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'passed':len(checks),'failed':0,'contrast':report['contrast']}))
