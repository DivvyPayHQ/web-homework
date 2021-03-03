import React, { Fragment } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { AddUser, GetUsers } from 'gql/users.gql'
import { Button, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Breadcrumbs, Loading, MUIModal, UsersTable } from 'components'
import Add from './Add'

export default function Users () {
  const [open, setOpen] = React.useState(false)
  const [addUser] = useMutation(AddUser, {
    onCompleted: () => {
      handleClose()
      refetch()
    }
  })

  const { loading, error, data = {}, refetch } = useQuery(GetUsers)

  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  const handleSubmit = (formData) => {
    addUser({
      variables: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        dob: formData.dob
      }
    })
  }

  if (loading) return (<Loading />)

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Grid container justify='center' spacing={2}>
        <Grid item xs={12}><Breadcrumbs /></Grid>
        <Grid item xs={12}>
          <Button
            color='primary'
            onClick={handleOpen}
            startIcon={<AddIcon />}
            variant='contained'
          >
            Add User
          </Button>
        </Grid>
        <Grid item xs={12}>
          <UsersTable data={data.users} />
        </Grid>
      </Grid>
      <MUIModal
        content={<Add submitForm={handleSubmit} />}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
    </Fragment>
  )
}
