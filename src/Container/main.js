import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Vibration, } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '../Component/List';
import Title from '../Component/Title';
import IosButton from '../Component/IosButton';
import ModalAdd from '../Component/modal/ModalAdd';
import ModalAlert from '../Component/modal/ModalAlert';

import Sensor from '../Component/ble/SensorComponent';
import BlueTooth from '../Component/ble/Ble';

import { createRfid, changeRfid, removeRfid } from '../Redux/rfid/action';
import { alert_modal, add_modal } from '../Redux/modal/action';

const styleSheet = StyleSheet.create({
  container: {
    flex: 1
  },
});

class Main extends Component {
  render() {
    const {
      rfid,
      changeRfid,
      removeRfid,
      alert,
      add,
      alert_modal,
      add_modal,
    } = this.props;
    return (
      <View style={styleSheet.container}>
        <Title>
          나의 물건을 책임져라
        </Title>
        <View style={{
          flex: 3
        }}>
          <BlueTooth />
        </View>
        <View style={{flex: 6}}>
          <ScrollView>
            <List
              onChangeItem={changeRfid}
              onRemoveItem={removeRfid}
              data={rfid}
            />
          </ScrollView>
        </View>
        <ModalAdd visible={add.on}/>
        <ModalAlert visible={alert.on}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  rfid: state.rfid,
  add: state.modal.add,
  alert: state.modal.alert,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    createRfid,
    changeRfid,
    removeRfid,
    add_modal,
    alert_modal,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);