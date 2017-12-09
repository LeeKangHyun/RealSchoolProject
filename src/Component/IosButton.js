import React, { Component } from 'react';
import {
  TouchableOpacity,
  Button
} from 'react-native';

class IosButton extends Component {
  static defaultProps = {
    style: {
      flex: 1
    },
    color: 'white',
    title: 'null'
  };
  
  render() {
    const {
      onPress,
      index,
      title,
      style,
      color,
    } = this.props;
    return (
      <TouchableOpacity style={style}>
        <Button
          onPress={() => {index ? onPress(index):onPress()}}
          title={title}
          color={color}
        />
      </TouchableOpacity>
    )
  }
}

export default IosButton;