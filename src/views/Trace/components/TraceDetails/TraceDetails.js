import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// import IconButton from '@material-ui/core/IconButton';
// import RefreshIcon from '@material-ui/icons/Refresh';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    transactionId: null,
    beginTime: null,
    endTime:'now'    
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const submitTraceDetails = async () => {
    console.log( 'Button Submit called', selectedDate); 
    // ..code to submit form to backend here...
    const baseURL = 'http://localhost:3000';
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    fetch(
      baseURL+'/flute/api/generate_trace',
      {   method: 'POST',
          mode: 'no-cors',
          headers: new Headers(
             {"Content-Type": "application/json",
              "Accept":"application/json"}
          ),

          body: JSON.stringify(
             {
                transactionId: values.transactionId,
                beginTime: '-30days',
                endTime:values.endTime
             }
          )
       }
     ).then( response => { console.log(response);})
      .catch(err => console.log(err))

    // axios.post('http://127.0.0.1:3000/flute/api/generate_trace', {
    // await axios.post('/flute/api/generate_trace', {
    //   transactionId: values.transactionId,
    //   beginTime: '-10days',
    //   endTime:values.endTime
    // },{
    //   // headers: {
    //   //   'content-type': 'text/json'
    //   // }
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          // subheader="The information can be edited"
          title="Flute Jaeger Custom UI"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Enter the transaction ID"
                label="Transaction ID"
                margin="dense"
                name="transactionId"
                onChange={handleChange}
                required
                value={values.transactionId}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Acquire data from : "
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={submitTraceDetails}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            variant="contained"
          >
            Open Traces
          </Button>
          {/* <IconButton aria-label="delete" className={classes.margin}>
            <RefreshIcon fontSize="large" />
          </IconButton>      */}
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
