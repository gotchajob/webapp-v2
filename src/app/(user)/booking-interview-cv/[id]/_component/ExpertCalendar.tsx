'use client';

import { useEffect, useRef, useState } from 'react';

// material-ui
import Dialog from '@mui/material/Dialog';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { FormikValues } from 'formik';

// project imports
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Rating, TextField, Typography } from '@mui/material';
import CalendarStyled from 'components/application/calendar/CalendarStyled';
import { FlexBetween } from 'components/common/box/flex-box';
import { Text } from 'components/common/text/text';
import { useGetAvailability, useGetValidDateToBooking } from 'hooks/use-get-availability';
import { useGetExpertProfile } from 'hooks/use-get-expert-profile';
import { useGetExpertSkillOptions } from 'hooks/use-get-expert-skill-option';
import { useRefresh } from 'hooks/use-refresh';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { ExpertSkillOption } from 'package/api/expert-skill-option';
import { formatDate } from 'package/util';
import { dispatch, useSelector } from 'store';
import { addEvent, getEvents, removeEvent, updateEvent } from 'store/slices/calendar';
import { DateRange } from 'types';
import Loader from 'ui-component/Loader';
import SubCard from 'ui-component/cards/SubCard';
import ExpertToolbar from '../../_component/Toolbar';
import { CustomerToken } from 'hooks/use-login';
import { useGetCVCurrent } from 'hooks/use-get-cv';
import { PostBooking } from 'package/api/booking';

// ==============================|| APPLICATION CALENDAR ||============================== //

const convertEvents = (data: any) => {
    return data.map((event: any) => ({
        id: event.id.toString(),
        title: `Đã đặt lịch ${event.id}`,
        color: "#00E676",
        start: event.startTime,
        end: event.endTime
    }));
};

const reverseConvertEvents = (event: any) => {
    return {
        id: event.id.toString(),
        date: event.start.slice(0, 10),
        start: event.start.slice(11, 19),
        end: event.end.slice(11, 19),
    };
};

const ExpertCalendarPage = ({ onNext, onBack, params, booking }: { onNext: () => void, onBack: () => void, params: { id: string }, booking: (info: any) => void }) => {

    const calendarRef = useRef<FullCalendar>(null);

    const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const [loading, setLoading] = useState<boolean>(true);

    // fetch events data
    const [events, setEvents] = useState<FormikValues[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<FormikValues | null>(null);

    const calendarState = useSelector((state) => state.calendar);

    const [date, setDate] = useState(new Date());

    const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

    // calendar toolbar events
    const handleDateToday = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleViewChange = (newView: string) => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    // set calendar view
    useEffect(() => {
        handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
    }, [matchSm]);

    const handleDatePrev = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleDateNext = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    // calendar event select/add/edit/delete
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };

    const handleRangeSelect = (arg: DateSelectArg) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }
        setSelectedRange({
            start: arg.start,
            end: arg.end
        });
    };

    const handleEventUpdate = async ({ event }: EventResizeDoneArg | EventDropArg) => {
        try {
            dispatch(
                updateEvent({
                    eventId: event.id,
                    update: {
                        allDay: event.allDay,
                        start: event.start,
                        end: event.end
                    }
                })
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleEventCreate = async (data: FormikValues) => {
        dispatch(addEvent(data));
        handleModalClose();
    };

    const handleUpdateEvent = async (eventId: string, update: FormikValues) => {
        dispatch(updateEvent({ eventId, update }));
        handleModalClose();
    };

    const handleEventDelete = async (id: string) => {
        try {
            dispatch(removeEvent(id));
            handleModalClose();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        dispatch(getEvents()).then(() => setLoading(false));
    }, []);

    // useEffect(() => {
    //     setEvents(calendarState.events);
    // }, [calendarState]);

    // ==============================|| My Code Start here ||============================== //

    const { refresh, refreshTime } = useRefresh();

    const { customerToken } = CustomerToken();

    const { loading: cvCurrentLoading, cvs } = useGetCVCurrent(customerToken, refreshTime);

    const { expert, loading: expertLoading } = useGetExpertProfile({ id: +params?.id }, refreshTime);

    const { expertSkillOptions } = useGetExpertSkillOptions({ expertId: +params?.id })

    const [note, setNote] = useState('');

    const [selectedCV, setSelectedCV] = useState<number | null>(null);

    const [activeButton, setActiveButton] = useState<string | null>(null);

    const [selectedSkills, setSelectedSkills] = useState<any>([]);

    // const { availabilities } = useGetAvailability({ expertId: +params?.id });

    const { availabilities: validDateToBooking } = useGetValidDateToBooking({ expertId: +params?.id });

    // const [selectAvailabilitie, setSelectAvailabilitie] = useState<any>();

    const handleEventSelect = (arg: EventClickArg) => {
        if (arg.event.id) {
            const selectEvent = events.find((_event: FormikValues) => _event.id === arg.event.id);
            setSelectedEvent(selectEvent as FormikValues[]);
            // setSelectAvailabilitie(arg.event._def.publicId);
            setIsModalOpen(true);
        } else {
            setSelectedEvent(null);
        }
    };

    const handleSkillClick = (skill: any) => {
        setSelectedSkills((prev: number[]) => {
            const index = prev.indexOf(skill.id);
            if (index !== -1) {
                return prev.filter(id => id !== skill.id);
            } else {
                return [...prev, skill.id];
            }
        });
    };

    const handleCVSelect = (cvId: number) => {
        setSelectedCV(cvId === selectedCV ? null : cvId);
    };

    const handleButtonClick = (button: string) => {
        setActiveButton(prev => (prev === button ? null : button));
    };

    const handleBooking = async () => {
        let message = '';
        let valid = true;

        if (Object.keys(selectedSkills).length === 0 && selectedCV === null) {
            message = 'Bạn cần phải chọn kỹ năng phỏng vấn và CV phỏng vấn.';
            valid = false;
            setActiveButton("skills");
        } else if (Object.keys(selectedSkills).length === 0) {
            message = 'Bạn cần phải chọn kỹ năng phỏng vấn.';
            valid = false;
            setActiveButton("skills");
        } else if (selectedCV === null) {
            message = 'Bạn cần phải chọn CV để phỏng vấn.';
            valid = false;
            setActiveButton("cvs");
        }

        if (valid) {

            if (onNext) {
                onNext();
            }
            if (booking) {
                const bookingInfo = {
                    availabilityId: selectedEvent?.id,
                    bookingSkill: selectedSkills,
                    customerCvId: selectedCV,
                    expertId: +params.id,
                    note: note
                }
                booking(bookingInfo);
            }
        } else {
            enqueueSnackbar(message, { variant: 'warning' });
        }
    };

    // useEffect(() => {
    //     const convertedEvents = convertEvents(availabilities);
    //     setEvents(convertedEvents);
    // }, [params.id, availabilities, params]);

    useEffect(() => {
        const convertedEvents = convertEvents(validDateToBooking);
        setEvents(convertedEvents);
        console.log("validDateToBooking:", validDateToBooking);
    }, [validDateToBooking, params]);

    if (loading) return <Loader />;

    return (
        <Box px={2} py={1}>
            <Grid container pb={2} spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        onClick={() => handleButtonClick('skills')}
                        sx={{ flex: 1, marginRight: 1 }}
                    >
                        {activeButton === 'skills' ? "Ẩn chọn kĩ năng phỏng vấn" : "Chọn kĩ năng phỏng vấn"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => handleButtonClick('cvs')}
                        sx={{ flex: 1, marginRight: 1 }}
                    >
                        {activeButton === 'cvs' ? "Ẩn chọn CV phỏng vấn" : "Chọn CV phỏng vấn"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => handleButtonClick('comment')}
                        sx={{ flex: 1 }}
                    >
                        {activeButton === 'comment' ? "Ẩn chú thích phỏng vấn" : "Thêm chú thích phỏng vấn"}
                    </Button>
                </Grid>
            </Grid>

            {activeButton === 'skills' && (
                <Grid container spacing={2}>
                    {expertSkillOptions?.map(skill => (
                        <Grid item xs={12} sm={4} md={4} key={skill.id}>
                            <div onClick={() => handleSkillClick(skill)} style={{ cursor: 'pointer' }}>
                                <SubCard
                                    sx={{
                                        backgroundColor: selectedSkills.includes(skill.id) ? "#2196F3" : "#fff",
                                        color: selectedSkills.includes(skill.id) ? "#fff" : "#000",
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: selectedSkills.includes(skill.id) ? "#fff" : "#000",
                                            pl: 1,
                                            pb: 2,
                                        }}
                                    >
                                        {skill.skillOptionName}
                                    </Typography>
                                    <FlexBetween>
                                        <Rating value={skill.sumPoint} size="small" readOnly />
                                        <Text fontSize={13}>
                                            <span style={{ fontWeight: "bold" }}>{skill.totalRating}</span> lượt đánh giá
                                        </Text>
                                    </FlexBetween>
                                </SubCard>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}

            {activeButton === 'cvs' && (
                <Grid container spacing={2} mb={2}>
                    {cvs?.map(cv => (
                        <Grid item xs={12} sm={6} md={4} key={cv.id}>
                            <div onClick={() => handleCVSelect(cv.id)} style={{ cursor: 'pointer', border: selectedCV === cv.id ? '3px solid #2196F3' : 'none', borderRadius: '12px' }}>
                                <SubCard title={cv.name} sx={{
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                    },
                                }}>
                                    <Image
                                        // src={cv.image}
                                        src={"https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg"}
                                        alt={cv.name}
                                        width={400}
                                        height={600}
                                    />
                                </SubCard>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}

            {activeButton === 'comment' && (
                <Grid item xs={12} mb={2}>
                    <TextField
                        label="Chú thích phỏng vấn"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        sx={{ width: "35%" }}
                    />
                </Grid>
            )}

            <CalendarStyled>
                <ExpertToolbar
                    date={date}
                    view={view}
                    onClickNext={handleDateNext}
                    onClickPrev={handleDatePrev}
                    onClickToday={handleDateToday}
                    onChangeView={handleViewChange}
                />
                <SubCard>
                    <FullCalendar
                        weekends
                        editable
                        droppable
                        selectable
                        events={events}
                        ref={calendarRef}
                        rerenderDelay={10}
                        initialDate={date}
                        initialView={view}
                        dayMaxEventRows={3}
                        eventDisplay="block"
                        headerToolbar={false}
                        allDayMaintainDuration
                        eventResizableFromStart
                        select={handleRangeSelect}
                        eventDrop={handleEventUpdate}
                        eventClick={handleEventSelect}
                        eventResize={handleEventUpdate}
                        height={matchSm ? 'auto' : 720}
                        plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
                    />
                </SubCard>
            </CalendarStyled>

            <Grid item xs={12} mt={3} >
                <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Button onClick={() => { if (onBack) onBack(); }} color="primary" variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                            Quay lại
                        </Button>
                    </Grid>
                    {/* <Grid item>
                        <Button variant="contained" endIcon={<KeyboardTabIcon />}>Tiếp tục</Button>
                    </Grid> */}
                </Grid>
            </Grid>

            {/* Dialog xác nhận book lịch */}
            <Dialog
                open={isModalOpen}
                onClose={handleModalClose}
            >
                <DialogTitle>Xác nhận đặt lịch vào thời điểm {formatDate(selectedEvent?.start, "dd/MM/yyyy - hh:mm")} - {formatDate(selectedEvent?.end, "dd/MM/yyyy - hh:mm")}</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Bạn muốn đặt chuyên gia {expert?.firstName} {expert?.lastName} interview CV của bạn?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="error">
                        Đóng
                    </Button>
                    <Button color="success" onClick={handleBooking}>
                        Đặt lịch
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ExpertCalendarPage;

{/* Dialog thêm sự kiện */ }
{/* <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                {isModalOpen && (
                    <AddEventOnExpertCalendar
                        event={selectedEvent}
                        range={selectedRange}
                        onCancel={handleModalClose}
                        handleDelete={handleEventDelete}
                        handleCreate={handleEventCreate}
                        handleUpdate={handleUpdateEvent}
                    />
                )}
            </Dialog> */}
