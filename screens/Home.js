import React from "react";
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Block, theme } from "galio-framework";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";

import { nowTheme } from '../constants';
import { Button, Input } from "../components";

import MemberDataService from "../services/member.service";

import DisplayMemberDataTable from "../components/DisplayMemberDataTable";
import { withNavigation } from "@react-navigation/compat";
const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMember = this.setActiveMember.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setStepMember = this.setStepMember.bind(this);
    this.setStepBook = this.setStepBook.bind(this);

    this.state = {
      members: [],
      currentMember: null,
      currentIndex: -1,
      page: 0,
      search: '',
      tempMembers: [],
      stepMember: true,
      stepBook: true,
    };
  }
  componentDidMount() {
    MemberDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    MemberDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
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
    }, console.log(members));
  }

  refreshList() {
    this.setState({
      currentMember: null,
      currentIndex: -1,
    });
  }

  initData() {
    MemberDataService.getAll().on("value", this.onDataChange);
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

  renderMembers = () => {
    const { tempMembers, stepMember, stepBook } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.members}
      >
        {stepMember && (<>
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
          {tempMembers && tempMembers.length > 0 && (
            <DisplayMemberDataTable selectMember={this.initData} data={tempMembers} />
          )}
        </>)}
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
