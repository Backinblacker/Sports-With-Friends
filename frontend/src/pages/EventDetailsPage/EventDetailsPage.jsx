import React from 'react';
import EventDetails from '../../components/EventDetails/EventDetails';

const EventDetailsPage = ({ eventId }) => {
  return (
    <div>
      <EventDetails eventId={eventId} />
    </div>
  );
};

export default EventDetailsPage;
