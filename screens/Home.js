import React from "react";
import { StyleSheet, Dimensions, ScrollView, View, Text, Alert } from "react-native";
import { Block, theme } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";

import { nowTheme } from '../constants';
import { Button, Input } from "../components";
import moment from "moment";

import MemberDataService from "../services/member.service";
import BookDataService from "../services/book.service";
import LoanDataService from "../services/loan.service";

import { withNavigation } from "@react-navigation/compat";
const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setActiveMember = this.setActiveMember.bind(this);
    this.onDataChangeLoan = this.onDataChangeLoan.bind(this);
    this.onDataChangeMember = this.onDataChangeMember.bind(this);
    this.onDataChangeBook = this.onDataChangeBook.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setStepMember = this.setStepMember.bind(this);
    this.setStepBook = this.setStepBook.bind(this);
    this.setSelectedMember = this.setSelectedMember.bind(this);
    this.setSelectedBook = this.setSelectedBook.bind(this);
    this.createLoan = this.createLoan.bind(this);

    this.state = {
      loans: [],
      members: [],
      books: [],
      selectedMember: null,
      selectedBook: null,
      page: 0,
      search: '',
      tempLoans: [],
      tempMembers: [],
      tempBooks: [],
      stepLoan: true,
      stepBook: false,
      stepMember: false,
      stepFinal: false,
    };
  }
  componentDidMount() {
    LoanDataService.getAll().on("value", this.onDataChangeLoan);
    MemberDataService.getAll().on("value", this.onDataChangeMember);
    BookDataService.getAll().on("value", this.onDataChangeBook);
  }

  componentWillUnmount() {
    LoanDataService.getAll().on("value", this.onDataChangeLoan);
    MemberDataService.getAll().off("value", this.onDataChangeMember);
    BookDataService.getAll().on("value", this.onDataChangeBook);
  }

  onDataChangeLoan(items) {
    let loans = [];
    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      loans.push({
        key: key,
        design: data.design,
        name: data.name,
        loanDate: data.loanDate,
      });
    });
    this.setState({
      loans: loans,
      tempLoans: loans
    });
  }

  onDataChangeMember(items) {
    let members = [];
    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      members.push({
        key: key,
        name: data.name,
      });
    });
    this.setState({
      members: members,
      tempMembers: members
    });
  }
  onDataChangeBook(items) {
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
    });
  }

  setActiveMember(Member, index) {
    this.setState({
      currentMember: Member,
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
      let searchMembers = this.state.members.filter((item) => {
        return item.name.includes(this.state.search)
      })
      this.setState({
        tempMembers: searchMembers
      })
      let searchBooks = this.state.books.filter((item) => {
        return item.auteur.includes(this.state.search) || item.design.includes(this.state.search)
      })
      this.setState({
        tempBooks: searchBooks
      })
      let searchLoans = this.state.loans.filter((item) => {
        return item.name.includes(this.state.search) || item.design.includes(this.state.search)
      })
      this.setState({
        tempLoans: searchLoans
      })
    })
  }

  setStepBook() {
    this.setState({
      stepBook: !this.state.stepBook
    })
  }

  setStepMember() {
    this.setState({
      stepMember: !this.state.stepMember
    })
  }

  setSelectedBook(book) {
    this.setState({
      selectedBook: book
    })
    this.setStepMember()
    this.setStepBook()
  }
  setSelectedMember(member) {
    this.setState({
      selectedMember: member,
      stepFinal: true,
    })
    this.setStepMember();
  }

  createLoan() {
    const data = {
      bookKey: this.state.selectedBook.key,
      auteur: this.state.selectedBook.auteur,
      design: this.state.selectedBook.design,
      memberkey: this.state.selectedMember.key,
      name: this.state.selectedMember.name,
      loanDate: moment().format()
    }
    LoanDataService.create(data)
      .then(() => {
        Alert.alert("Saved successfully")
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
        this.props.navigation.navigate('Home')
        this.setState({
          selectedBook: null,
          selectedMember: null,
          stepLoan: true,
          stepBook: false,
          stepMember: false,
          stepFinal: false,
        })
      })
      .catch((e) => {
        console.log(e);
      });
  }

  renderMembers = () => {
    const { tempMembers, tempBooks, tempLoans, stepLoan, stepMember, stepBook, stepFinal } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.members}
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
        {stepLoan && (<>
          <TouchableWithoutFeedback onPress={() => {
            this.setState({
              stepLoan: false,
              stepBook: true,
            })
          }}>
            <Block flex right>
              <Button
                textStyle={{ fontFamily: 'montserrat-regular', fontSize: 10 }}
                center
                color="default"
                style={styles.optionsButton}
              >
                Add loan
              </Button>
            </Block>
          </TouchableWithoutFeedback>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Design</DataTable.Title>
              <DataTable.Title>Member</DataTable.Title>
              <DataTable.Title numeric>Loan Date</DataTable.Title>
            </DataTable.Header>
            {tempLoans && tempLoans.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.design}</DataTable.Cell>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.loanDate}</DataTable.Cell>
              </DataTable.Row>
            )
            )}
            <DataTable.Pagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </>)}
        {stepBook && (<>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Auteur</DataTable.Title>
              <DataTable.Title>Design</DataTable.Title>
              <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>
            {tempBooks && tempBooks.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.auteur}</DataTable.Cell>
                <DataTable.Cell>{item.design}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <TouchableWithoutFeedback
                    onPress={() => { this.setSelectedBook(item) }}>
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
                        Next
                      </Text>
                    </Block>
                  </TouchableWithoutFeedback>
                </DataTable.Cell>
              </DataTable.Row>
            )
            )}
            <DataTable.Pagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </>)}
        {stepMember && (<>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>
            {tempMembers && tempMembers.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <TouchableWithoutFeedback
                    onPress={() => { this.setSelectedMember(item) }}>
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
                        Next
                      </Text>
                    </Block>
                  </TouchableWithoutFeedback>
                </DataTable.Cell>
              </DataTable.Row>
            )
            )}
            <DataTable.Pagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>

        </>)}
        {stepFinal && (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Confirm Loan</Text>
              <Button
                color="info"
                style={styles.button}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.createLoan()}
                >
                  <Text style={styles.colorWhite}>Confirm</Text>
                </TouchableWithoutFeedback>
              </Button>
              <Text style={styles.textStyle}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({
                      selectedBook: null,
                      selectedMember: null,
                      stepLoan: true,
                      stepBook: false,
                      stepMember: false,
                      stepFinal: false,
                    })
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        )
        }
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderMembers()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  members: {
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
  },
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


export default withNavigation(Home);
