import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Draggable from 'react-draggable';

const entityBaseStyle = {
  position: 'absolute',
  width: 100,
  backgroundColor: '#fafafa',
  border: '1px solid cornflowerblue',
  borderRadius: 4,
  padding: 20
};

export const EntityCanvas = observer(({ entityStore }) => (
  <div>
    {entityStore.entities.map(entity => (
      <Entity key={entity.id} entity={entity} />
    ))}
  </div>
));

const Entity = observer(({ entity }) => (
  <Draggable defaultPosition={{ x: entity.x, y: entity.y }}>
    <div className="draggable" style={Object.assign({}, entityBaseStyle)}>
      {entity.name}
    </div>
  </Draggable>
));
