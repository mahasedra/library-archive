import React from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../../components';
import { Images, nowTheme } from '../../constants';
import { withNavigation } from '@react-navigation/compat';
import BookDataService from '../../services/book.service';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeAuteur = this.onChangeAuteur.bind(this);
        this.onChangeDesign = this.onChangeDesign.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.newBook = this.newBook.bind(this);

        this.state = {
            auteur: "",
            design: "",
            date: "",
            published: false,

            submitted: false,
        };
    }

    onChangeAuteur(text) {
        this.setState({
            auteur: text,
        });
    }

    onChangeDesign(text) {
        this.setState({
            design: text,
        });
    }

    onChangeDate(text) {
        this.setState({
            date: text,
        });
    }

    saveBook() {
        let data = {
            auteur: this.state.auteur,
            design: this.state.design,
            date: this.state.date,
        };

        BookDataService.create(data)
            .then(() => {
                console.log("Created new item successfully!");
                this.setState({
                    submitted: true,
                });
                this.props.navigation.navigate('Articles')
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newBook() {
        this.setState({
            auteur: "",
            design: "",
            published: false,

            submitted: false,
        });
    }
    render() {
        return (
            <DismissKeyboard>
                <Block flex middle>
                    <ImageBackground
                        source={Images.RegisterBackground}
                        style={styles.imageBackgroundContainer}
                        imageStyle={styles.imageBackground}
                    >
                        <Block flex middle>
                            <Block style={styles.registerContainer}>
                                <Block flex space="evenly">
                                    <Block flex={0.4} middle style={styles.socialConnect}>
                                        <Block flex={0.5} middle>
                                            <Text
                                                style={{
                                                    fontFamily: 'montserrat-regular',
                                                    textAlign: 'center'
                                                }}
                                                color="#333"
                                                size={24}
                                            >
                                                Add Book
                                            </Text>
                                        </Block>

                                        <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                                            <GaButton
                                                round
                                                onlyIcon
                                                shadowless
                                                icon="twitter"
                                                iconFamily="Font-Awesome"
                                                iconColor={theme.COLORS.WHITE}
                                                iconSize={theme.SIZES.BASE * 1.625}
                                                color={nowTheme.COLORS.TWITTER}
                                                style={[styles.social, styles.shadow]}
                                            />

                                            <GaButton
                                                round
                                                onlyIcon
                                                shadowless
                                                icon="dribbble"
                                                iconFamily="Font-Awesome"
                                                iconColor={theme.COLORS.WHITE}
                                                iconSize={theme.SIZES.BASE * 1.625}
                                                color={nowTheme.COLORS.DRIBBBLE}
                                                style={[styles.social, styles.shadow]}
                                            />
                                            <GaButton
                                                round
                                                onlyIcon
                                                shadowless
                                                icon="facebook"
                                                iconFamily="Font-Awesome"
                                                iconColor={theme.COLORS.WHITE}
                                                iconSize={theme.SIZES.BASE * 1.625}
                                                color={nowTheme.COLORS.FACEBOOK}
                                                style={[styles.social, styles.shadow]}
                                            />
                                        </Block>
                                    </Block>
                                    <Block flex={0.1} middle>
                                        <Text
                                            style={{
                                                fontFamily: 'montserrat-regular',
                                                textAlign: 'center'
                                            }}
                                            muted
                                            size={16}
                                        >
                                            or be classical
                                        </Text>
                                    </Block>
                                    <Block flex={1} middle space="between">
                                        <Block center flex={0.9}>
                                            <Block flex space="between">
                                                <Block>
                                                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                                        <Input
                                                            placeholder="Auteur"
                                                            value={this.state.auteur}
                                                            onChangeText={text => this.onChangeAuteur(text)}
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
                                                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                                        <Input
                                                            placeholder="Design"
                                                            style={styles.inputs}
                                                            value={this.state.design}
                                                            onChangeText={text => this.onChangeDesign(text)}
                                                            iconContent={
                                                                <Icon
                                                                    size={16}
                                                                    color="#ADB5BD"
                                                                    name="caps-small2x"
                                                                    family="NowExtra"
                                                                    style={styles.inputIcons}
                                                                />
                                                            }
                                                        />
                                                    </Block>
                                                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                                                        <Input
                                                            placeholder="Edition date"
                                                            style={styles.inputs}
                                                            value={this.state.date}
                                                            onChangeText={text => this.onChangeDate(text)}
                                                            iconContent={
                                                                <Icon
                                                                    size={16}
                                                                    color="#ADB5BD"
                                                                    name="email-852x"
                                                                    family="NowExtra"
                                                                    style={styles.inputIcons}
                                                                />
                                                            }
                                                        />
                                                    </Block>

                                                </Block>
                                                <Block center>
                                                    <Button color="primary" round style={styles.createButton}>
                                                        <TouchableOpacity onPress={() => this.saveBook()}>
                                                            <Text
                                                                style={{ fontFamily: 'montserrat-bold' }}
                                                                size={14}
                                                                color={nowTheme.COLORS.WHITE}
                                                            >
                                                                Submit
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </Button>
                                                </Block>
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </Block>
                    </ImageBackground>
                </Block>
            </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    imageBackgroundContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
    },
    imageBackground: {
        width: width,
    },
    registerContainer: {
        marginTop: 55,
        width: width * 0.9,
        height: height < 812 ? height * 0.8 : height * 0.8,
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 4,
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: 'hidden'
    },
    socialConnect: {
        backgroundColor: nowTheme.COLORS.WHITE
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: "rgba(136, 152, 170, 0.3)"
    },
    socialButtons: {
        width: 120,
        height: 40,
        backgroundColor: '#fff',
        shadowColor: nowTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1
    },
    socialTextButtons: {
        color: nowTheme.COLORS.PRIMARY,
        fontWeight: '800',
        fontSize: 14
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
        marginTop: 10,
        marginBottom: 40
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
        marginHorizontal: 10
    }
});

export default withNavigation(AddBook);