import {StyleSheet} from 'react-native'

export const baseStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: '100%',
      height: '100%'
    },
    centeredView: {
      flex: 1,
      minWidth: '80%',
      flexDirection: 'column',
      justifyContent: "space-between",
      alignItems: "stretch",
      marginTop: 10
    },
    modalView: {
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
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });