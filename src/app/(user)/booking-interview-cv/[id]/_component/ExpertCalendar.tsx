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
import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Rating, TextField } from '@mui/material';
import CalendarStyled from 'components/application/calendar/CalendarStyled';
import { FlexBetween } from 'components/common/box/flex-box';
import { Text } from 'components/common/text/text';
import { useGetAvailability } from 'hooks/use-get-availability';
import Image from 'next/image';
import { dispatch, useSelector } from 'store';
import { addEvent, getEvents, removeEvent, updateEvent } from 'store/slices/calendar';
import { DateRange } from 'types';
import Loader from 'ui-component/Loader';
import SubCard from 'ui-component/cards/SubCard';
import ExpertToolbar from '../../_component/Toolbar';
import { enqueueSnackbar } from 'notistack';

// ==============================|| APPLICATION CALENDAR ||============================== //

const fakeEvents = [
    {
        title: 'Available Slot',
        description: 'This slot is available',
        color: '#198754',
        textColor: '#ffffff',
        start: '2024-07-02T09:00:00',
        end: '2024-07-02T10:00:00'
    },
    {
        title: 'Available Slot',
        description: 'This slot is available',
        color: '#198754',
        textColor: '#ffffff',
        start: '2024-07-04T09:00:00',
        end: '2024-07-04T10:00:00'
    },
    {
        title: 'Interview - CV Review',
        description: 'Reviewing CVs for interviews',
        color: '#ED4337',
        textColor: '#ffffff',
        start: '2024-07-03T14:00:00',
        end: '2024-07-03T15:00:00'
    },
    {
        title: 'Interview - CV Review',
        description: 'Reviewing CVs for interviews',
        color: '#ED4337',
        textColor: '#ffffff',
        start: '2024-07-05T14:00:00',
        end: '2024-07-05T15:00:00'
    },
];

const ExpertCalendarPage = ({ onNext, onBack, params }: { onNext: () => void, onBack: () => void, params: string }) => {
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
        setIsModalOpen(true);
    };

    const handleEventSelect = (arg: EventClickArg) => {
        if (arg.event.id) {
            const selectEvent = events.find((_event: FormikValues) => _event.id === arg.event.id);
            setSelectedEvent(selectEvent as FormikValues[]);
        } else {
            setSelectedEvent(null);
        }
        setIsModalOpen(true);
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

    useEffect(() => {
        setEvents(calendarState.events);
    }, [calendarState]);


    // ==============================|| My Code Start here ||============================== //

    const cvs = [
        { id: '1', title: 'CV 1', link: 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg' },
        { id: '2', title: 'CV 2', link: 'https://cdn-blog.novoresume.com/articles/how-to-write-a-resume-guide/Minimalistic-Resume-Template.png' },
        { id: '3', title: 'CV 3', link: 'https://cdn-blog.novoresume.com/articles/resume-examples/resume-example.webp' },
        { id: '4', title: 'CV 4', link: 'https://cdn-blog.novoresume.com/articles/resume-examples/resume-example.webp' },
    ];

    const skills = [
        { id: 1, title: "Kĩ năng 1", rating: 5, reviews: 175 },
        { id: 2, title: "Kĩ năng 2", rating: 4, reviews: 200 },
        { id: 3, title: "Kĩ năng 3", rating: 3, reviews: 150 },
        { id: 4, title: "Kĩ năng 4", rating: 4.5, reviews: 135 },
    ];

    const [note, setNote] = useState('');

    const [selectedCV, setSelectedCV] = useState<string | null>(null);

    const [activeButton, setActiveButton] = useState<string | null>(null);

    const [selectedSkills, setSelectedSkills] = useState([]);

    const { availabilities } = useGetAvailability({ expertId: params?.id });

    const convertEvents = (data: any) => data.map((event: any) => ({
        id: event.id.toString(),
        title: `Event ${event.id}`,
        start: `${event.date}T${event.startTime}`,
        end: `${event.date}T${event.endTime}`
    }));

    const handleSkillClick = (skill: any) => {
        setSelectedSkills((prev: any) => {
            const index = prev.findIndex((s) => s.id === skill.id);
            if (index !== -1) {
                return prev.filter((s) => s.id !== skill.id);
            } else {
                return [...prev, skill];
            }
        });
    };

    const handleCVSelect = (cvId: string) => {
        setSelectedCV(cvId === selectedCV ? null : cvId);
    };

    const handleButtonClick = (button: string) => {
        setActiveButton(prev => (prev === button ? null : button));
    };

    const handleBooking = () => {
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
        } else {
            enqueueSnackbar(message, { variant: 'warning' });
        }
    };

    useEffect(() => {
        const convertedEvents = convertEvents(availabilities);
        setEvents(convertedEvents);
    }, [params?.id, availabilities]);

    useEffect(() => {
        console.log("selectedSkills:", selectedSkills);
        console.log("selectedCV:", selectedCV);
        console.log("note:", note);
    }, [selectedSkills, selectedCV, note]);

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
                    {skills.map(skill => (
                        <Grid item xs={12} sm={4} md={4} key={skill.id} mb={2}>
                            <div onClick={() => handleSkillClick(skill)} style={{ cursor: 'pointer' }}>
                                <SubCard
                                    title={skill.title}
                                    sx={{
                                        backgroundColor: selectedSkills.some(s => s.id === skill.id) ? "#69F0AE" : "#fff",
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                        },
                                    }}
                                >
                                    <FlexBetween>
                                        <Rating value={skill.rating} size="small" readOnly />
                                        <Text fontSize={13}>
                                            <span style={{ fontWeight: "bold" }}>{skill.reviews}</span> lượt đánh giá
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
                    {cvs.map(cv => (
                        <Grid item xs={12} sm={6} md={4} key={cv.id}>
                            <div onClick={() => handleCVSelect(cv.id)} style={{ cursor: 'pointer', border: selectedCV === cv.id ? '3px solid green' : 'none', borderRadius: '8px' }}>
                                <SubCard title={cv.title} sx={{
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                    },
                                }}>
                                    <Image
                                        src={cv.link}
                                        alt={cv.title}
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
                        rows={2}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        sx={{ width: "50%" }}
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
                        events={fakeEvents}
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
                <DialogTitle>Xác nhận đặt lịch</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Bạn muốn đặt chuyên gia Anshan Handgun interview CV của bạn?
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
