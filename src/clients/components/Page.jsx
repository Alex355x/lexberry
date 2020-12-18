import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as clientsActions from  '../clients.actions';
import { clientsListSelector } from '../clients.selectors';
import Zayvniki from './Zayavniki';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "90%",
        minHeight: "120px",
        margin: "20px auto",
        padding: "30px"
    },
    clientTitle: {
        fontSize: "22px",
        fontWeight: "700",
    },
    autocompleteInput: {
        margin: "10px 0",
    },
    clientData: {
        marginTop: "10px",
    },
}));

const Page = ({getClientsList, clientsList}) => {
    const classes = useStyles();
    const [value, setValue] = useState(null);
    useEffect(()=> {
        getClientsList();
      }, []);
    const button = <Button variant="contained" color="primary">ЗБЕРЕГТИ ЗАЯВКУ
                   </Button>

    return (
        <>
            <Paper className={classes.paper} elevation={0} variant="outlined" square>
                <div className={classes.clientTitle}>Кліент</div>
                <div className={classes.autocompleteInput}>
                <Autocomplete 
                    id="combo-box-demo"
                    value={value}
                    options={clientsList.items !== undefined ? clientsList.items : []}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Поиск/выбор клиента" variant='standard' />}
                />
                </div>
                <div className={classes.clientData}>
                    {value ? value.name : null}
                </div>
                <div className={classes.clientData}>
                    {value ? value.email : null}
                </div>
                <div className={classes.clientData}>
                    {value ? 'тел. ' + value.phone : null}
                </div>
                <div className={classes.clientData}>
                    {value ? button : null}
                </div>
            </Paper>
            <Zayvniki user={value}/>
        </>
    );
  };

const mapState = state => {
    return {
      clientsList: clientsListSelector(state),
    };
};
const mapDispatch = {
    getClientsList: clientsActions.getClientsList,

}

export default connect(mapState, mapDispatch)(Page);
 

  