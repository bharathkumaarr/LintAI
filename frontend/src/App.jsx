import { useEffect, useState } from 'react'
import Prism from 'prismjs'
import Editor from 'react-simple-code-editor';
import axios from 'axios'
import markdown from 'react-markdown'

import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'
import './App.css'
import Markdown from 'react-markdown';



function App() {
  const [code, setCode] = useState(`function sum(){
    return 1+1
  }
  `)
  const [review, setReview] = useState(``)

  useEffect(()=>{
    Prism.highlightAll()
  })

  async function reviewCode(){
    const response = axios.post('http://localhost:3001/ai/get-review', {code})
    setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
          <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                borderRadius: '3.125rem',
                outline: 'none',
              }}
              textareaClassName="editor-textarea"
                />


          </div>
          <button onClick={reviewCode} className="review">Review</button>
        </div>
        <div className="right">
          <Markdown style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                borderRadius: '3.125rem',
                outline: 'none',
              }}>{review}</Markdown>
        </div>
      </main>
    </>
  )
}




export default App