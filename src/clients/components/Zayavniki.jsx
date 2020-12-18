import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { fetchZayavnikList } from '../clientsGateway'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import { Formik, Form } from 'formik';

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
        marginLeft: '20px',
        height: '50px',
        color: 'blue',
        fontWeight:'400',
        fontSize: '16px',
        display: 'inline-flex',
        alignItems: 'flex-end',
        borderBottom: '2px dashed blue',
    },
    textField: {
        width: '30%',
        height: '50px',
        marginTop: '10px',
        marginRight: '10px',
    }
  }));


const Zayavniki = ({user}) => {
    const classes = useStyles();
    //state for checkboxes
    const [state, setState] = useState({});
    const handleChangeCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    };
    //getting zayavniklist
    const [zayavnik, setZayavnik] = React.useState(null);
    const fetchZayavnik = (id) => {
        fetchZayavnikList(id).then(zayavnikList => 
            setZayavnik(zayavnikList),
        );
      };
    useEffect(()=> {
        user ? fetchZayavnik(user.id) : null;
        }, [user]);
    let zayavnikToShow = [];
    zayavnik ? zayavnikToShow = zayavnik.items.map(el => {
        return <div key={el.id}>
           <FormControlLabel 
                control={
                    <Checkbox 
                        onChange={handleChangeCheckbox}
                        name={el.id}
                    />
                }
                label={`${el.name}, ${el.address.address}`}
            />
                <CreateIcon fontSize="small"/>
                <CloseIcon fontSize="small" />
          </div>
        }) : null
    //list of options-countries for autocomlete-countries
    const countries  = [
        {title: 'Ukraine'}, 
        {title: 'Usa'}, 
        {title: 'Poland'},
    ]
    //open form for creating new zayavnik
    const [form, setForm] = useState(false);
    const openForm = () => {
        setForm(true);
    };
    //adding new zayavnik
    const [newApplicants, setnewApplicants] = useState([]);
    const handleSubmit = ({ values }) => {
        setnewApplicants([values]);
        setForm(false);
    }
    let [showNewApplicantsToAdd, setShowNewApplicantsToAdd] = useState(true);
    const closeItem = () => {
        setShowNewApplicantsToAdd(false)
    }
    let newApplicantsToAdd = [];
    newApplicants ? newApplicantsToAdd = newApplicants.map(el => {
        return <div key={el.name}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                onChange={(e) => setChecked(e.target.checked)}
                                inputProps={{
                                    'aria-label': 'secondary checkbox'
                                }}
                            />
                        }
                        label={`${el.name}, ${el.address}`}
                    />
                        <CreateIcon fontSize="small"/>
                        <CloseIcon fontSize="small" onClick={closeItem}/>
                </div>
    }) : null;
    const formField = 
        <>
            <Formik
                initialValues={{
                    name: '',
                    address: '',
                    country: '',
                    code: '',
                    osoba: '',
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
                        className={classes.radiogroup}  aria-label="osoba" name="osoba"
                        value={values.osoba} 
                        onChange={handleChange}>
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
                        className={classes.textField}
                        id="standard-basic"
                        label="EДРПО/ ІПН"
                        name='code'
                        onChange={handleChange}
                        value={values.code}
                        variant="outlined"
                    />
                    <span className={classes.link}>Знайти в ЕДР</span> 
                    <br></br>
                    <br></br>
                    <TextField
                        className={classes.textField}
                        id="1"
                        label="Назва"
                        name='name'
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                    />
                        <TextField
                        className={classes.textField}
                        id="2"
                        label="Назва мовою походження"
                        name='name2'
                        // onChange={handleChange}
                        // value={values.name}
                        variant="outlined"
                        disabled={values.country === 'Ukraine' ? true : false}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                        className={classes.textField}
                        id="3"
                        label="Адреса"
                        name='address'
                        onChange={handleChange}
                        value={values.address}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        id="4"
                        label="Адреса мовою походження"
                        name='address'
                        // onChange={handleChange}
                        // value={values.address}
                        variant="outlined"
                        disabled={values.country === 'Ukraine' ? true : false}
                    />
                </Form>
                )}
            </Formik>   
        </>
    //task - show data in json-format
    const [showData, setShowData] = React.useState('');
    const openDataJson = () => {
        const {id} = user; 
        const idArr = Object.keys(state);
        const obj = {'clientId': id, 'applicantsIds': idArr, newApplicants}
        setShowData (
        <Paper className={classes.paper} elevation={0} variant="outlined" square> 
            {JSON.stringify(obj)}
        </Paper>)
    };
    return (
        <>
            <Paper className={classes.paper} elevation={0} variant="outlined" square>
                <div className={classes.clientTitle}>Заявники
                    {zayavnikToShow}
                    {showNewApplicantsToAdd ? newApplicantsToAdd : null}
                    {form ? formField : null}
                    <br></br>
                    <br></br>
                    <Button 
                        className={classes.button}
                        onClick={openForm}
                        variant="outlined" color="primary">
                        + Додати
                    </Button>
                    <Button 
                        className={classes.button}
                        variant="contained" color="primary"
                        onClick={openDataJson}
                    >
                        ЗБЕРЕГТИ ЗАЯВКУ
                    </Button>
                </div>  
            </Paper>
            {showData}
        </>
    );
};

export default Zayavniki;
 



