async function main() {
  const res = await fetch('https://ghienphimz.mom/client_assets/js/dataview/homeview.js?v=5.3.69g');
  const text = await res.text();
  console.log('homeview.js len:', text.length);
  // find API calls, $.ajax, fetch
  const apis = [...text.matchAll(/(?:\$\.ajax|\.get|\.post|fetch)[\s\S]{0,100}/g)].map(m => m[0]);
  console.log('API calls in homeview.js:', apis.slice(0, 5));
}
main();
