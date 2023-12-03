import { StyleSheet } from 'react-native';

const MainScreenView = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    headerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40
    },
    headerText: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {

        padding: 8,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff'
    },
});

export default MainScreenView;
