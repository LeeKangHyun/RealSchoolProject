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
    visible: false
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
          // Enable playback in silence mode (iOS only)

          // change the volume
          SystemSetting.getVolume().then((volume)=>{
            this.setState({
              volume: volume,
            });
          });
          // SystemSetting.setVolume(1.0);
          SystemSetting.setVolume(0.2);
          Sound.setCategory('Playback', true);
          whoosh.setNumberOfLoops(-1);
          whoosh.play((success) => {
            // Release the audio player resource
            whoosh.release();
          });
          Vibration.vibrate([100], true);
        }}
        onModalHide={() => {
          // Stop the sound and rewind to the beginning
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
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    alert_modal,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAlert);