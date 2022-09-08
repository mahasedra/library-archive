import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Alert, Text, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Icon, Input, Button } from '.';
import MemberDataService from '../services/member.service';
import { Block, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { withNavigation } from '@react-navigation/compat';

const { width, height } = Dimensions.get('screen');

const optionsPerPage = [2, 3, 4];

const DisplayMemberDataTable = (props) => {
    const [data, setData] = useState(props.data);
    const [page, setPage] = useState(0);
    const [key, setKey] = useState(null)
    const [name, setName] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);

    useEffect(() => {
        setData(props.data);
    }, [props.data])
    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const openDeleteModal = (key) => {
        setModalDeleteVisible(true);
        setKey(key)
    }
    const deleteMember = () => {
        if (key) {
            MemberDataService.delete(key)
                .then(() => {
                    Alert.alert("Deleted");
                    setModalDeleteVisible(!modalDeleteVisible);
                })
                .catch((e) => {
                    console.log(e);
                });
            props.navigation.navigate('Home')
        }
    }
    const openEditModal = (key) => {
        setModalEditVisible(true);
        setKey(key)
    }
    const updateMember = () => {
        if (key && name) {
            const data = {
                name: name,
            };

            MemberDataService.update(key, data)
                .then(() => {
                    Alert.alert("Updated");
                    setModalEditVisible(!modalEditVisible);
                })
                .catch((e) => {
                    console.log(e);
                });
            props.navigation.navigate('Home')
        }
    }

    return (
        <DataTable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDeleteVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalDeleteVisible(!modalDeleteVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Confirm Delete</Text>
                        <Button
                            color="error"
                            style={styles.button}
                        >
                            <TouchableWithoutFeedback
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => deleteMember()}
                            >
                                <Text style={styles.colorWhite}>Confirm</Text>
                            </TouchableWithoutFeedback>
                        </Button>
                        <Text style={styles.textStyle}>
                            <TouchableWithoutFeedback
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalDeleteVisible(!modalDeleteVisible)}
                            >
                                <Text>Cancel</Text>
                            </TouchableWithoutFeedback>
                        </Text>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalEditVisible(!modalEditVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Confirm Delete</Text>
                        <Block>
                            <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                <Input
                                    placeholder="Name"
                                    value={name}
                                    onChangeText={text => setName(text)}
                                    style={styles.inputs}
                                    iconContent={
                                        <Icon
                                            size={16}
                                            color="#ADB5BD"
                                            name="profile-circle"
                                            family="NowExtra"
                                            style={styles.inputIcons}
                                        />
                                    }
                                />
                            </Block>
                        </Block>
                        <Button
                            color="info"
                            textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
                            style={styles.button}
                        >
                            <TouchableWithoutFeedback
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => updateMember()}
                            >
                                <Text style={styles.colorWhite}>Update</Text>
                            </TouchableWithoutFeedback>
                        </Button>
                        <TouchableWithoutFeedback
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalEditVisible(!modalEditVisible)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Modal>
            <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>
            {data && data.map((item, index) => (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell numeric>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setName(item.name)
                                openEditModal(item.key)
                            }}>
                            <Block flex left>
                                <Text
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        textAlign: 'center',
                                        color: nowTheme.COLORS.INFO,
                                        margin: 4
                                    }}
                                    size={24}
                                >
                                    Edit
                                </Text>
                            </Block>
                        </TouchableWithoutFeedback>
                        {/* <TouchableWithoutFeedback onPress={() => openDeleteModal(item.key)}>
                            <Block flex right>
                                <Text
                                    style={{
                                        fontFamily: 'montserrat-regular',
                                        textAlign: 'center',
                                        color: nowTheme.COLORS.INPUT_ERROR,
                                        margin: 4
                                    }}
                                    size={24}
                                >
                                    Delete
                                </Text>
                            </Block>
                        </TouchableWithoutFeedback> */}
                    </DataTable.Cell>
                </DataTable.Row>
            )
            )}

            <DataTable.Pagination
                page={page}
                numberOfPages={3}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
            />
        </DataTable>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    inputIcons: {
        marginRight: 12,
        color: nowTheme.COLORS.ICON_INPUT
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 21.5
    },
    passwordCheck: {
        paddingLeft: 2,
        paddingTop: 6,
        paddingBottom: 15
    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
        marginBottom: 40
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    colorWhite: {
        color: 'white'
    }
});
export default withNavigation(DisplayMemberDataTable);