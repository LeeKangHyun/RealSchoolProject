import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NativeModal from 'react-native-modal';

class Alert extends Component {
  render() {
    return (
      <NativeModal
        isVisible={visible}
        onBackdropPress={() => {
          alert_modal(false)
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
                RfId :
              </Text>
              <TextInput
                onChangeText={(text) => {
                  this.setState({rfid: +text})
                }}
                style={{
                  padding: 3,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#efefef'
                }}
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
              onPress={() => {this.createItem(rfid, name)}}
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

Alert.propTypes = {};
Alert.defaultProps = {};

export default Alert;