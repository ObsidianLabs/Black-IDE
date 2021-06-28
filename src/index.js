import '@obsidians/platform'
import $loadjs from 'loadjs'

if (!process.env.CDN) {
  import('./react')
} else {
  // Fetch files in parallel and load them in series
  $loadjs([
    'https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js',
    'https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js',
    'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs/loader.js',
    'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs/editor/editor.main.js',
    'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs/editor/editor.main.nls.js',
  ], 'bundle', {
    async: false,
  })

  window.require = { paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs' } }

  window.document.head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/typeface-open-sans@1.1.13/index.min.css">`
  window.document.head.innerHTML += `<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-9ZfPnbegQSumzaE7mks2IYgHoayLtuto3AS6ieArECeaR8nCfliJVuLh/GaQ1gyM" crossorigin="anonymous">`
  window.document.head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.css" />`
  window.document.head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs/editor/editor.main.css" />`

  $loadjs.ready('bundle', () => {
    import('./react')
  })
}