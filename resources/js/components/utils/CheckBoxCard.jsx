import React from 'react'
import { Form } from 'react-bootstrap'

const CheckBoxCard = (props) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <p>
          <strong>{props.title}</strong>
        </p>
        {props.items.map((item, index) => {
          return (
            <Form.Check
              type="checkbox"
              label={
                props.label === 'star' ? `${item} star` : item[props.label]
              }
              checked={
                props.label === 'star'
                  ? props.state[item]
                  : props.state[item.id]
              }
              key={index}
              onChange={() => {
                if (props.label === 'star') {
                  props.setState((prevState) => ({
                    ...prevState,
                    [item]: !prevState[item],
                  }))
                  console.log(props.state)
                } else {
                  props.setState((prevState) => ({
                    ...prevState,
                    [item.id]: !prevState[item.id],
                  }))
                  console.log(props.state)
                }
                props.getBooks()
              }}
            ></Form.Check>
          )
        })}
      </div>
    </div>
  )
}

export default CheckBoxCard
