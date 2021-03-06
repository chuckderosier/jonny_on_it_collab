import React, { Component } from 'react'
import styled from 'styled-components'
import { RedButton, GreenButton, BlueButton } from '../ButtonStyle'
import Calendar from 'react-calendar'
import axios from 'axios'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Payment from './BookPayment'



axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const Wrapper = styled.div`
display: flex;
justify-content: space-evenly; 
width: 650px;
*{margin: 0};
`

const Center = styled.div`
      text-align: center;
      width: 60vw;
      `
const styles = theme => ({
    root: {
      width: '65%',
  
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  });

const TimeStyle = styled.div`
    font-size: .8em;
    text-align: center;
    width: 60vw;
    height: 60vh;
    margin: 3em auto;
    .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .top-buttons {
        display: flex;
    }
    .calendar-container {
        display: flex;
        flex-direction: column;
    }
    .slots-content {
        margin: 2em;
    }
    .time-slot {
        font-size: 1.2em;
        border: 1px solid rgba(114,114,114,1);
        border-radius: .3em;
        width: 30vw;
        height: 2.4em;
        padding: .1em;
        margin: .4em;
        display: flex;
    }
    .time-slot button {
        width: 2em;
        height: 2em;
        border-radius: 50%;
    }
    .time-slot p {
        margin: 0 auto;
        display: flex;
        align-items: center;
    }
`

class BookTime extends Component {

    state = {
        date: new Date(),
        timeslot: "",
        showCalendar: false,
        showForm: false
    }

    componentDidMount() {
        axios.get(`/api/jobs/`).then((res) => {
            // ${this.props.match.params.propertyId}
            this.setState({ jobs: res.data })
        })
    }

    // TODAY BUTTON
    handleClick = (date) => {
        date = this.value
        this.setState({ date })
        this.toggleSlots()
    }
    handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };

    // Calendar clicked
    onChange = date => {
        this.setState({ date })
        this.toggleSlots()
        this.toggleCalendar()
    }

    // Time slot selected
    handleChangeTwo = (e,timeslot) => {
        // const timeslot = document.querySelector('.timeslotall').value
        timeslot = this.value
        console.log(timeslot)
        this.setState({ timeslot: timeslot })
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    toggleCalendar = () => {
        this.setState({ showCalendar: !this.state.showCalendar })
    }

    toggleSlots = () => {
        this.setState({ showSlots: !this.state.showSlots })
    }

    render() {

        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <Wrapper>

            <div>
            <Center> 
            <TimeStyle>
                <h2>Time</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="button-container">
                        <div className="top-buttons">
                            <RedButton
                                type="datetime-local"
                                onClick={() => this.handleClick(this.value)}
                            >TODAY</RedButton>
                            <GreenButton onClick={this.toggleCalendar}>SCHEDULE</GreenButton>
                        </div>
                        {this.state.showCalendar ?
                            <Calendar
                                value={this.state.date}
                                onChange={this.onChange}
                                className="calendar" />
                            : null}
                        <div className="slots-content">
                            {/* time-slots are invisible until user clicks today button or a calendar date */}
                            {this.state.showSlots ?
                                <div className="time-slots">
                                    <div className="time-slot">
                                        <button className="timeslot1"
                                            onClick={() => this.handleChangeTwo(this.value)}
                                            value="11 AM - 1 PM">X</button><p>11 AM - 1 PM</p>
                                    </div>
                                    <div className="time-slot">
                                        <button
                                            className="timeslot2"
                                            onClick={() => this.handleChangeTwo(this.value)}
                                            value="1 PM - 3 PM">X</button><p>1 PM - 3 PM</p>
                                    </div>
                                    <div className="time-slot">
                                        <button
                                            className="timeslot3"
                                            onClick={() => this.handleChangeTwo(this.value)}
                                            value="3 PM - 5 PM">X</button><p>3 PM - 5 PM</p>
                                    </div>
                                    <div className="time-slot">
                                        <button
                                            className="timeslot4"
                                            onClick={(e) => this.handleChangeTwo(e)}
                                            value="5 PM - 7 PM">X</button><p>5 PM - 7 PM</p>
                                    </div>
                                </div>
                                : null}
                            <div className="bottom-button">
                                <BlueButton type="submit" className="next-button">Next</BlueButton>
                            </div>
                        </div>
                    </div>
                </form>
            </TimeStyle>
            </Center>
            <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Center>
        <Typography className={classes.heading}>Payment</Typography>
      </Center>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <Payment{...this.state}{...this.props}/>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
            </div>
            </Wrapper>
        )
    }
}

export default withStyles(styles)(BookTime)
