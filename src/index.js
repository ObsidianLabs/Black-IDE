import '@obsidians/platform'
import $loadjs from 'loadjs'

$loadjs('https://solc-bin.ethereum.org/bin/list.js')

if (!process.env.CDN) {
  import('./react')
} else {
  // Fetch files in parallel and load them in series
  $loadjs([
    'https://cdnjs.cloudflare.com/ajax/libs/react/16.12.0/umd/react.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.12.0/umd/react-dom.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/loader.js',
    'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/editor/editor.main.js',
    'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/editor/editor.main.nls.js',
  ], 'bundle', {
    async: false,
  })

  window.require = { paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } }

  window.document.head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/typeface-open-sans@1.1.13/index.min.css">`
  window.document.head.innerHTML += `<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-9ZfPnbegQSumzaE7mks2IYgHoayLtuto3AS6ieArECeaR8nCfliJVuLh/GaQ1gyM" crossorigin="anonymous">`
  window.document.head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hack-font/3.3.0/web/hack.min.css" integrity="sha512-XgCw4Srl8lC1ECwcaHwAU0WnxQwHkqmInzg9wJLtGB7DRuMaXPuK2k9WJ2AwRDGdrgK9eJpZl2hUlLi2WQssmw==" crossorigin="anonymous" />`
  window.document.head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/editor/editor.main.min.css" integrity="sha512-9uX8QlyL0SosYXO3oNqyiXdnmhtWk22wutqEzGR53Bezc+yqYVvFukBAOW97fPx/3Dxdul77zW27GwHRzdYfMg==" crossorigin="anonymous" />`

  $loadjs.ready('bundle', () => {
    import('./react')
  })
}
