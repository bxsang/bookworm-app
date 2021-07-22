import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertDismissible = (props) => {
  return (
    <>
      <Alert
        show={props.show}
        onClose={() => props.setShow(false)}
        variant={props.variant}
        dismissible
      >
        {props.message}
      </Alert>
    </>
  )
}

export default AlertDismissible
