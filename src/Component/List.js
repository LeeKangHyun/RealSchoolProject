import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import CheckBox from 'react-native-check-box';

import Button from './IosButton';

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: 'whitesmoke',
    marginBottom: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class List extends Component {
  renderItem = data => {
    const {onPressItem, onChangeItem, onRemoveItem} = this.props;
    const {blueT} = data;
    
    return blueT.map((list) => {
      return (
        <View
          style={styles.item}
          key={list.rfid}
        >
          <CheckBox
            rightText={list.name}
            onClick={(e) => {
              onChangeItem(list.rfid, !list.state)
            }}
            style={{
              flex: 3
            }}
            isChecked={list.state}
          />
          
          <View
            style={{
              flex: 1,
              backgroundColor: 'skyblue'
            }}
          >
            <Button
              onPress={() => {
                onRemoveItem(list.rfid)
              }}
              title={'삭제'}
            />
          </View>
        </View>
      )
    })
  };
  
  render() {
    const { data } = this.props;
    return (
      <View>
        {this.renderItem(data)}
      </View>
    )
  }
}

export default List;