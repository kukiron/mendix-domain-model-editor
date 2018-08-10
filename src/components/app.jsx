import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { EntityCanvas } from './entitycanvas';

@observer
export class App extends Component {
  render() {
    return (
      <div>
        <h1>Domain Model Editor</h1>
        <button onClick={this.onAddEntity}>Add Entity</button>
        <EntityCanvas entityStore={this.props.entityStore} />
      </div>
    );
  }

  onAddEntity = () => {
    const entityName = prompt("Name of the new entity", "");
    if (entityName) {
      this.props.entityStore.addEntity(entityName, Math.random() * 1000, Math.random() * 1000);
    }
  }
};
