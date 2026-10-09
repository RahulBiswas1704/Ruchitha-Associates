fetch('https://www.premierenergies.com/').then(r=>r.text()).then(t=> {
  const matches = t.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  if(matches) matches.forEach(m => {
    if(m.toLowerCase().includes('logo') || m.toLowerCase().includes('premier')) console.log(m);
  });
}).catch(console.error);
