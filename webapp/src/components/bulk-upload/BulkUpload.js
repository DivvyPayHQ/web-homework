import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import CsvUpload from '../../gql/csvUpload.gql'

const BulkUpload = () => {
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)

  const [ uploadCsv ] = useMutation(CsvUpload)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  }

  useEffect(() => {
    console.log('selectedFile', selectedFile)
  }, [selectedFile])

  const handleSubmission = e => {
    e.preventDefault()
    // @ts-ignore
    const formData = new window.FormData()

    formData.append('File', selectedFile)

    const reader = new window.FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)
      console.log('TEXT', text)

      uploadCsv({
        variables: {
          csvData: text
        }
      })
    }
    reader.readAsText(selectedFile)
  }

  return (
    <div>
      <h1>Upload Transaction Data CSV</h1>
      <br />
      <input id='csv-upload-input' name='csv-upload' onChange={changeHandler} type='file' />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  )
}

export default BulkUpload
