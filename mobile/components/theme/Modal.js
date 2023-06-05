import React from 'react'
import { Modal as ReactModal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Button from './Button'
import * as icons from '../../assets/icons'

const {width: windowWidth, height: windowHeight} = Dimensions.get('window')

export default function Modal ({
    Header,
    modalVisible,
    text = ' ',
    success = false,
    showFlag = false,
    isFlagClicked = false,
    footerButton = {},
    onFlagPress = () => {},
    children
}) {
    return (
        <ReactModal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={{
                ...styles.backDrop,
                backgroundColor: `rgba(0, 0, 0, ${isFlagClicked ? '.8' : '.5'})`
            }} />
            <View style={styles.centeredView}>
                {children ? children : (
                    <View style={styles.modalView}>
                        <View flexDirection="row" alignItems="flex-start" style={{width: windowWidth - 160}}>
                            {success ? (
                                <SvgXml width="30" height="30" xml={icons.success}/>
                            ) : (
                                <SvgXml width="30" height="30" xml={icons.warning}/>
                            )}
                            <View style={{paddingLeft: 10, alignItems: 'flex-start'}}>
                                <Text style={styles.modalText}>
                                    {text}
                                </Text>
                                {Header}
                            </View>
                        </View>
                        {showFlag && (
                            <Pressable onPress={onFlagPress}>
                                <SvgXml width="30" height="30" xml={icons.flag}/>
                            </Pressable>
                        )}
                    </View>
                )}
                {footerButton?.visible && (
                    <View style={styles.footerButtonWrapper}>
                        <Button
                            onPress={footerButton.onClick}
                            style={styles.footerButton}>
                            {footerButton.text}
                        </Button>
                    </View>
                )}
            </View>
        </ReactModal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        position: 'relative',
        zIndex: 11,
        marginTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    footerButtonWrapper: {
        position: 'absolute',
        bottom: 80,
        zIndex: 1,
        width: windowWidth,
        alignItems: 'center',
    },
    footerButton: {
        width: 250,
        marginTop: 20,
    },
    backDrop: {
        top: 0,
        width: windowWidth,
        height: windowHeight,
        position: 'absolute',
        zIndex: 10,
    },
    modalView: {
        marginVertical: 20,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        height: windowHeight - 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 13,
        overflow: 'hidden'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 20,
        marginBottom: 10,
    }
})