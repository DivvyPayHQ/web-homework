import { css } from '@emotion/core'

export const profile = css`
  .profile-info {
  max-width: 360px;
  padding: 30px;
  background: #aacfd0; 
  border-radius: 4px;
  margin: 50px auto;
}

.title {
  color: #34495e;
  text-transform: lowercase;
  font-size: 30px;
  text-align: center;
  
}

.photo-upload {
  height: 100px;
  width: 90%;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 4px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grip-gap: 10px;
}

.label {
  font-weight: 900;
  font-size: 16px;
  margin: 30px auto;
  color: #34495e;
  text-transform: lowercase; 

  span {
    color: #757575;
    font-weight: 500;
    float: right;
  }
}

.delete-button {
  width: 90%;
}
`
