process = { env: {} }
importScripts('./solc-wrapper.js')

onmessage = function (e) {
  const { id, method, data } = e.data
  console.log(' onmessage e.data --->', e.data);
  if (method === 'compile') {
    const result = compileProject(data)
    postMessage({ id, data: result })
  }
}

function compileProject ({ solcUrl, input }) {
  if (typeof solc === 'undefined') {
    importScripts(solcUrl)
    solc = wrapper(Module)
  }
  try {
    const output = solc.compile(input, { import: importFile })
    console.log(' output ----', output);
    return JSON.parse(output)
  } catch (error) {
    console.log('solc compile failed', error);
    return error
  }
}

function importFile (path) {
  const len = new SharedArrayBuffer(4)
  const lenArray = new Int32Array(len)

  let content = new SharedArrayBuffer(2 * 65536)
  let contentArray = new Uint16Array(content)

  postMessage({ method: 'getFile', data: { path, buffer: { len, content } } })

  Atomics.wait(lenArray, 0, 0)
  if (lenArray[0] > 0) {
    const contentString = String.fromCharCode.apply(null, contentArray.slice(0, lenArray[0]))
    return JSON.parse(contentString)
  }


  const length = -lenArray[0]
  content = new SharedArrayBuffer(2 * length)
  contentArray = new Uint16Array(content)
  lenArray[0] = 0

  postMessage({ method: 'getFile', data: { path, buffer: { len, content } } })
  
  Atomics.wait(lenArray, 0, 0)
  const contentString = String.fromCharCode.apply(null, contentArray.slice(0, lenArray[0]))
  return JSON.parse(contentString)
}
