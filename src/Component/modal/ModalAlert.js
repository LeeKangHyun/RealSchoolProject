import React, { Component } from 'react';
import {
  Text,
  Title,
  View,
  Vibration,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NativeModal from 'react-native-modal';
import Sound from 'react-native-sound';
import SystemSetting from 'react-native-system-setting';

import { alert_modal } from '../../Redux/modal/action';
import IosButton from '../IosButton';

const whoosh = new Sound('warning.mp3', Sound.MAIN_BUNDLE, (error) => {});
// Loop indefinitely until stop() is called

class ModalAlert extends Component {
  static defaultProps = {
    visible: false,
    alert: {
      rfid: '',
      name: 'HelloWorld!',
      state: false
    }
  };
  
  handleClose = () => {
    const {
      alert_modal,
    } = this.props;
    alert_modal(false);
  };
  
  render() {
    const {
      visible,
      alert_modal,
      alert,
    } = this.props;
    return (
      <NativeModal
        isVisible={visible}
        style={{
          flex: 1,
        }}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        backdropColor={"#FA1010"}
        backdropOpacity={1}
        onModalShow={() => {
          SystemSetting.getVolume().then((volume)=>{
            this.setState({
              volume: volume,
            });
          });
          SystemSetting.setVolume(1.0);
          Sound.setCategory('Playback', true);
          whoosh.setNumberOfLoops(-1);
          whoosh.play((success) => {
            whoosh.release();
          });
          Vibration.vibrate([100], true);
        }}
        onModalHide={() => {
          whoosh.stop();
          SystemSetting.setVolume(this.state.volume);
          Vibration.cancel();
        }}
      >
        <View style={{
          backgroundColor: '#FA1010',
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <View style={{
            flex: 7,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Image
              source={require('./warning.png')}
              style={{width: 256, height: 256}}
            />
            <Text
              style={{
                fontSize: 32,
                color: '#fff',
                lineHeight: 48,
                fontWeight: 'bold',
              }}
            >
              {alert.data.name}
            </Text>
            <Text
              style={{
                fontSize: 20
              }}
            >
              을(를) 도난 당했습니다.
            </Text>
          </View>
          <View
            style={{
              flex: 3
            }}
          >
            <IosButton
              onPress={() => this.handleClose()}
              title={"확인"}
              style={{
              }}
            />
          </View>
        </View>
      </NativeModal>
    );
  }
}

const mapStateToProps = (state) => ({
  rfid: state.rfid,
  alert: state.modal.alert,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    alert_modal,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAlert);