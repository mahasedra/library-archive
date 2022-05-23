import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList
} from "react-native";
import { getAllLecteurs, createLecteur, updateLecteur, deleteLecteur } from '../API/LecteurAPI'

class Lecteur extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = {
      lecteurs: []
    }
    this._retrieveLecteurs=this._retrieveLecteurs.bind(this)
  }
  _retrieveLecteurs = () => {
    getAllLecteurs().then(data => {
      this.setState({
        lecteurs: [...this.state.lecteurs, ...data['hydra:member']]
      }, console.log(data['hydra:member']))
      
    })
  }

  componentDidMount(){
    this._retrieveLecteurs()
  }
  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Nom du lecteur'
        />
        <Button title='Rechercher' />
        {/* <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
export default Lecteur