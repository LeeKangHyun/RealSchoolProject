import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NativeModal from 'react-native-modal';

import Title from '../Title';
import { add_modal } from '../../Redux/modal/action';
import { createRfid } from '../../Redux/rfid/action';
import IosButton from '../IosButton';

class ModalAdd extends Component {
  static defaultProps = {
    visible: false
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      rfid: 0
    }
  }
  
  createItem = (rfid, name) => {
    const {createRfid} = this.props;
    createRfid(rfid, name);
    this.handleClose();
  };
  
  handleClose() {
    const { add_modal } = this.props;
    this.setState({
      name: ""
    });
    add_modal(false);
  }
  
  render() {
    const {
      visible,
      add_modal,
      add,
    } = this.props;
    const { name, } = this.state;
    return (
      <NativeModal
        isVisible={visible}
        onBackdropPress={() => {
          add_modal(false)
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{
          height: 300,
          width: 300,
          backgroundColor: '#fff',
          padding: 15,
        }}>
          <View style={{flex: 2}}>
            <Title>
              아이템 등록
            </Title>
          </View>
          <View
            style={{
              flex: 7,
              marginTop: 22,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                }}
              >
                RFid :
              </Text>
              <TextInput
                style={{
                  padding: 3,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#efefef'
                }}
                editable={false}
                defaultValue={add.rfid}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                }}
              >
                NAME :
              </Text>
              <TextInput
                onChangeText={(text) => {
                  this.setState({name: text})
                }}
                style={{
                  padding: 3,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#efefef'
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <IosButton
              onPress={() => {this.createItem(add.rfid, name)}}
              title={"등록"}
              color={"green"}
              style={{
                width: 120,
                backgroundColor: 'floralwhite'
              }}
            />
            <IosButton
              onPress={() => this.handleClose()}
              title={"취소"}
              color={"firebrick"}
              style={{
                width: 120,
                backgroundColor: 'floralwhite'
              }}
            />
          </View>
        </View>
      </NativeModal>
    );
  }
}

const mapStateToProps = (state) => ({
  add: state.modal.add,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    add_modal,
    createRfid,
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);