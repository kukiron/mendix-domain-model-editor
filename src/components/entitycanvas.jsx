import React, { Component } from 'react';
import { observer } from 'mobx-react';

const entityBaseStyle = {
	position: 'absolute',
	width: 100,
	border: '1px solid cornflowerblue',
	borderRadius: 4,        
	padding: 20
};

export const EntityCanvas = observer(({entityStore}) => (
  <div>
	{entityStore.entities.map(entity =>
	  <Entity entity={entity} />
	)}
  </div>
));
    
const Entity = observer(({entity}) => (
	<div
			style={Object.assign({}, entityBaseStyle, {
		  		left: entity.y,
		  		top: entity.x
			})}
	>
		{entity.name}
	</div>
))
