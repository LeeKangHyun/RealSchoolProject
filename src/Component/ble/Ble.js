import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  ScrollView,
  AppState
} from 'react-native';
import Dimensions from 'Dimensions';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { changeRfid, createRfid, removeRfid } from '../../Redux/rfid/action';
import { add_modal, alert_modal } from '../../Redux/modal/action';

const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class BlueTooth extends Component {
  constructor(){
    super();
    
    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: ''
    };
    
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    
    BleManager.start({showAlert: false});
    
    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );
    
    
    
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        if (result) {
          console.log("Permission is OK");
        } else {
          PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
  }
  
  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('연결된 주변 기기: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  }
  
  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }
  
  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    console.log('연결 해제 ' + data.peripheral);
  }
  
  handleUpdateValueForCharacteristic(data) {
    const {
      add_modal,
      alert_modal,
      rfid,
    } = this.props;
    
    console.log('데이터 수신 ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    const buffer = Buffer.Buffer.from(data);
    const sensorData = buffer.readUInt8(1, true);
    console.log(sensorData);
    
    return;
    
    for (let key in rfid) {
      if (rfid.hasOwnProperty(key)) {
        let obj = rfid[key];
        if (value === obj.rfid) {
          return alert_modal(true, obj);
        }
      }
    }
    add_modal(true, '123123')
  }
  
  handleStopScan() {
    console.log('스캔 중지');
    this.setState({ scanning: false });
  }
  
  startScan() {
    if (!this.state.scanning) {
      BleManager.scan([], 3, true).then((results) => {
        console.log('스캔중!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        this.setState({scanning:true});
      });
    }
  }
  
  handleDiscoverPeripheral(peripheral) {
    let peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)){
      console.log('Got ble peripheral', peripheral);
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals })
    }
  }
  
  test(peripheral) {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({peripherals});
          }
          console.log('Connected to ' + peripheral.id);
          console.log(p);
          BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
            console.log(peripheralInfo);
            const serviceUUID = peripheralInfo.characteristics[0].service;
            // const serviceUUID = "FFE0";
            const charUUID = peripheralInfo.characteristics[0].characteristic;
            // const charUUID = "FFE1";
            
            console.log(serviceUUID, charUUID);
            BleManager.startNotification(peripheral.id, serviceUUID, charUUID).then(() => {
              console.log('Started notification on ' + peripheral.id);
              BleManager.read(peripheral.id, serviceUUID, charUUID).catch(err => {
                console.log(err);
              })
            }).catch((error) => {
              console.log('Notification error', error);
            });
          });
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }
  }
  
  render() {
    const list = Array.from(this.state.peripherals.values());
    const dataSource = ds.cloneWithRows(list);
    
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={{margin: 12, padding: 12, backgroundColor:'#ccc'}}
          onPress={() => {
            this.startScan()
          }}
        >
          <Text>블루투스 스캔중 ({this.state.scanning ? '실행 중' : '꺼짐'})</Text>
        </TouchableHighlight>
        <ScrollView
          style={styles.scroll}
        >
          {(list.length === 0) &&
            <View style={{flex:1, margin: 12,}}>
              <Text style={{textAlign: 'center', flex: 1}}>주변 기기 없음</Text>
            </View>
          }
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={(item) => {
              const color = item.connected ? 'green' : '#fff';
              return (
                <TouchableHighlight onPress={() => this.test(item) }>
                  <View style={[styles.row, {backgroundColor: color}]}>
                    <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                    <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 10}}>{item.id}</Text>
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(BlueTooth)