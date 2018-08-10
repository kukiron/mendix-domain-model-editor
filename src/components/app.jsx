import 'babel-polyfill';
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import AttributeModal from './attributeModal';
import { EntityCanvas } from './entitycanvas';

@observer
export class App extends Component {
  state = { active: false, modalIsOpen: false, entity: null };

  handleBlur = () => {
    this.setState({ active: false });
  };

  handleFocus = entity => {
    this.setState({ active: true, entity });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleOnAfterOpenModal = () => {
    return this.state.entity;
  };

  render() {
    return (
      <div>
        <h1>Domain Model Editor</h1>
        <h4>Select an entity to add new attribute</h4>
        <button onClick={this.onAddEntity}>Add Entity</button>
        <button
          onMouseDown={this.openModal}
          disabled={!this.state.active}
        >
          Add New Attribute
        </button>
        <AttributeModal
          {...this.props}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.handleOnAfterOpenModal}
          closeModal={this.closeModal}
        />
        <EntityCanvas
          entityStore={this.props.entityStore}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }

  onAddEntity = () => {
    const entityName = prompt('Name of the new entity', '');
    if (window && entityName) {
      this.props.entityStore.addEntity(
        entityName,
        Math.random() * innerWidth,
        Math.random() * innerHeight
      );
    }
  };
}
