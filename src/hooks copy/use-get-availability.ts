import { Availability, GetAvailability, GetAvailabilityRequest } from 'package/api/availability';
import { useEffect, useState } from 'react';
import { AvailabilityById, GetAvailabilityById, GetAvailabilityByIdRequest } from 'package/api/availability/id';
import { GetValidDateToBooking, GetValidDateToBookingRequest, ValidAvailability } from 'package/api/availability/expert/expertId/valid-date-to-booking';

export const useGetAvailability = (params: GetAvailabilityRequest) => {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);

    const fetchAvailability = async () => {
        try {
            const data = await GetAvailability(params);
            setAvailabilities(data.data);
        } catch (error) { }
    };

    useEffect(() => {
        fetchAvailability();
    }, [params.expertId]);

    return {
        availabilities
    };
};

export const useGetAvailabilityById = (params: GetAvailabilityByIdRequest) => {
    const [availability, setAvailability] = useState<AvailabilityById>();

    const fetchAvailability = async () => {
        try {
            const data = await GetAvailabilityById(params);
            setAvailability(data.data);
        } catch (error) { }
    };

    useEffect(() => {
        fetchAvailability();
    }, [params.id]);

    return {
        availability
    };
};

export const useGetValidDateToBooking = (params: GetValidDateToBookingRequest) => {
    const [availabilities, setAvailabilities] = useState<ValidAvailability[]>([]);

    const fetchGetValidDateToBooking = async () => {
        try {
            const data = await GetValidDateToBooking(params);
            setAvailabilities(data.data);
        } catch (error) { }
    };

    useEffect(() => {
        fetchGetValidDateToBooking();
    }, [params.expertId]);

    return {
        availabilities
    };
}