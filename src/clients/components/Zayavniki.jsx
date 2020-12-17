import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as flightsActions from  '../clients.actions';
import { connect } from 'react-redux';
import { clientsListSelector } from '../clients.selectors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { fetchZayavnikList } from '../clientsGateway'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import { Formik, Form } from 'formik';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "90%",
        minHeight: "120px",
        margin: "20px auto",
        padding: "30px",
       
    },
    clientTitle: {
        display: 'flex',
        flexDirection: "column",
        fontSize: "22px",
        fontWeight: "700",
    },
    button: {
        width: '250px',
        marginTop: '10px',
    },
    button2: {
        width: '90px',
        margin: '10px 0',
    },
    radiogroup: {
        display: 'flex',
        flexDirection: 'row'
    },
    link: {
        margin: '10px',
        height: '30px',
        color: 'blue',
        fontWeight:'400',
        fontSize: '16px',
        underLine: '1px',
        
    }
  }));

 
const Zayavniki = ({user}) => {
    const classes = useStyles();
    
    
    const [zayavnik, setZayavnik] = React.useState('');
    console.log(zayavnik.items)


    const fetchZayavnik = (id) => {
        fetchZayavnikList(id).then(zayavnikList => 
            setZayavnik(zayavnikList),
        );
      };


    useEffect(()=> {
        user ? fetchZayavnik(user.id) : null;
        }, [user]);

       
        let zayavnikMapped = [];
        
        zayavnik ? zayavnikMapped = zayavnik.items.map(el => {
       
          return <div key={el.id}>
           <FormControlLabel 
                control={
                    <Checkbox 
                        //checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        inputProps={{
                            'aria-label': 'secondary checkbox'
                        }}
                    />
                }
                label={`${el.name}, ${el.address.address}`}
            />
                <CreateIcon fontSize="small"/>
                <CloseIcon fontSize="small"/>
          </div>
        }) : null


        // const [value, setValue] = React.useState('fizosoba');
        // const handleChange = (event) => {
        //   setValue(event.target.value);
        // };

        const countries  = [
            {title: 'Ukraine'}, 
            {title: 'Usa'}, 
            {title: 'Poland'},
        ]

        const handleSubmit = ({ values }) => {
            console.log(values)
        }

        const formField = 
        <>
        <Formik
            initialValues={{
              name: '',
              phone: '',
              osoba: '',
              country: '',
              edrpo: '',

            }}
    
            onSubmit={(values) => handleSubmit({ values })}
         
        >
            {({
              values, errors, touched, handleChange,
              handleBlur, setFieldValue,
            }) => (
        
            <Form className={classes.input} autoComplete="off">

                <Button size="medium" className={classes.button2} style={{color: 'blue'}} type='submit'>
                    + Додати
                </Button>

                <br></br>
                <span>Додати нового</span>
                
                <RadioGroup 
                    className={classes.radiogroup}      aria-label="osoba" name="osoba" value={values.osoba} onChange={handleChange}>
                    <FormControlLabel value="fizosoba" control={<Radio color="primary"/>} label="Фізична особа" />
                    <FormControlLabel value="urosoba" control={<Radio color="primary"/>} label="Юридична особа" />  
                </RadioGroup>

                <Autocomplete
                    id="combo-box-demo"
                    name='country'
                    onChange={(event, newValue) => {
                      setFieldValue('country', newValue.title);
                    }}
                    options={countries}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params}
                    value={values.country} label="Вибрати країну" variant='standard' />}
                />
                <br></br>
                <TextField
                  id="standard-basic"
                  label="EДРПО"
                  name='name'
                  onChange={handleChange}
                  value={values.edrpo}
                  variant="outlined"
                />
                <span className={classes.link}><a href="#">Знайти в ЕДР</a></span> 
                

                <br></br>
                <br></br>
                <TextField
                  id="standard-basic"
                  label="Name"
                  name='name'
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />

                <TextField
                  id="standard-password-input"
                  label="phone"
                //   type="phone"
                  name='phone'
                  onChange={handleChange}
                  value={values.phone}
                />
               
            </Form>
            )}
          </Formik>
           
        </>
       
        const [form, setForm] = React.useState(false);

        const openForm = () => {
            setForm(true);
        };
  
    return (
      <>
        <Paper className={classes.paper} elevation={0} variant="outlined" square>
            <div className={classes.clientTitle}>Заявники

            {zayavnikMapped}
            {form ? formField : null}
 
            <Button 
            className={classes.button}
            onClick={openForm}
            variant="outlined" color="primary">
                + Додати
            </Button>

            <Button 
            className={classes.button}
            variant="contained" color="primary">
                ЗБЕРЕГТИ ЗАЯВКУ
            </Button>


            </div>  
        </Paper>
             
        </>

    );
  };


  

// const mapState = state => {
//     return {
//       clientsList: clientsListSelector(state),
//     };
// };
// const mapDispatch = {
//     getFlightsList: flightsActions.getFlightsList,

// }

//export default connect(mapState, mapDispatch)(Zayavniki);
export default Zayavniki;
 



