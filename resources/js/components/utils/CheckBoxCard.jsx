import React from 'react'
import { Form } from 'react-bootstrap'

const CheckBoxCard = (props) => {
  return (
    <div className="card">
      <div className="card-header" id={`heading-${props.label}`}>
        <h2 className="mb-0">
          <button
            className="btn btn-link btn-block text-left"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse-${props.label}`}
            aria-expanded="false"
            aria-controls={`collapse-${props.label}`}
          >
            {props.title}
          </button>
        </h2>
      </div>

      <div
        id={`collapse-${props.label}`}
        className="collapse"
        aria-labelledby={`heading-${props.label}`}
        data-parent="#bookFilterAccordion"
      >
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
    </div>
  )
}

export default CheckBoxCard
