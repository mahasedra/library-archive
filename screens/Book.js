import React from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Block, theme } from "galio-framework";

import { nowTheme } from '../constants';
import { Button, Input } from "../components";

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

import BookDataService from "../services/book.service";

import DisplayBookDataTable from "../components/DisplayBookDataTable";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { withNavigation } from "@react-navigation/compat";

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBook = this.setActiveBook.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setSearch = this.setSearch.bind(this);

        this.state = {
            books: [],
            currentBook: null,
            currentIndex: -1,
            page: 0,
            search: '',
            tempBooks: [],
        };
    }
    componentDidMount() {
        BookDataService.getAll().on("value", this.onDataChange);
    }

    componentWillUnmount() {
        BookDataService.getAll().off("value", this.onDataChange);
    }

    onDataChange(items) {
        let books = [];

        items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            books.push({
                key: key,
                auteur: data.auteur,
                design: data.design,
                date: data.date
            });
        });

        this.setState({
            books: books,
            tempBooks: books
        },()=> console.log(this.state.books, this.state.tempBooks));
    }

    refreshList() {
        this.setState({
            currentBook: null,
            currentIndex: -1,
        });
    }

    initData() {
        BookDataService.getAll().on("value", this.onDataChange);
    }

    setActiveBook(book, index) {
        this.setState({
            currentBook: book,
            currentIndex: index,
        });
    }

    setPage(page) {
        this.setState({
            page: page
        })
    }

    setSearch(search) {
        this.setState({
            search: search
        }, () => {
            let searchBooks = this.state.books.filter((item) => {
                return item.auteur.includes(this.state.search) || item.design.includes(this.state.search)
            })
            this.setState({
                tempBooks: searchBooks
            })
        })
    }


    renderBooks = () => {
        const { tempBooks, currentBook, currentIndex, page } = this.state;
        const { navigation } = this.props;
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.books}
            >
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        primary={false}
                        right
                        placeholder="Search"
                        iconContent={<Block />}
                        onChangeText={text => this.setSearch(text)}
                        shadowless
                    />
                </Block>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('AddBook')}>
                    <Block flex right>
                        <Button
                            textStyle={{ fontFamily: 'montserrat-regular', fontSize: 10 }}
                            center
                            color="default"
                            style={styles.optionsButton}
                        >
                            Add book
                        </Button>
                    </Block>
                </TouchableWithoutFeedback>
                {tempBooks && tempBooks.length > 0 && (
                    <DisplayBookDataTable initData={this.initData} data={tempBooks} />
                )}
            </ScrollView>
        );
    };

    render() {
        return (
            <Block flex center style={styles.home}>
                {this.renderBooks()}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        width: width
    },
    books: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: 2,
        fontFamily: 'montserrat-regular'
    },
    title: {
        fontFamily: 'montserrat-bold',
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: 44,
        color: nowTheme.COLORS.HEADER
    },
    social: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center'
    },
    group: {
        paddingTop: theme.SIZES.BASE * 2
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        elevation: 2
    },
    button: {
        marginBottom: theme.SIZES.BASE,
        width: width - theme.SIZES.BASE * 2,
    },
    optionsButton: {
        width: 'auto',
        height: 34,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    category: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE / 2,
        borderWidth: 0
    },
    categoryTitle: {
        height: '100%',
        paddingHorizontal: theme.SIZES.BASE,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBlock: {
        overflow: 'hidden',
        borderRadius: 4,
        marginHorizontal: 10
    },
    albumThumb: {
        borderRadius: 4,
        marginVertical: 4,
        alignSelf: 'center',
        width: thumbMeasure,
        height: thumbMeasure
    },
    optionsButton: {
        width: 'auto',
        height: 34,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    productTitle: {
        color: nowTheme.COLORS.PRIMARY,
        textAlign: 'center',
        fontFamily: 'montserrat-bold',
        fontSize: 18
    }
});


export default withNavigation(Book);
