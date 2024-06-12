import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'column',
    minHeight: '100vh',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  sidebar: {
    position: 'absolute',
    top: 140,
    left: 0,
    width: 225,
    height: '100%',
    backgroundColor: '#629ad3',
    transition: 'all 0.3s ease',
    zIndex: 1,
  },
  sidebarActive: {
    width: 80,
  },
  content: {
    flex: 1,
    marginLeft: 30,
    transition: 'all 0.3s ease',
    flexDirection: 'column',
  },
  contentActive: {
    marginLeft: 80,
  },
  topNavbar: {
    backgroundColor: '#91C8E4',
    height: 60,
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    top: 80,
    zIndex: 1,
  },
  hamburger: {
    width: 80,
    backgroundColor: '#629ad3',
    position: 'relative',
    fontSize: 28,
  },
  hamburgerInner: {
    position: 'absolute',
    top: '35%',
    left: '55%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    cursor: 'pointer',
    width: 40,
    height: 20,
    color: '#0f3249',
  },
  menu: {
    width: 'calc(100% - 80px)',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 20,
  },
  logo: {
    color: '#0f3249',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  container: {
    marginTop: 50,
    padding: 30,
  },
  footer: {
    backgroundColor: '#91C8E4',
    padding: 20,
    color: 'white',
    textAlign: 'center',
  },
});
