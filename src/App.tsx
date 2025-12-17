import { useState } from 'react'
import './App.css'

interface Resource {
  id: string
  name: string
  size: string
  type: string
  url: string
}

function App() {
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      name: 'example-document.pdf',
      size: '2.5 MB',
      type: 'PDF',
      url: 'https://example.com/example-document.pdf'
    },
    {
      id: '2',
      name: 'sample-image.jpg',
      size: '1.2 MB',
      type: 'JPG',
      url: 'https://example.com/sample-image.jpg'
    },
    {
      id: '3',
      name: 'data-archive.zip',
      size: '15.8 MB',
      type: 'ZIP',
      url: 'https://example.com/data-archive.zip'
    },
    {
      id: '4',
      name: 'presentation.pptx',
      size: '8.3 MB',
      type: 'PPTX',
      url: 'https://example.com/presentation.pptx'
    }
  ])

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>资源下载中心</h1>
        <p>从云端服务器下载您需要的资源</p>
      </header>
      <main className="app-main">
        <div className="resource-list">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-item">
              <div className="resource-info">
                <div className="resource-name">{resource.name}</div>
                <div className="resource-meta">
                  <span className="resource-type">{resource.type}</span>
                  <span className="resource-size">{resource.size}</span>
                </div>
              </div>
              <button 
                className="download-btn"
                onClick={() => handleDownload(resource.url, resource.name)}
              >
                下载
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
