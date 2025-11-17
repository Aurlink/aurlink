// src/components/FileUpload.tsx
'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export function FileUpload() {
  const [uploading, setUploading] = useState(false)
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (response.ok) {
        // Handle successful upload
        console.log('File uploaded successfully')
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/csv': ['.csv'],
    },
  })

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#00F5FF] transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag & drop dataset files here, or click to select</p>
      )}
    </div>
  )
}