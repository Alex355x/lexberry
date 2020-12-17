import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as flightsActions from  '../clients.actions';
import { connect } from 'react-redux';
import { clientsListSelector } from '../clients.selectors';
import Zayvniki from './Zayavniki';
import { grey } from '@material-ui/core/colors';

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

const Page = ({getFlightsList, clientsList}) => {

    //console.log(clientsList)
    const [value, setValue] = React.useState(null);
    // console.log(value);

    // const [user, setUser] = useState({
    //     contactPerson: '',
    //     email: "",
    //     id: "",
    //     label: "",
    //     name: "",
    //     phone: "",
    //   });
    
      //console.log(value.id)

    useEffect(()=> {
        getFlightsList();
      }, []);

    const classes = useStyles();
    // const [age, setAge] = React.useState('');
  
    // const handleChange = (event) => {
    //   setAge(event.target.value);
    // };

    // const filterOptions = createFilterOptions({
    //     matchFrom: 'start',
    //     stringify: option => option.title,
    //   });

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setUser({
    //       ...user,
    //       [name]: value,
    //     });
    //   };
    const button = <Button variant="contained" color="primary">
    ЗБЕРЕГТИ ЗАЯВКУ</Button>

    return (
      <>
        <Paper className={classes.paper} elevation={0} variant="outlined" square>
            <div className={classes.clientTitle}>Кліент</div>
            <div className={classes.autocompleteInput}>
               
            <Autocomplete 
                id="combo-box-demo"
                value={value}
                // value={user.label}
                // onChange={handleChange}
                options={clientsList.items !== undefined ? clientsList.items : []}
                getOptionLabel={(option) => option.name}
                // value={value}
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
    //   isFetching: isFetchingSelector(state),
    };
};
const mapDispatch = {
    getFlightsList: flightsActions.getFlightsList,

}

export default connect(mapState, mapDispatch)(Page);
 

  