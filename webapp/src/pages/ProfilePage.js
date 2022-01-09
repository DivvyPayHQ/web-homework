import React, { useEffect, useState } from 'react'

import * as globalStyles from '../global styles/GlobalStyles'
import * as profileStyles from './ProfilePageStyles'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import { useFirestore } from '../hooks/useFirestore'
import moment from 'moment'
export default function ProfilePage () {
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('photoUploads')
  const { deleteDocument } = useFirestore('photoUploads')
  const { uid, displayName, email, metadata } = user
  const [ photoUrl, setPhotoUrl ] = useState('')
  const { documents, error } = useCollection(
    'photoUploads',
    ['userId', '==', user.uid],
    ['createdAt', 'desc']
  )

  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY')
  }

  const addPhoto = (e) => {
    e.preventDefault()
    addDocument({
      photo: photoUrl, userId: uid
    })
    setPhotoUrl('')
  }

  useEffect(() => {
    if (response.success) {
      return (
        <div> photo was added! </div>
      )
    }
  }, [response.success])

  return (
    <div css={profileStyles.profile}>
      <h3 className='title'>profile</h3>
      <div className='profile-info'>
        <div className='label'>User Id: <span >{uid}</span></div>
        <div className='label'>Display Name: <span >{displayName}</span></div>
        <div className='label'>Email: <span >{email}</span></div>
        <div className='label'>Member Since: <span >{formatDate(metadata['creationTime'])}</span></div>
        <div className='label'>Last Signed In: <span > {formatDate(metadata['lastSignInTime'])}</span></div>
        <div className='label'>Uploaded Photos: </div>
        <div className='grid' >
          {documents && documents.map((doc, index) => {
            return (
              <div key={`photo-${doc.id}`} >
                <img alt={doc.photo} className='photo-upload'src={doc.photo} title={doc.id} />
                <button className='delete-button' css={globalStyles.buttonTwo} onClick={() => deleteDocument(doc.id)}>delete</button>
              </div >
            )
          })}
        </div>
        <div css={globalStyles.form}>
          <form className='add-photo-form' onSubmit={addPhoto}>
            <label>
              <input onChange={(e) => setPhotoUrl(e.target.value)} placeholder='upload a new image URL here' type='text' value={photoUrl} />
            </label>
            <div className='button-container'>
              <button css={globalStyles.buttonOne} type='submit'>Add Photo</button>
            </div>
          </form>
        </div>
        { error && <p css={globalStyles.errorMessage}>{ error }</p>}
        {response.error && <p>{response.error}</p>}
      </div>
    </div>
  )
}
