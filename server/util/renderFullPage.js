/* App initial state
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          // window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
*/

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>√ote</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.4/Chart.bundle.min.js"></script>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__INITIAL_STATE__ = ${preloadedState 
            ? JSON.stringify(preloadedState).replace(/</g, '\\u003c')
            : null
          }
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}

module.exports = renderFullPage
