import React, { Component } from "react"
import Modal from "react-modal"

const customStyles = {
  content: {
    position: "fixed",
    top: "50%",
    left: "50%",
    backgroundColor: "#fafafa",
    transform: "translate(-50%, -50%)"
  }
}

const attrType = ["String", "Number", "Boolean"]

class AttributeModal extends Component {
  state = { name: "", type: "" }

  handleChange = e => {
    this.setState({ name: e.target.value })
  }

  handleSelect = e => {
    this.setState({ type: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, type } = this.state

    const entity = this.props.onAfterOpen()
    const attrObj = { id: entity.id, attribute: { name, type } }

    this.props.entityStore.updateEntity(attrObj)
    this.setState({ name: "", type: "" })
    this.props.closeModal()
  }

  isDisabled = () => !(this.state.name !== "" && this.state.type !== "")

  render() {
    const { isOpen, onAfterOpen, closeModal } = this.props
    return (
      <div>
        <Modal
          isOpen={isOpen}
          onAfterOpen={onAfterOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <h2>Add an attribute to the entity</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Attribute:</label>
            <input
              type="text"
              placeholder="Add attribute..."
              onChange={this.handleChange}
              value={this.state.name}
            />
            <div>
              <label>Select type:</label>
              <select value={this.state.type} onChange={this.handleSelect}>
                <option value="" disabled>
                  Attribute type
                </option>
                {attrType.map((attr, i) => (
                  <option key={i} value={attr}>
                    {attr}
                  </option>
                ))}
              </select>
            </div>

            <div className="btn-container">
              <button type="submit" disabled={this.isDisabled()}>
                submit
              </button>
              <button type="button" onClick={closeModal}>
                close
              </button>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
}

export default AttributeModal
