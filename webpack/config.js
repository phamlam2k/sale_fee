const CSP = `
  default-src 'self';
  connect-src 'self';
  connect-src 'self';
  worker-src 'self';
  script-src 'self' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: ;
  media-src 'self';
  object-src 'none';
  frame-src http: https:;
  form-action 'none';`
  .replace(/\s+/g, ' ')
  .trim()

module.exports = {
  CSP
}
