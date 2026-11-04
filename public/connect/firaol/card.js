document.getElementById('share-card')?.addEventListener('click', async () => {
  const url = 'https://kkgtcoffee.com/connect/firaol/';
  const status = document.getElementById('share-status');
  try {
    if (navigator.share) await navigator.share({title:'Firaol Kelbesa | KKGT Coffee',url});
    else {await navigator.clipboard.writeText(url); if(status) status.textContent='Contact page link copied.';}
  } catch(error) {
    if(error instanceof Error && error.name==='AbortError') return;
    if(status) status.textContent=`Share this link: ${url}`;
  }
});
