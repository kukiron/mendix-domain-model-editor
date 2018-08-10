import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Draggable from 'react-draggable';

const entityBaseStyle = {
  position: 'absolute',
  width: 100,
  backgroundColor: '#fafafa',
  border: '1px solid cornflowerblue',
  borderRadius: 4,
  padding: 20,
  cursor: 'pointer'
};

export const EntityCanvas = observer(({ entityStore, onBlur, onFocus }) => (
  <div>
    {entityStore.entities.map((entity, i) => (
      <Entity key={i} entity={entity} onBlur={onBlur} onFocus={onFocus} />
    ))}
  </div>
));

const Entity = observer(({ entity, onBlur, onFocus }) => (
  <Draggable defaultPosition={{ x: entity.x, y: entity.y }}>
    <div
      className="draggable"
      style={Object.assign({}, entityBaseStyle)}
      onFocus={() => onFocus(entity)}
      onBlur={onBlur} tabIndex={0}
    >
      {entity.name}
      {entity.attributes &&
        entity.attributes.length > 0 &&
        entity.attributes.map((attr, i) => (
          <div key={i}>
            <b>{attr.name}</b>: <i>{attr.type}</i>
          </div>
        ))}
    </div>
  </Draggable>
));
