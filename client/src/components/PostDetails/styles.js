import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '50%',
        maxHeight: '400px',

    },
    card: {
        display: 'flex',
            flexDirection: 'column',
    },
    section: {
        borderRadius: '20px',
        margin: '20px',
        flex: 1,
    },
    imageSection: {
        marginLeft: '20px',
    },
    loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
    },
}));