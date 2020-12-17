// *https://www.registers.service.gov.uk/registers/country/use-the-api*
//https://lexberry.com.ua/api/v1/clients

import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

// const filterOptions = createFilterOptions({
//     matchFrom: 'start',
//     stringify: (option) => option.title,
//   });

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

export default function ClientAutocomplete() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
        //   const response = await fetch('https://lexberry.com.ua/api/v1/clients');
        //  const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
        const response = await fetch('https://lexberry.com.ua/api/v1/clients', {
            method: 'GET',
            headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MDc0NjEyMDMsImV4cCI6MTYxMDA1MzIwMywicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImJ5Lmhhc2tlbGwifQ.F_0yZmAbIbPuonnXiKdxI9ne77y3CCFmoe-Wygp3wIgXShDoO64cnnTBsVQG6u6VUvZt1LrueXhUnbOmVKnbUTckKKkNcQWl6iHVO-9RgP2133SOzWcSmVDpf0BC_K0lczF0DaAmp1gHii-Ct50nORpSONSbWNnjkfhBIPbyLVDR2sKuGKyMGG-6Qy0JRDTFnt5AVO_z5HEpCYSrQdhwd_wl7gcD9-vH7_aQib9dq6htbDdqdFw1NXk84B_YTfa2szSFyMDuQkaTgXZwoOOouxEHy9JlJgkKgxK5W-f84cNFkFrYxUhxaNROgPFY8Cs9pB54NcVaSceQc2vF2lgtFb3VyC-ra3xTNtrNmzGPpikftkeU8lnojP8ifEsdeYWjgJGUa7HsR-VMq2fN9otGd0PqpXLpXPasBXEvub7tRyqLziGUG_h4SdgIOu0aGe3sItigzF3fnaCc-Vv8B1wM_qt05ahCgdMuMD7X2dW0eAFuO8zKZszz7owiD5S92QiJkI2sGUG5YzPTOPjch-Qoax--aM1QE8XFDvkDYCruARDTBxcqNp6QAdEANr_toscUpcwTM5-hNfSTGaWvF0dkJaek2PCCszOWAyz6TiLy9lGXVkFEGn-qeR9V0ecdHNx9F_6YNqgWAIOlMNCsYiNp77J6ggmLjJZfTYDh6BAwFNI',
        },
  })


     await sleep(1e3); // For demo purposes.
      const clientsList = await response.json();
     console.log(clientsList)

      if (active) {
        // console.log('111')
        setOptions(clientsList.items).map((item) => {
        //  console.log(item)
         return   item});
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  
//console.log(options)
  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: "23%" }}
      
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
     
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск/выбор клиента - Asynchronous"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    
);
}

{/* <Button variant="contained" color="primary">
            ЗБЕРЕГТИ ЗАЯВКУ
</Button> */}
