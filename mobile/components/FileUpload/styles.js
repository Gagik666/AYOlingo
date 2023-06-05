import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../core/constants'

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  upload: {
    width: windowWidth - 40,
  },
  uploadText: {
    // color: COLORS.white,
    width: "100%",
    fontFamily: "fedra-medium",
    fontSize: 12,
    textTransform: "uppercase",
    marginTop: 12,
    textAlign: "center",
  },
  imageWrapper: {
    height: 70,
    width: 70,
    shadowColor: "#000",
    shadowOffset: {
        width: 6,
        height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 100,
    width: '100%',
    height: 50,
  },
  text: {
    color: COLORS.purple,
    fontWeight: '500',
    fontSize: 18,
  }
})

export default styles
