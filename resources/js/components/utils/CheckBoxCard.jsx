import React from 'react'
import { Form, Card, Button } from 'react-bootstrap'

const CheckBoxCard = (props) => {
  return (
    <Card>
      <Card.Header id={`heading-${props.label}`}>
        <h2 className="mb-0">
          <Button
            variant="link"
            className="btn-block text-left"
            data-toggle="collapse"
            data-target={`#collapse-${props.label}`}
            aria-expanded="false"
            aria-controls={`collapse-${props.label}`}
          >
            {props.title}
          </Button>
        </h2>
      </Card.Header>

      <div
        id={`collapse-${props.label}`}
        className="collapse"
        aria-labelledby={`heading-${props.label}`}
        data-parent="#bookFilterAccordion"
      >
        <Card.Body>
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
        </Card.Body>
      </div>
    </Card>
  )
}

export default CheckBoxCard
