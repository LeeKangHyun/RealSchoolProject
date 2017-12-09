import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'skyblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
});

export default class Title extends Component {
  
  render() {
    const {children} = this.props;
    
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{children}</Text>
      </View>
    )
  }
}

